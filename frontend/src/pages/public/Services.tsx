
import { MessageSquare, Code, Webhook, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5 pb-3">
        <h1 className="fw-bolder">Our Services</h1>
        <p className="lead text-muted">Everything you need to build, automate, and scale.</p>
      </div>
      
      <div className="row g-4 justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all">
            <div className="bg-primary-subtle text-primary p-3 rounded-4 d-inline-block mb-4" style={{ width: 'fit-content' }}>
              <MessageSquare size={32} />
            </div>
            <h4 className="fw-bold mb-3">WhatsApp CRM</h4>
            <p className="text-muted mb-4">
              A comprehensive dashboard to manage all your WhatsApp connections, send messages, view logs, and organize your contacts. Multi-device support out of the box.
            </p>
            <Link to="/register" className="btn btn-outline-primary fw-bold mt-auto">Get Started</Link>
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all">
            <div className="bg-warning-subtle text-warning p-3 rounded-4 d-inline-block mb-4" style={{ width: 'fit-content' }}>
              <Code size={32} />
            </div>
            <h4 className="fw-bold mb-3">Developer API</h4>
            <p className="text-muted mb-4">
              Integrate sending messages directly into your Node.js, PHP, Python, or Go applications. Complete with secure token authentication and rate limiting.
            </p>
            <Link to="/register" className="btn btn-outline-warning fw-bold mt-auto">Read Docs</Link>
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all">
            <div className="bg-success-subtle text-success p-3 rounded-4 d-inline-block mb-4" style={{ width: 'fit-content' }}>
              <Zap size={32} />
            </div>
            <h4 className="fw-bold mb-3">Campaign Automations</h4>
            <p className="text-muted mb-4">
              Upload contact lists via CSV and blast messages instantly or schedule them. Auto-spintax formatting and random delays to protect your numbers.
            </p>
            <Link to="/register" className="btn btn-outline-success fw-bold mt-auto">Try Campaigns</Link>
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all">
            <div className="bg-danger-subtle text-danger p-3 rounded-4 d-inline-block mb-4" style={{ width: 'fit-content' }}>
              <Webhook size={32} />
            </div>
            <h4 className="fw-bold mb-3">Webhooks</h4>
            <p className="text-muted mb-4">
              Get real-time push notifications to your servers whenever a message is received, read, or delivered. Build intelligent chatbots and auto-responders.
            </p>
            <Link to="/register" className="btn btn-outline-danger fw-bold mt-auto">Setup Webhooks</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
