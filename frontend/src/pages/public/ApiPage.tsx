import { 
  Network, Database, LayoutTemplate, Layers, 
  Link as LinkIcon, Zap, Monitor, Lock, Users, MessageCircle, MessageSquare, 
  BarChart2, FileText, Calendar, Share2, CreditCard 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ApiPage = () => {
  const apis = [
    { title: 'CRM API', icon: <Database /> },
    { title: 'Leads API', icon: <Users /> },
    { title: 'Contacts API', icon: <LayoutTemplate /> },
    { title: 'WhatsApp API', icon: <MessageCircle /> },
    { title: 'SMS API', icon: <MessageSquare /> },
    { title: 'Authentication API', icon: <Lock /> },
    { title: 'Reports API', icon: <BarChart2 /> },
    { title: 'Webhooks', icon: <Network /> }
  ];

  const integrations = [
    { title: 'Google Sheets', icon: <FileText /> },
    { title: 'Google Calendar', icon: <Calendar /> },
    { title: 'Facebook Lead Ads', icon: <Share2 /> },
    { title: 'WhatsApp Business', icon: <MessageCircle /> },
    { title: 'SMS Gateways', icon: <Zap /> },
    { title: 'Payment Gateway', icon: <CreditCard /> },
    { title: 'Zoom', icon: <Monitor /> },
    { title: 'Zapier', icon: <Layers /> },
    { title: 'Custom Webhooks', icon: <LinkIcon /> }
  ];

  return (
    <div className="bg-white">
      <section className="py-5 py-lg-7 text-center position-relative overflow-hidden bg-dark text-white">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="badge bg-secondary text-light fw-bold px-3 py-2 rounded-pill mb-4 border border-secondary">
                For Developers
              </span>
              <h1 className="display-4 fw-bolder mb-4">
                Powerful Developer APIs
              </h1>
              <p className="lead opacity-75 mb-5 px-md-4">
                Integrate our platform into your existing applications. Build custom workflows, connect external tools, and extend functionality seamlessly.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link to="/register" className="btn btn-primary btn-lg fw-bold rounded-pill px-5 shadow-sm">
                  Get API Keys
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg fw-bold rounded-pill px-5">
                  Read Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder">Available APIs</h2>
            <p className="text-muted">Comprehensive REST APIs for every feature.</p>
          </div>
          <div className="row g-4">
            {apis.map((api, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 text-center hover-shadow transition-all rounded-4">
                  <div className="bg-dark text-white p-3 rounded-circle d-inline-block mx-auto mb-3">
                    {api.icon}
                  </div>
                  <h6 className="fw-bold mb-0">{api.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder">Native Integrations</h2>
            <p className="text-muted">Connect with your favorite tools out of the box.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {integrations.map((integration, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 border border-light shadow-sm p-4 text-center hover-shadow transition-all rounded-4">
                  <div className="text-primary mb-3">
                    {integration.icon}
                  </div>
                  <h6 className="fw-bold mb-0">{integration.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiPage;
