import { useState, useEffect } from 'react';
import axios from 'axios';
import { Webhook, ShieldCheck, Link2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api`;

const Webhooks = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [updatingWebhook, setUpdatingWebhook] = useState(false);

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/projects`, authHeader);
      setProjects(res.data);
      if (res.data.length > 0 && !activeProjectId) {
        setActiveProjectId(res.data[0].id);
      }
    } catch (err) {
      console.error('Fetch projects failed', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const activeProject = projects.find(p => p.id === activeProjectId);

  useEffect(() => {
    if (activeProject) {
      setWebhookUrl(activeProject.webhookUrl || '');
    }
  }, [activeProject]);

  const handleUpdateWebhook = async () => {
    if (!activeProjectId) return;
    setUpdatingWebhook(true);
    try {
      await axios.put(`${BACKEND_URL}/projects/${activeProjectId}`, { webhookUrl }, authHeader);
      alert('Webhook URL updated successfully! 🎉');
      fetchProjects();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update webhook');
    }
    setUpdatingWebhook(false);
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item"><Link to="/integrations">Integrations</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Webhooks</li>
            </ol>
          </nav>
          <h2 className="fw-bold mb-0">Webhooks</h2>
          <p className="text-muted">Receive real-time notifications for incoming messages.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2"><Link2 size={18} /> Select Project</h6>
              <p className="small text-muted mb-3">Select the WhatsApp project to configure webhooks for.</p>
              <select 
                className="form-select form-select-lg mb-0" 
                value={activeProjectId || ''} 
                onChange={(e) => setActiveProjectId(Number(e.target.value))}
              >
                <option value="" disabled>Select a project...</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.number})</option>
                ))}
              </select>
              {projects.length === 0 && (
                <div className="alert alert-warning small mt-3 mb-0">
                  You don't have any projects yet. <Link to="/whatsapp" className="alert-link">Create one here</Link>.
                </div>
              )}
            </div>
          </div>

          <div className="card border-0 shadow-sm border-top border-warning border-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2"><ShieldCheck size={18} /> Configuration</h6>
              <div className="mb-4">
                <label className="form-label small fw-bold">Endpoint URL</label>
                <input 
                  type="url" 
                  className="form-control" 
                  placeholder="https://your-server.com/webhook" 
                  value={webhookUrl} 
                  onChange={e => setWebhookUrl(e.target.value)} 
                />
                <small className="text-muted d-block mt-2">
                  We will send a POST request to this URL whenever a new message is received on this WhatsApp number.
                </small>
              </div>
              <button 
                className="btn btn-warning w-100 fw-bold" 
                onClick={handleUpdateWebhook} 
                disabled={updatingWebhook || !activeProjectId}
              >
                {updatingWebhook ? 'Saving...' : 'Save Webhook URL'}
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 p-lg-5">
              <h4 className="fw-bold mb-4 d-flex align-items-center gap-2"><Webhook size={24} className="text-warning" /> How Webhooks Work</h4>
              <p className="text-muted mb-4">
                Webhooks allow you to build or set up integrations which subscribe to certain events on Dasher CRM. 
                When one of those events is triggered, we'll send a HTTP POST payload to the webhook's configured URL.
              </p>
              
              <div className="bg-light p-4 rounded-4 border border-warning mb-4">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 text-warning"><MessageSquare size={16} /> Incoming Message Payload</h6>
                <p className="small text-muted mb-3">When a message is received, our server will send a <code>POST</code> request with the following JSON payload:</p>
                <pre className="bg-white p-3 rounded border small mb-0 overflow-auto">
                  <code className="text-dark">
{`{
  "appId": "${activeProject?.appId || 'YOUR_APP_ID'}",
  "from": "91XXXXXXXXXX",
  "to": "${activeProject?.number || 'YOUR_WHATSAPP_NUMBER'}",
  "message": "Hello! I have a question.",
  "timestamp": "${new Date().toISOString()}",
  "type": "chat"
}`}
                  </code>
                </pre>
              </div>

              <div className="alert alert-info border-0 shadow-sm mb-0">
                <h6 className="fw-bold mb-2">Security Best Practices</h6>
                <ul className="mb-0 small ps-3">
                  <li className="mb-1">Ensure your endpoint is accessible via HTTPS.</li>
                  <li className="mb-1">Verify the <code>appId</code> in the payload matches your project's App ID to ensure the request came from us.</li>
                  <li>Respond to the webhook with a <code>200 OK</code> status code as quickly as possible.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webhooks;
