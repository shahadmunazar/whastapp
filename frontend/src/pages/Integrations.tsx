import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Code, Webhook, Blocks, ExternalLink, Activity } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/api';

const Integrations = () => {
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [salesMessage, setSalesMessage] = useState('');
  const [submittingSales, setSubmittingSales] = useState(false);

  const handleSalesSubmit = async () => {
    if (!salesMessage.trim()) return alert('Please enter a message');
    setSubmittingSales(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BACKEND_URL}/sales/query`, { message: salesMessage }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Your query has been submitted! Our sales team will contact you soon.');
      setShowSalesModal(false);
      setSalesMessage('');
    } catch (error) {
      alert('Failed to submit query. Please try again.');
    }
    setSubmittingSales(false);
  };
  return (
    <div className="container-fluid p-0">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Integrations Hub</h2>
        <p className="text-muted">Connect your CRM with third-party apps, APIs, and Webhooks.</p>
      </div>

      <div className="row g-4">
        {/* WhatsApp CRM (Primary) */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
            <div className="card-body p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3 gap-3">
                <div className="bg-success-subtle text-success p-3 rounded-4">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">WhatsApp CRM</h5>
                  <span className="badge bg-success">Active</span>
                </div>
              </div>
              <p className="text-muted small flex-grow-1">
                Manage your connected WhatsApp numbers, scan QR codes, and send messages directly from the dashboard.
              </p>
              <Link to="/whatsapp" className="btn btn-outline-success w-100 fw-bold">
                Manage Connections
              </Link>
            </div>
          </div>
        </div>

        {/* REST API */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
            <div className="card-body p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3 gap-3">
                <div className="bg-primary-subtle text-primary p-3 rounded-4">
                  <Code size={28} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Developer API</h5>
                  <span className="badge bg-primary">Active</span>
                </div>
              </div>
              <p className="text-muted small flex-grow-1">
                Integrate our powerful REST API into your own applications using cURL, Node.js, Python, or PHP.
              </p>
              <Link to="/integrations/api" className="btn btn-outline-primary w-100 fw-bold">
                View API Docs
              </Link>
            </div>
          </div>
        </div>

        {/* Webhooks */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
            <div className="card-body p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3 gap-3">
                <div className="bg-warning-subtle text-warning p-3 rounded-4">
                  <Webhook size={28} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Webhooks</h5>
                  <span className="badge bg-warning text-dark">Active</span>
                </div>
              </div>
              <p className="text-muted small flex-grow-1">
                Receive real-time HTTP POST notifications when a message is delivered or a new message is received.
              </p>
              <Link to="/integrations/webhooks" className="btn btn-outline-warning w-100 fw-bold">
                Configure Webhooks
              </Link>
            </div>
          </div>
        </div>

        {/* Zapier */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm opacity-75">
            <div className="card-body p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3 gap-3">
                <div className="bg-secondary-subtle text-secondary p-3 rounded-4">
                  <Blocks size={28} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Zapier</h5>
                  <span className="badge bg-secondary">Coming Soon</span>
                </div>
              </div>
              <p className="text-muted small flex-grow-1">
                Connect with over 5,000+ apps natively using our official Zapier integration. No code required.
              </p>
              <button className="btn btn-light w-100 fw-bold" disabled>
                Join Waitlist
              </button>
            </div>
          </div>
        </div>

        {/* Make.com */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm opacity-75">
            <div className="card-body p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3 gap-3">
                <div className="bg-secondary-subtle text-secondary p-3 rounded-4">
                  <Activity size={28} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Make.com</h5>
                  <span className="badge bg-secondary">Coming Soon</span>
                </div>
              </div>
              <p className="text-muted small flex-grow-1">
                Automate your workflows visually with our official Make.com module. Perfect for complex logic.
              </p>
              <button className="btn btn-light w-100 fw-bold" disabled>
                Join Waitlist
              </button>
            </div>
          </div>
        </div>

        {/* Custom App */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm bg-dark text-white">
            <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center text-center">
              <div className="bg-white bg-opacity-10 p-3 rounded-circle mb-3">
                <ExternalLink size={32} />
              </div>
              <h5 className="fw-bold">Need a Custom Integration?</h5>
              <p className="text-white-50 small mb-4">
                Our team can build a custom integration tailored to your exact business workflow.
              </p>
              <button className="btn btn-primary fw-bold px-4 rounded-pill" onClick={() => setShowSalesModal(true)}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Sales Modal */}
      {showSalesModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header border-0 bg-primary text-white p-4">
                  <div>
                    <h5 className="modal-title fw-bold">Contact Sales</h5>
                    <p className="mb-0 small opacity-75">Let us build a custom integration for you.</p>
                  </div>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowSalesModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-bold">How can we help?</label>
                    <textarea 
                      className="form-control bg-light border-0" 
                      rows={4} 
                      placeholder="Describe the integration you need..."
                      value={salesMessage}
                      onChange={e => setSalesMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <button 
                    className="btn btn-primary w-100 fw-bold py-2 rounded-3" 
                    onClick={handleSalesSubmit}
                    disabled={submittingSales}
                  >
                    {submittingSales ? 'Submitting...' : 'Send Request 🚀'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Integrations;
