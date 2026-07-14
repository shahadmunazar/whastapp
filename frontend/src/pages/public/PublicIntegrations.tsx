import { Link } from 'react-router-dom';
import { Layers, Zap, Database, Plug, TerminalSquare, MessageCircle } from 'lucide-react';

const PublicIntegrations = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      <section className="py-5 bg-light text-center">
        <div className="container py-5">
          <div className="d-inline-flex bg-primary-subtle text-primary p-3 rounded-circle mb-4">
            <Layers size={32} />
          </div>
          <h1 className="display-4 fw-bolder mb-3">Integrations</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Connect WAMark with your favorite tools. Automate workflows and sync data across your entire tech stack effortlessly.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="row g-4">
            {[
              { icon: <Zap size={32} className="text-warning" />, title: "Zapier", desc: "Connect with over 5,000+ apps. Trigger WhatsApp messages from form submissions, calendar events, or CRM updates.", status: "Available" },
              { icon: <Plug size={32} className="text-primary" />, title: "Make (Integromat)", desc: "Build complex visual workflows and route incoming WhatsApp messages to Google Sheets, Slack, and more.", status: "Available" },
              { icon: <Database size={32} className="text-info" />, title: "HubSpot CRM", desc: "Sync your WhatsApp contacts directly to HubSpot and track conversational history in the contact timeline.", status: "Coming Soon" },
              { icon: <MessageCircle size={32} className="text-success" />, title: "Shopify", desc: "Send automated order confirmations, shipping updates, and abandoned cart recovery messages via WhatsApp.", status: "Coming Soon" },
              { icon: <TerminalSquare size={32} className="text-dark" />, title: "Custom Webhooks", desc: "Receive real-time HTTP POST requests on your own server whenever a new message is received.", status: "Available" },
              { icon: <Layers size={32} className="text-danger" />, title: "REST API", desc: "Build your own custom integrations using our comprehensive and well-documented Developer API.", status: "Available" },
            ].map((int, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="card h-100 border border-light shadow-sm p-4 hover-shadow transition-all">
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div className="bg-light p-3 rounded-3">{int.icon}</div>
                    <span className={`badge ${int.status === 'Available' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                      {int.status}
                    </span>
                  </div>
                  <h5 className="fw-bold mb-2">{int.title}</h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>{int.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 pt-5 border-top border-light text-center">
            <h4 className="fw-bolder mb-3">Need a custom integration?</h4>
            <p className="text-muted mb-4">Our Developer API allows you to build exactly what you need.</p>
            <Link to="/docs" className="btn btn-dark px-4 py-2 fw-bold">Read API Docs</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicIntegrations;
