import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Search, Eye, Filter } from 'lucide-react';

const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api`;

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/projects/messages/all`, authHeader);
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
    setLoading(false);
  };

  const uniqueProjects = Array.from(new Set(messages.map(m => m.projectName)));

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.to.includes(searchTerm) || 
                          m.from.includes(searchTerm);
    const matchesProject = filterProject === 'all' || m.projectName === filterProject;
    const matchesStatus = filterStatus === 'all' || m.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesProject && matchesStatus;
  });

  return (
    <div className="container-fluid py-4 h-100 d-flex flex-column animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">All Messages</h4>
          <p className="text-muted small mb-0">Master view of all incoming and outgoing messages across your projects.</p>
        </div>
        <button onClick={fetchMessages} className="btn btn-outline-primary btn-sm rounded-pill px-4">
          Refresh
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 flex-grow-1 overflow-hidden d-flex flex-column">
        <div className="card-header bg-white border-bottom p-4 d-flex gap-3 flex-wrap align-items-center">
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-light border-end-0 text-muted"><Search size={16} /></span>
            <input 
              type="text" 
              className="form-control bg-light border-start-0" 
              placeholder="Search number or message..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="input-group" style={{ maxWidth: '250px' }}>
            <span className="input-group-text bg-light border-end-0 text-muted"><Filter size={16} /></span>
            <select 
              className="form-select bg-light border-start-0" 
              value={filterProject} 
              onChange={(e) => setFilterProject(e.target.value)}
            >
              <option value="all">All Projects</option>
              {uniqueProjects.map((p, idx) => (
                <option key={idx} value={p as string}>{p}</option>
              ))}
            </select>
          </div>
          
          <div className="input-group" style={{ maxWidth: '200px' }}>
            <span className="input-group-text bg-light border-end-0 text-muted"><Filter size={16} /></span>
            <select 
              className="form-select bg-light border-start-0" 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
              <option value="received">Received</option>
            </select>
          </div>
        </div>

        <div className="card-body p-0 overflow-auto">
          {loading ? (
            <div className="p-5 text-center text-muted">
              <div className="spinner-border text-primary mb-3" />
              <p>Loading messages...</p>
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light sticky-top">
                <tr>
                  <th className="small fw-bold border-0 px-4">Project & Number</th>
                  <th className="small fw-bold border-0">From</th>
                  <th className="small fw-bold border-0">To</th>
                  <th className="small fw-bold border-0">Direction</th>
                  <th className="small fw-bold border-0">Message</th>
                  <th className="small fw-bold border-0">Status</th>
                  <th className="small fw-bold border-0">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((log) => {
                  const isLong = log.content.length > 30;
                  const truncated = isLong ? log.content.substring(0, 30) + '...' : log.content;
                  const isReceived = log.status === 'received';
                  
                  return (
                    <tr key={log.id}>
                      <td className="px-4">
                        <div className="fw-bold">{log.projectName}</div>
                        <div className="small text-muted">{log.projectNumber || 'Unknown Number'}</div>
                      </td>
                      <td className="fw-medium text-dark">{log.from}</td>
                      <td className="fw-medium text-dark">{log.to}</td>
                      <td>
                        <span className={`badge ${isReceived ? 'bg-info-subtle text-info border-info-subtle' : 'bg-secondary-subtle text-secondary border-secondary-subtle'}`}>
                          {isReceived ? 'Incoming' : 'Outgoing'}
                        </span>
                      </td>
                      <td className="small text-muted" style={{ maxWidth: '300px' }}>
                        <div className="d-flex align-items-center justify-content-between gap-2">
                          <span className="text-truncate">{truncated}</span>
                          {isLong && (
                            <button
                              onClick={() => setSelectedLog(log)}
                              className="btn btn-link p-0 text-primary flex-shrink-0"
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
                      <td className="small text-muted">{new Date(log.createdAt).toLocaleString()}</td>
                    </tr>
                  );
                })}
                {filteredMessages.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-5 text-muted">
                      <MessageSquare size={32} className="mb-2 opacity-25" />
                      <br />
                      No messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

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
                  <label className="small fw-bold text-muted text-uppercase mb-2">Project</label>
                  <div className="fs-6 fw-bold">{selectedLog.projectName}</div>
                  <div className="small text-muted">Number: {selectedLog.projectNumber || 'Unknown'}</div>
                </div>
                <div className="mb-4">
                  <label className="small fw-bold text-muted text-uppercase mb-2">From</label>
                  <div className="fs-5 fw-bold">{selectedLog.from}</div>
                </div>
                <div className="mb-4">
                  <label className="small fw-bold text-muted text-uppercase mb-2">To</label>
                  <div className="fs-5 fw-bold">{selectedLog.to}</div>
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
    </div>
  );
};

export default Messages;
