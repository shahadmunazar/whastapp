import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  MessageSquare,
  Users,
  CheckCircle,
  Loader2,
  AlertCircle,
  Play,
  Upload,
  FileUp
} from 'lucide-react';
import { Snackbar, Alert, CircularProgress } from '@mui/material';

const BACKEND_URL = 'http://localhost:3000/api';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  // Toast State
  const [toast, setToast] = useState<{ open: boolean, message: string, severity: 'success' | 'error' | 'info' | 'warning' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const showToast = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => setToast({ ...toast, open: false });

  // Create Form State
  const [name, setName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [message, setMessage] = useState('');

  // Import State
  const [leadsInput, setLeadsInput] = useState('');
  const [importing, setImporting] = useState(false);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [phoneCol, setPhoneCol] = useState<number>(-1);
  const [nameCol, setNameCol] = useState<number>(-1);
  const [messageCol, setMessageCol] = useState<number>(-1);
  
  // View Leads State
  const [showLeadsModal, setShowLeadsModal] = useState(false);

  // Start Settings State
  const [showStartModal, setShowStartModal] = useState(false);
  const [startSettings, setStartSettings] = useState({
    batchSize: 50,
    delayBetweenMessages: 5,
    delayBetweenBatches: 60,
    projectId: ''
  });

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchData = async () => {
    try {
      const [campRes, projRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/campaigns`, authHeader),
        axios.get(`${BACKEND_URL}/projects`, authHeader)
      ]);
      setCampaigns(campRes.data);
      setProjects(projRes.data);
    } catch (err) {
      console.error('Fetch failed', err);
      showToast('Failed to sync campaign data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/campaigns`, {
        name,
        projectId: selectedProject,
        message
      }, authHeader);

      setShowCreateModal(false);
      setName('');
      setSelectedProject('');
      setMessage('');
      fetchData();
      showToast('Campaign created! Please import leads to start.', 'success');
    } catch (err) {
      showToast('Failed to create campaign', 'error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target?.result as string;
        
        // Simple CSV parser
        const lines = text.split(/[\n\r]+/).filter(l => l.trim() !== '');
        if (lines.length > 0) {
            const separator = lines[0].includes(',') ? ',' : '\t'; // Guess separator
            const headers = lines[0].split(separator).map(h => h.trim());
            const data = lines.slice(1).map(l => l.split(separator).map(c => c.trim()));
            
            setCsvHeaders(headers);
            setCsvData(data);
            
            // Auto-detect columns
            const phoneIdx = headers.findIndex(h => h.toLowerCase().includes('phone') || h.toLowerCase().includes('number'));
            const nameIdx = headers.findIndex(h => h.toLowerCase().includes('name'));
            const msgIdx = headers.findIndex(h => h.toLowerCase().includes('message') || h.toLowerCase().includes('msg'));
            
            setPhoneCol(phoneIdx !== -1 ? phoneIdx : 0);
            setNameCol(nameIdx !== -1 ? nameIdx : -1);
            setMessageCol(msgIdx !== -1 ? msgIdx : -1);

            showToast('File parsed! Please map your columns below.', 'info');
        } else {
            setLeadsInput(text); // Fallback to raw text
            setCsvHeaders([]);
            showToast('Text loaded. Review numbers below.', 'info');
        }
    };
    reader.readAsText(file);
  };

  const handleImportLeads = async () => {
    let leads: any[] = [];
    
    if (csvHeaders.length > 0 && phoneCol !== -1) {
        // Map from CSV
        leads = csvData.map(row => ({
            phoneNumber: row[phoneCol],
            name: nameCol !== -1 ? row[nameCol] : null,
            message: messageCol !== -1 ? row[messageCol] : null
        })).filter(l => l.phoneNumber);
    } else {
        // Fallback to raw input
        leads = leadsInput.split(/[\n,\r]+/).map(l => l.trim()).filter(l => l !== '').map(phone => ({
            phoneNumber: phone
        }));
    }

    if (leads.length === 0) return showToast('No valid numbers found', 'warning');

    setImporting(true);
    try {
      await axios.post(`${BACKEND_URL}/campaigns/${selectedCampaign.id}/leads`, { leads }, authHeader);
      setShowImportModal(false);
      setLeadsInput('');
      setCsvHeaders([]);
      setCsvData([]);
      fetchData();
      showToast(`${leads.length} leads imported successfully!`, 'success');
    } catch (err) {
      showToast('Import failed', 'error');
    } finally {
      setImporting(false);
    }
  };

  const startCampaign = async () => {
    if (!selectedCampaign) return;
    try {
      await axios.post(`${BACKEND_URL}/campaigns/${selectedCampaign.id}/start`, startSettings, authHeader);
      setShowStartModal(false);
      fetchData();
      showToast('Campaign started! Sending in background...', 'success');
    } catch (err) {
      showToast('Failed to start campaign', 'error');
    }
  };

  const stopCampaign = async (id: number) => {
    try {
      await axios.post(`${BACKEND_URL}/campaigns/${id}/stop`, {}, authHeader);
      fetchData();
      showToast('Campaign stopped.', 'success');
    } catch (err) {
      showToast('Failed to stop campaign', 'error');
    }
  };

  const deleteCampaign = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) return;
    try {
      await axios.delete(`${BACKEND_URL}/campaigns/${id}`, authHeader);
      fetchData();
      showToast('Campaign deleted successfully.', 'success');
    } catch (err) {
      showToast('Failed to delete campaign', 'error');
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <CircularProgress size={48} />
    </div>
  );

  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div>
          <h2 className="fw-bold mb-1">Bulk Campaigns 📣</h2>
          <p className="text-muted mb-0">Two-step campaign management: Create then Import.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm border-0"
        >
          <Plus size={20} /> Create Campaign
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="row g-4">
        {campaigns.length > 0 ? campaigns.map((campaign) => (
          <div className="col-md-6 col-lg-4" key={campaign.id}>
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className={`badge rounded-pill px-3 py-2 ${campaign.status === 'completed' ? 'bg-success-subtle text-success' :
                      campaign.status === 'processing' ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'
                    }`}>
                    {campaign.status.toUpperCase()}
                  </span>
                  <div className="smaller text-muted">{new Date(campaign.createdAt).toLocaleDateString()}</div>
                </div>
                <h5 className="fw-bold mb-2">{campaign.name}</h5>
                <p className="text-muted smaller mb-3 text-truncate-2">{campaign.message}</p>

                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="d-flex align-items-center gap-1 smaller text-muted">
                    <Users size={14} /> {campaign.leads?.length || 0} Leads
                  </div>
                  <div className="d-flex align-items-center gap-1 smaller text-muted">
                    <MessageSquare size={14} /> {campaign.project?.name}
                  </div>
                </div>

                <div className="d-flex gap-2 mb-2">
                    {campaign.status === 'draft' && (
                        <>
                            <button 
                                onClick={() => {
                                    setSelectedCampaign(campaign);
                                    setShowImportModal(true);
                                }}
                                className="btn btn-outline-primary flex-grow-1 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 border-primary-subtle"
                            >
                                <Upload size={16} /> Import
                            </button>
                            <button 
                                onClick={() => {
                                    setSelectedCampaign(campaign);
                                    setStartSettings(prev => ({ ...prev, projectId: campaign.projectId }));
                                    setShowStartModal(true);
                                }}
                                disabled={campaign.leads?.length === 0}
                                className="btn btn-dark flex-grow-1 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 border-0"
                            >
                                <Play size={16} /> Start
                            </button>
                        </>
                    )}

                    {campaign.status === 'stopped' && (
                        <button 
                            onClick={() => {
                                setSelectedCampaign(campaign);
                                setStartSettings(prev => ({ ...prev, projectId: campaign.projectId }));
                                setShowStartModal(true);
                            }}
                            className="btn btn-dark flex-grow-1 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 border-0"
                        >
                            <Play size={16} /> Resume
                        </button>
                    )}

                    {campaign.status === 'processing' && (
                        <button 
                            onClick={() => stopCampaign(campaign.id)}
                            className="btn btn-danger flex-grow-1 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 border-0 shadow-sm"
                        >
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Stop
                        </button>
                    )}
                    
                    {(campaign.status === 'stopped' || campaign.status === 'draft') && (
                        <button 
                            onClick={() => deleteCampaign(campaign.id)}
                            className="btn btn-outline-danger py-2 px-3 rounded-3 d-flex align-items-center justify-content-center gap-2 border-danger-subtle"
                            title="Delete Campaign"
                        >
                            Delete
                        </button>
                    )}
                </div>
                
                {campaign.leads?.length > 0 && (
                  <button 
                      onClick={() => {
                          setSelectedCampaign(campaign);
                          setShowLeadsModal(true);
                      }}
                      className="btn btn-light w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 border-0 small text-muted mt-2 mb-3"
                  >
                      <Users size={16} /> View Uploaded Leads
                  </button>
                )}

                {campaign.status === 'processing' && (
                  <div className="d-flex align-items-center justify-content-center gap-2 text-primary py-2 smaller fw-bold bg-primary-subtle rounded-3">
                    <Loader2 size={16} className="animate-spin" /> Processing leads...
                  </div>
                )}
                {campaign.status === 'completed' && (
                  <div className="d-flex align-items-center justify-content-center gap-2 text-success py-2 smaller fw-bold bg-success-subtle rounded-3">
                    <CheckCircle size={16} /> Campaign Delivered
                  </div>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="col-12">
            <div className="text-center py-5 bg-white rounded-4 shadow-sm">
              <AlertCircle size={48} className="text-muted mb-3 opacity-25" />
              <h5 className="text-muted fw-bold">No Campaigns Yet</h5>
              <p className="text-muted smaller">Create your first campaign to start reaching users.</p>
              <button onClick={() => setShowCreateModal(true)} className="btn btn-primary btn-sm mt-2 rounded-pill px-4 border-0">Get Started</button>
            </div>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="modal show d-block animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0 p-4 bg-light">
                <h5 className="modal-title fw-bold">1. Create Campaign</h5>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowCreateModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleCreateCampaign}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Campaign Name</label>
                    <input
                      type="text"
                      className="form-control border-0 bg-light shadow-none"
                      placeholder="e.g. Summer Sale 2026"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Target Project</label>
                    <select
                      className="form-select border-0 bg-light shadow-none"
                      value={selectedProject}
                      onChange={e => setSelectedProject(e.target.value)}
                      required
                    >
                      <option value="">Select a project...</option>
                      {projects.filter(p => p.status === 'connected').map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.number})</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Message Content</label>
                    <textarea
                      className="form-control border-0 bg-light shadow-none"
                      rows={4}
                      placeholder="Write your WhatsApp message here..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 shadow-sm border-0 fw-bold">
                    Create & Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Leads Modal */}
      {showImportModal && (
        <div className="modal show d-block animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0 p-4 bg-light">
                <h5 className="modal-title fw-bold text-truncate" style={{ maxWidth: '80%' }}>2. Import Leads for: {selectedCampaign?.name}</h5>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowImportModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-4">
                  <label className="form-label small fw-bold mb-3 d-block">Upload Contact File (.txt or .csv)</label>
                  <div className="upload-area p-5 border border-2 border-dashed rounded-4 text-center bg-light transition-all hover-border-primary" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('fileInput')?.click()}>
                    <FileUp size={48} className="text-primary mb-3" />
                    <h6 className="fw-bold mb-1">Click to upload your file</h6>
                    <p className="smaller text-muted mb-0">Supports TXT or CSV files with phone numbers</p>
                    <input
                      id="fileInput"
                      type="file"
                      className="d-none"
                      accept=".txt,.csv"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {csvHeaders.length > 0 ? (
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Map CSV Columns</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">Phone Number (Required)</label>
                        <select className="form-select border-0 bg-light shadow-none" value={phoneCol} onChange={e => setPhoneCol(Number(e.target.value))}>
                          <option value={-1}>Select column...</option>
                          {csvHeaders.map((h, i) => <option key={i} value={i}>{h}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">Name (Optional)</label>
                        <select className="form-select border-0 bg-light shadow-none" value={nameCol} onChange={e => setNameCol(Number(e.target.value))}>
                          <option value={-1}>None</option>
                          {csvHeaders.map((h, i) => <option key={i} value={i}>{h}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">Message (Optional)</label>
                        <select className="form-select border-0 bg-light shadow-none" value={messageCol} onChange={e => setMessageCol(Number(e.target.value))}>
                          <option value={-1}>None (Use Campaign Message)</option>
                          {csvHeaders.map((h, i) => <option key={i} value={i}>{h}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="table-responsive bg-light rounded-3 p-3 mb-2">
                      <label className="form-label small fw-bold">Data Preview (First 3 rows)</label>
                      <table className="table table-sm table-borderless mb-0">
                        <thead>
                          <tr>
                            {csvHeaders.map((h, i) => <th key={i} className="small text-muted">{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {csvData.slice(0, 3).map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => <td key={j} className="small">{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Leads Preview / Manual Input</label>
                    <textarea
                      className="form-control border-0 bg-light shadow-none"
                      rows={8}
                      placeholder="919876543210&#10;918888888888&#10;..."
                      value={leadsInput}
                      onChange={e => setLeadsInput(e.target.value)}
                    ></textarea>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center bg-primary-subtle p-3 rounded-3 mb-4">
                  <div className="d-flex align-items-center gap-2 text-primary">
                    <Users size={18} />
                    <span className="fw-bold">
                      {csvHeaders.length > 0 
                        ? csvData.length 
                        : leadsInput.split(/[\n,\r]+/).filter(l => l.trim() !== '').length} Potential Leads Identified
                    </span>
                  </div>
                  <div className="smaller text-primary opacity-75">Numbers will be saved to this campaign</div>
                </div>

                <div className="d-flex gap-2">
                  <button onClick={() => {
                    setShowImportModal(false);
                    setCsvHeaders([]);
                    setCsvData([]);
                  }} className="btn btn-light flex-grow-1 py-3 rounded-3 border-0">Cancel</button>
                  <button
                    onClick={handleImportLeads}
                    disabled={importing || (csvHeaders.length > 0 ? phoneCol === -1 : !leadsInput.trim())}
                    className="btn btn-primary flex-grow-1 py-3 rounded-3 shadow-sm border-0 fw-bold"
                  >
                    {importing ? <CircularProgress size={20} color="inherit" /> : 'Save & Finalize Leads'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* View Leads Modal */}
      {showLeadsModal && selectedCampaign && (
        <div className="modal show d-block animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0 p-4 bg-light">
                <h5 className="modal-title fw-bold text-truncate">Uploaded Leads: {selectedCampaign.name}</h5>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowLeadsModal(false)}></button>
              </div>
              <div className="modal-body p-0" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th className="small fw-bold border-0 px-4">Phone Number</th>
                      <th className="small fw-bold border-0">Name</th>
                      <th className="small fw-bold border-0">Custom Message</th>
                      <th className="small fw-bold border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCampaign.leads?.map((lead: any) => (
                      <tr key={lead.id}>
                        <td className="px-4 fw-medium text-dark">{lead.phoneNumber}</td>
                        <td className="text-muted">{lead.name || '-'}</td>
                        <td className="small text-muted" style={{ maxWidth: '300px' }}>
                            <div className="text-truncate">{lead.message || <span className="fst-italic opacity-50">Default Campaign Message</span>}</div>
                        </td>
                        <td>
                          <span className={`badge border ${
                            lead.status === 'sent' ? 'bg-success-subtle text-success border-success-subtle' :
                            lead.status === 'failed' ? 'bg-danger-subtle text-danger border-danger-subtle' :
                            'bg-secondary-subtle text-secondary border-secondary-subtle'
                          }`}>
                            {lead.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer border-0 p-4 bg-light">
                <button onClick={() => setShowLeadsModal(false)} className="btn btn-light py-2 px-4 rounded-3 border-0">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Start Configuration Modal */}
      {showStartModal && selectedCampaign && (
        <div className="modal show d-block animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0 p-4 bg-light">
                <h5 className="modal-title fw-bold">Start Campaign: {selectedCampaign.name}</h5>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowStartModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <Alert severity="warning" className="mb-4">
                  To prevent your WhatsApp number from being banned for spam, messages will be sent in batches with delays. You can configure these settings below.
                </Alert>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Sending Project (WhatsApp Number)</label>
                  <select
                      className="form-select bg-light border-0 shadow-none"
                      value={startSettings.projectId}
                      onChange={e => setStartSettings({...startSettings, projectId: e.target.value})}
                      required
                  >
                      <option value="">Select a connected project...</option>
                      {projects.filter(p => p.status === 'connected').map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.number})</option>
                      ))}
                  </select>
                  <div className="form-text smaller text-danger">Only projects currently connected to WhatsApp are shown.</div>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Messages Per Batch</label>
                  <input 
                    type="number" 
                    className="form-control bg-light border-0 shadow-none" 
                    value={startSettings.batchSize}
                    onChange={e => setStartSettings({...startSettings, batchSize: Number(e.target.value)})}
                    min="1"
                    max="200"
                  />
                  <div className="form-text smaller">How many messages to send before pausing.</div>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Delay Between Messages (Seconds)</label>
                  <input 
                    type="number" 
                    className="form-control bg-light border-0 shadow-none" 
                    value={startSettings.delayBetweenMessages}
                    onChange={e => setStartSettings({...startSettings, delayBetweenMessages: Number(e.target.value)})}
                    min="1"
                    max="60"
                  />
                  <div className="form-text smaller">Delay between individual messages within a batch.</div>
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold">Delay Between Batches (Seconds)</label>
                  <input 
                    type="number" 
                    className="form-control bg-light border-0 shadow-none" 
                    value={startSettings.delayBetweenBatches}
                    onChange={e => setStartSettings({...startSettings, delayBetweenBatches: Number(e.target.value)})}
                    min="1"
                  />
                  <div className="form-text smaller">Long pause after a batch is completed.</div>
                </div>
                
                <div className="d-flex gap-2">
                  <button onClick={() => setShowStartModal(false)} className="btn btn-light flex-grow-1 py-3 rounded-3 border-0">Cancel</button>
                  <button onClick={startCampaign} disabled={!startSettings.projectId} className="btn btn-dark flex-grow-1 py-3 rounded-3 shadow-sm border-0 fw-bold d-flex align-items-center justify-content-center gap-2">
                    <Play size={18} /> Confirm & Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MUI Toast System */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <style>{`
        .text-truncate-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .hover-border-primary:hover {
            border-color: var(--bs-primary) !important;
            background-color: white !important;
        }
        .transition-all {
            transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Campaigns;
