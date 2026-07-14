import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, RefreshCw, Plus, X, History, Trash2, ShieldAlert, Eye } from 'lucide-react';
import PhoneInputImport from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useLocation } from 'react-router-dom';

const PhoneInput = (PhoneInputImport as any).default || PhoneInputImport;
const BACKEND_URL = 'http://localhost:3000/api';
const WhatsAppConnect: React.FC = () => {
  const location = useLocation();
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Select a project to connect');
  const [defaultCountry, setDefaultCountry] = useState('in'); // Default to India

  useEffect(() => {
    // Fetch country by IP
    const fetchCountry = async () => {
      try {
        const res = await axios.get('https://ipapi.co/json/', { timeout: 3000 });
        if (res.data.country_code) {
          setDefaultCountry(res.data.country_code.toLowerCase());
        }
      } catch (err) {
        console.warn('IP fetch via ipapi failed, trying secondary service...');
        try {
          const res2 = await axios.get('https://freeipapi.com/api/json', { timeout: 3000 });
          if (res2.data.countryCode) {
            setDefaultCountry(res2.data.countryCode.toLowerCase());
          }
        } catch (err2) {
          console.warn('All IP services failed, using default: in');
        }
      }
    };
    fetchCountry();
  }, []);

  // Logs State
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectNumber, setNewProjectNumber] = useState('');

  // Sidebar Tab State
  const [sidebarTab, setSidebarTab] = useState<'active' | 'disconnected'>('active');

  // Content Tab State
  const queryParams = new URLSearchParams(location.search);
  const initialTab = (queryParams.get('tab') as 'composer' | 'logs') || 'composer';
  const [activeTab, setActiveTab] = useState<'composer' | 'logs'>(initialTab);
  
  // Use effect to sync activeTab when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['composer', 'logs'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [location.search]);
  
  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/projects`, authHeader);
      setProjects(res.data);
      if (res.data.length > 0 && !activeProjectId) {
        const firstMatch = res.data.find((p: any) =>
          sidebarTab === 'active' ? p.status === 'connected' : p.status === 'disconnected'
        );
        if (firstMatch) setActiveProjectId(firstMatch.id);
      }
    } catch (err) {
      console.error('Fetch projects failed', err);
    }
  };

  const fetchLogs = async () => {
    if (!activeProjectId) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/projects/${activeProjectId}/messages`, authHeader);
      setLogs(res.data);
    } catch (err) {
      console.error('Fetch logs failed', err);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newProjectNumber) return;
    try {
      const res = await axios.post(`${BACKEND_URL}/projects`, {
        name: newProjectName,
        number: newProjectNumber
      }, authHeader);
      setShowModal(false);
      setNewProjectName('');
      setNewProjectNumber('');
      await fetchProjects();
      if (res.data && res.data.id) {
        setSidebarTab('disconnected');
        setActiveProjectId(res.data.id);
        setShowQrModal(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create project');
    }
  };

  const handleDisconnect = async () => {
    if (!activeProjectId || !window.confirm('Are you sure you want to disconnect?')) return;
    try {
      await axios.get(`${BACKEND_URL}/projects/${activeProjectId}/disconnect`, authHeader);
      setIsConnected(false);
      setQrCode(null);
      fetchProjects();
      setSidebarTab('disconnected');
    } catch (err) {
      alert('Disconnect failed');
    }
  };

  const handleDeleteProject = async (id: number, permanent = false) => {
    const msg = permanent
      ? 'PERMANENT DELETE: This cannot be undone. All logs will be lost. Continue?'
      : 'Are you sure you want to move this project to trash?';

    if (!window.confirm(msg)) return;

    try {
      const url = permanent ? `${BACKEND_URL}/projects/${id}/force` : `${BACKEND_URL}/projects/${id}`;
      await axios.delete(url, authHeader);
      if (activeProjectId === id) setActiveProjectId(null);
      fetchProjects();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const pollStatus = async () => {
    if (!activeProjectId) return;
    try {
      const response = await axios.get(`${BACKEND_URL}/projects/${activeProjectId}/qr`, authHeader);
      const data = response.data;

      if (data.qr === 'connected') {
        setIsConnected(true);
        setQrCode(null);
        setShowQrModal(false);
      } else if (data.qr) {
        setQrCode(data.qr);
        setStatusMsg('QR Ready - Scan Now');
      }
    } catch (error) {
      console.error('Backend error:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const interval = setInterval(pollStatus, 3000);
    pollStatus();
    return () => clearInterval(interval);
  }, [activeProjectId]);

  useEffect(() => {
    if (activeTab === 'logs') {
      fetchLogs();
    }
  }, [activeTab, activeProjectId]);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const filteredProjects = projects.filter(p =>
    sidebarTab === 'active' ? p.status === 'connected' : p.status === 'disconnected'
  );

  const handleSendMessage = async () => {
    if (!number || (!message && !mediaUrl) || !activeProjectId) return;
    setSending(true);
    try {
      await axios.post(`${BACKEND_URL}/projects/${activeProjectId}/send`, {
        number,
        message,
        mediaUrl,
        appId: activeProject?.appId,
        apiToken: activeProject?.apiToken
      }, authHeader);
      alert('Message sent! 🎉');
      setMessage('');
      setMediaUrl('');
      if (activeTab === 'logs') fetchLogs();
    } catch (error) {
      alert('Error sending message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm overflow-hidden position-relative">
      {/* Create Project Modal */}
      {showModal && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex align-items-center justify-content-center z-3" style={{ zIndex: 1000 }}>
          <div className="card shadow-lg border-0 p-4" style={{ width: '400px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0 fw-bold">New WhatsApp Project</h5>
              <button onClick={() => setShowModal(false)} className="btn btn-link text-muted p-0"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Project Name</label>
                <input type="text" className="form-control" placeholder="e.g. Sales Team" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold">WhatsApp Number</label>
                <PhoneInput
                  country={defaultCountry}
                  value={newProjectNumber}
                  onChange={setNewProjectNumber}
                  inputStyle={{ width: '100%', height: '45px', borderRadius: '8px', border: '1px solid #dee2e6' }}
                  buttonStyle={{ borderRadius: '8px 0 0 8px', border: '1px solid #dee2e6', borderRight: 'none', background: '#f8f9fa' }}
                  containerStyle={{ borderRadius: '8px' }}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2">Create Project</button>
            </form>
          </div>
        </div>
      )}

      <div className="card-header bg-white border-bottom-0 p-4 d-flex justify-content-between align-items-center">
        <h4 className="mb-0 fw-bold">WhatsApp Projects</h4>
        <button onClick={() => setShowModal(true)} className="btn btn-primary btn-sm d-flex align-items-center gap-1">
          <Plus size={16} /> New Project
        </button>
      </div>
      <div className="card-body p-0">
        <div className="row g-0">
          {/* Project List Sidebar */}
          <div className="col-lg-4 border-end bg-light" style={{ minHeight: '300px' }}>
            <div className="d-flex border-bottom">
              <button onClick={() => setSidebarTab('active')} className={`flex-grow-1 py-3 small fw-bold border-0 ${sidebarTab === 'active' ? 'bg-white text-primary border-bottom border-primary border-2' : 'bg-light text-muted'}`}>Active</button>
              <button onClick={() => setSidebarTab('disconnected')} className={`flex-grow-1 py-3 small fw-bold border-0 ${sidebarTab === 'disconnected' ? 'bg-white text-primary border-bottom border-primary border-2' : 'bg-light text-muted'}`}>Disconnected</button>
            </div>
            <div className="project-list" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <div className="list-group list-group-flush">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    className={`list-group-item list-group-item-action p-4 border-0 position-relative ${activeProjectId === p.id ? 'active' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setActiveProjectId(p.id);
                      setIsConnected(p.status === 'connected');
                      setQrCode(null);
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="fw-bold">{p.name}</div>
                        <div className={`small ${activeProjectId === p.id ? 'text-white-50' : 'text-muted'}`}>
                          ID: {p.appId}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-2">
                        <span className={`badge rounded-pill ${p.status === 'connected' ? 'bg-success' : 'bg-warning'}`} style={{ fontSize: '10px' }}>
                          {p.status}
                        </span>
                        <div className="d-flex gap-1">
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(p.id); }} className={`btn btn-sm p-1 border-0 ${activeProjectId === p.id ? 'text-white-50' : 'text-danger opacity-50'}`} title="Trash">
                            <Trash2 size={14} />
                          </button>
                          {sidebarTab === 'disconnected' && (
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(p.id, true); }} className={`btn btn-sm p-1 border-0 ${activeProjectId === p.id ? 'text-white-50' : 'text-dark opacity-50'}`} title="Permanent Delete">
                              <ShieldAlert size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="p-5 text-center text-muted small">
                    <History size={32} className="mb-2 opacity-25" />
                    <br />
                    No {sidebarTab} projects found.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Connection Area */}
          <div className="col-lg-8 p-0 border-start">
            {activeProjectId ? (
              <div className="p-3 p-lg-5">
                {!isConnected ? (
                  <div className="text-center">
                    <div className="d-flex align-items-center justify-content-center bg-white rounded shadow-sm mx-auto mb-4" style={{ width: '240px', height: '240px' }}>
                      {qrCode ? (
                        <img src={qrCode} alt="QR" className="img-fluid" />
                      ) : (
                        <div className="spinner-border text-primary" />
                      )}
                    </div>
                    <h5>{statusMsg}</h5>
                    <p className="text-muted small">Scan this code with: <strong>{activeProject?.number}</strong></p>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="text-success"><CheckCircle size={32} /></div>
                        <div>
                          <h4 className="mb-0 fw-bold">Connected</h4>
                          <span className="text-muted small">Account: {activeProject?.number}</span>
                        </div>
                        <button onClick={handleDisconnect} className="btn btn-sm btn-outline-danger border-0 d-flex align-items-center gap-1 ms-2 py-0">
                          <RefreshCw size={14} /> Disconnect
                        </button>
                      </div>
                      <div className="btn-group p-1 bg-light rounded-pill flex-wrap">
                        <button onClick={() => setActiveTab('composer')} className={`btn btn-sm rounded-pill px-3 ${activeTab === 'composer' ? 'btn-white shadow-sm' : 'btn-transparent text-muted'}`}>Composer</button>
                        <button onClick={() => setActiveTab('logs')} className={`btn btn-sm rounded-pill px-3 ${activeTab === 'logs' ? 'btn-white shadow-sm' : 'btn-transparent text-muted'}`}>Logs</button>
                      </div>
                    </div>

                    {activeTab === 'composer' && (
                      <div className="bg-light p-4 rounded-4 animate__animated animate__fadeIn">
                        <div className="mb-3">
                          <label className="form-label small fw-bold">Recipient Number</label>
                          <PhoneInput
                            country={defaultCountry}
                            value={number}
                            onChange={setNumber}
                            inputStyle={{ width: '100%', height: '45px', borderRadius: '8px', border: '1px solid #dee2e6' }}
                            buttonStyle={{ borderRadius: '8px 0 0 8px', border: '1px solid #dee2e6', borderRight: 'none', background: '#f8f9fa' }}
                            containerStyle={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-bold">Message</label>
                          <textarea className="form-control" rows={3} value={message} onChange={e => setMessage(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-bold">Media URL (Optional)</label>
                          <input type="url" className="form-control" placeholder="https://example.com/image.jpg" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} />
                          <small className="text-muted">Send images, audio, or PDFs via direct URL.</small>
                        </div>
                        <button className="btn btn-primary w-100" onClick={handleSendMessage} disabled={sending}>
                          {sending ? 'Sending...' : 'Send Message 🚀'}
                        </button>
                      </div>
                    )}

                    {activeTab === 'logs' && (
                      <div className="animate__animated animate__fadeIn">
                        <div className="table-responsive rounded-4 border">
                          <table className="table table-hover mb-0">
                            <thead className="table-light">
                              <tr>
                                <th className="small fw-bold">Contact</th>
                                <th className="small fw-bold">Direction</th>
                                <th className="small fw-bold">Message</th>
                                <th className="small fw-bold">Status</th>
                                <th className="small fw-bold">Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {logs.map((log) => {
                                const isLong = log.content.length > 25;
                                const truncated = isLong ? log.content.substring(0, 25) + '...' : log.content;
                                const isReceived = log.status === 'received';
                                return (
                                  <tr key={log.id}>
                                    <td className="small">{isReceived ? log.from : log.to}</td>
                                    <td>
                                      <span className={`badge ${isReceived ? 'bg-info-subtle text-info border-info-subtle' : 'bg-secondary-subtle text-secondary border-secondary-subtle'}`}>
                                        {isReceived ? 'Incoming' : 'Outgoing'}
                                      </span>
                                    </td>
                                    <td className="small">
                                      <div className="d-flex align-items-center justify-content-between gap-2">
                                        <span className="text-truncate">{truncated}</span>
                                        {isLong && (
                                          <button
                                            onClick={() => setSelectedLog(log)}
                                            className="btn btn-link p-0 text-primary"
                                          >
                                            <Eye size={14} />
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <span className={`badge border ${isReceived ? 'bg-primary-subtle text-primary border-primary-subtle' : 'bg-success-subtle text-success border-success-subtle'}`}>
                                        {log.status}
                                      </span>
                                    </td>
                                    <td className="small text-muted">{new Date(log.createdAt).toLocaleTimeString()}</td>
                                  </tr>
                                );
                              })}
                              {logs.length === 0 && (
                                <tr>
                                  <td colSpan={4} className="text-center py-4 text-muted">No messages sent yet.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center text-muted p-5">
                Select a project from the left to manage connection.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="modal show d-block animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 mx-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Message Details</h5>
                <button type="button" className="btn-close shadow-none" onClick={() => setSelectedLog(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-4">
                  <label className="small fw-bold text-muted text-uppercase mb-2">
                    {selectedLog.status === 'received' ? 'Sender' : 'Recipient'}
                  </label>
                  <div className="fs-5 fw-bold">{selectedLog.status === 'received' ? selectedLog.from : selectedLog.to}</div>
                </div>
                <div className="mb-4">
                  <label className="small fw-bold text-muted text-uppercase mb-2">Full Content</label>
                  <div className="bg-light p-3 rounded-3 border">
                    <p className="mb-0 lh-base" style={{ whiteSpace: 'pre-wrap' }}>{selectedLog.content}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2 pt-3 border-top flex-wrap gap-2">
                  <div>
                    <span className="small text-muted me-2">Status:</span>
                    <span className="badge bg-success-subtle text-success">{selectedLog.status}</span>
                  </div>
                  <div className="small text-muted">{new Date(selectedLog.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-dark w-100 py-3 fw-bold rounded-3" onClick={() => setSelectedLog(null)}>Close View</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* QR Code Modal */}
      {showQrModal && !isConnected && activeProjectId && (
        <div className="modal show d-block animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 mx-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Connect WhatsApp</h5>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowQrModal(false)}></button>
              </div>
              <div className="modal-body p-4 text-center">
                <div className="d-flex align-items-center justify-content-center bg-white rounded shadow-sm mx-auto mb-4" style={{ width: '280px', height: '280px' }}>
                  {qrCode ? (
                    <img src={qrCode} alt="QR" className="img-fluid" />
                  ) : (
                    <div className="spinner-border text-primary" />
                  )}
                </div>
                <h4 className="fw-bold mb-2">{statusMsg}</h4>
                <p className="text-muted">
                  Open WhatsApp on your phone, go to Linked Devices, and scan this code to connect your number: <strong>{activeProject?.number}</strong>.
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-secondary w-100 py-3 fw-bold rounded-3" onClick={() => setShowQrModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppConnect;
