import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Activity, Clock, Code, Filter, TerminalSquare } from 'lucide-react';

const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api`;

export default function ApiLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  
  const [selectedPayload, setSelectedPayload] = useState<string | null>(null);
  const [payloadModalOpen, setPayloadModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchData();
  }, [selectedProjectId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch projects for the filter dropdown
      if (projects.length === 0) {
        const projRes = await axios.get(`${BACKEND_URL}/projects`, authHeader);
        setProjects(projRes.data);
      }

      // Fetch logs
      const url = selectedProjectId === 'all' 
        ? `${BACKEND_URL}/logs` 
        : `${BACKEND_URL}/logs?projectId=${selectedProjectId}`;
        
      const res = await axios.get(url, authHeader);
      setLogs(res.data);
    } catch (err) {
      console.error('Failed to fetch API logs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPayload = (payload: string) => {
    setSelectedPayload(payload);
    setPayloadModalOpen(true);
  };

  if (loading && logs.length === 0) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <CircularProgress size={48} />
    </div>
  );

  return (
    <div className="container-fluid py-4 animate__animated animate__fadeIn">
      <div className="row mb-4 align-items-end">
        <div className="col-md-8">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
              <Activity size={24} />
            </div>
            <h2 className="fw-bold mb-0">API Logs & Tracker</h2>
          </div>
          <p className="text-muted mb-0">Monitor all incoming and outgoing API requests in real-time.</p>
        </div>
        <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <div className="d-inline-flex align-items-center gap-2 bg-white border px-3 py-2 rounded-3 shadow-sm">
                <Filter size={18} className="text-muted" />
                <select 
                    className="form-select form-select-sm border-0 shadow-none fw-medium bg-transparent"
                    style={{ minWidth: '150px' }}
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                >
                    <option value="all">All Logs</option>
                    <option value="global">Dashboard Actions (Global)</option>
                    <optgroup label="API Key Requests">
                        {projects.filter(p => p.status === 'connected').map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.number})</option>
                        ))}
                    </optgroup>
                </select>
            </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3 text-muted fw-semibold small text-uppercase">Time</th>
                <th className="py-3 text-muted fw-semibold small text-uppercase">Project</th>
                <th className="py-3 text-muted fw-semibold small text-uppercase">Method</th>
                <th className="py-3 text-muted fw-semibold small text-uppercase">Endpoint</th>
                <th className="py-3 text-muted fw-semibold small text-uppercase">Status</th>
                <th className="px-4 py-3 text-end text-muted fw-semibold small text-uppercase">Payload</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <TerminalSquare size={48} className="text-muted opacity-25 mb-3" />
                    <h5 className="text-muted fw-bold">No API Logs Found</h5>
                    <p className="text-muted small">No requests have been tracked for the selected project.</p>
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-4">
                      <div className="d-flex align-items-center gap-2 text-muted small fw-medium">
                        <Clock size={14} />
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      {log.project ? (
                          <div className="fw-medium text-dark">{log.project.name}</div>
                      ) : (
                          <span className="badge bg-secondary-subtle text-secondary border">Global</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${
                          log.method === 'GET' ? 'bg-info-subtle text-info' : 
                          log.method === 'POST' ? 'bg-primary-subtle text-primary' : 
                          'bg-secondary-subtle text-secondary'
                      } border fw-bold`}>
                        {log.method}
                      </span>
                    </td>
                    <td className="text-dark font-monospace small">
                      {log.endpoint}
                    </td>
                    <td>
                      <span className={`badge ${
                          log.responseStatus >= 200 && log.responseStatus < 300 ? 'bg-success-subtle text-success border-success-subtle' :
                          log.responseStatus >= 400 ? 'bg-danger-subtle text-danger border-danger-subtle' :
                          'bg-warning-subtle text-warning border-warning-subtle'
                      } border fw-bold`}>
                        {log.responseStatus || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 text-end">
                      <button 
                        onClick={() => handleViewPayload(log.payload || log.responsePayload || 'No payload attached')}
                        className="btn btn-sm btn-light border-0 d-inline-flex align-items-center gap-1"
                      >
                        <Code size={14} /> Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payload Modal */}
      <Dialog open={payloadModalOpen} onClose={() => setPayloadModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle className="fw-bold d-flex align-items-center gap-2">
            <Code size={20} className="text-primary" /> Payload Inspector
        </DialogTitle>
        <DialogContent dividers className="bg-dark p-0">
          <pre className="text-success m-0 p-4 font-monospace" style={{ fontSize: '13px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {selectedPayload && (() => {
                try {
                    return JSON.stringify(JSON.parse(selectedPayload), null, 2);
                } catch (e) {
                    return selectedPayload;
                }
            })()}
          </pre>
        </DialogContent>
        <DialogActions className="p-3 bg-light">
          <Button onClick={() => setPayloadModalOpen(false)} variant="contained" disableElevation>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
