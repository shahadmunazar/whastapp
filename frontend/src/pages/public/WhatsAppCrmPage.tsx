import { MessageCircle, Users, CheckCircle, FileText, Share2, Layers, ShieldCheck, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhatsAppCrmPage = () => {
  const features = [
    { title: 'Shared Inbox', icon: <MessageCircle /> },
    { title: 'Chat Assignment', icon: <Users /> },
    { title: 'Auto Reply', icon: <CheckCircle /> },
    { title: 'Chat History', icon: <FileText /> },
    { title: 'Media Support', icon: <Share2 /> },
    { title: 'Message Templates', icon: <Layers /> },
    { title: 'Bulk Messaging', icon: <MessageCircle /> },
    { title: 'Campaign Management', icon: <Layers /> },
    { title: 'Team Collaboration', icon: <Users /> },
    { title: 'Official API', icon: <ShieldCheck /> },
    { title: 'Integrations', icon: <Link2 /> },
    { title: 'Analytics', icon: <FileText /> }
  ];

  return (
    <div className="bg-white">
      <section className="py-5 py-lg-7 text-center position-relative overflow-hidden bg-light">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill mb-4 border border-success-subtle">
                WhatsApp Business Solutions
              </span>
              <h1 className="display-4 fw-bolder mb-4 text-dark">
                Official WhatsApp <br /> Business Solution
              </h1>
              <p className="lead text-muted mb-5 px-md-4">
                Engage customers using WhatsApp Business. Automate replies, send bulk campaigns, and collaborate with your team.
              </p>
              <Link to="/register" className="btn btn-success btn-lg fw-bold rounded-pill px-5 shadow-sm">
                Connect WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder">WhatsApp Features</h2>
            <p className="text-muted">Scale your communication securely with our official API integration.</p>
          </div>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 text-center hover-shadow transition-all rounded-4">
                  <div className="bg-success-subtle text-success p-3 rounded-circle d-inline-block mx-auto mb-3">
                    {feature.icon}
                  </div>
                  <h6 className="fw-bold mb-0">{feature.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-success text-white text-center">
        <div className="container py-5">
          <h2 className="display-6 fw-bolder mb-4">Start messaging your customers today.</h2>
          <Link to="/register" className="btn btn-light btn-lg fw-bold rounded-pill px-5 text-success shadow-sm mt-3">
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WhatsAppCrmPage;
