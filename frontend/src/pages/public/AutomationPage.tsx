import { Zap, Clock, Mail, MessageCircle, MessageSquare, Users, Bell, Calendar, Send, ShieldCheck, Cpu, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const AutomationPage = () => {
  const features = [
    { title: 'Auto WhatsApp', icon: <MessageCircle /> },
    { title: 'Auto SMS', icon: <MessageSquare /> },
    { title: 'Email Automation', icon: <Mail /> },
    { title: 'Lead Assignment', icon: <Users /> },
    { title: 'Reminder Notifications', icon: <Bell /> },
    { title: 'Scheduled Campaigns', icon: <Calendar /> },
    { title: 'Auto Follow-ups', icon: <RefreshCw /> },
    { title: 'Birthday Wishes', icon: <Send /> },
    { title: 'Welcome Messages', icon: <ShieldCheck /> },
    { title: 'Event Triggers', icon: <Zap /> },
    { title: 'Drip Campaigns', icon: <Clock /> },
    { title: 'AI Routing', icon: <Cpu /> }
  ];

  return (
    <div className="bg-white">
      <section className="py-5 py-lg-7 text-center position-relative overflow-hidden bg-light">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="badge bg-danger-subtle text-danger fw-bold px-3 py-2 rounded-pill mb-4 border border-danger-subtle">
                Workflow Automation
              </span>
              <h1 className="display-4 fw-bolder mb-4 text-dark">
                Save Time with <br /> Automation
              </h1>
              <p className="lead text-muted mb-5 px-md-4">
                Automate repetitive work. Trigger messages, assign leads, and follow up with customers automatically while you sleep.
              </p>
              <Link to="/register" className="btn btn-danger btn-lg fw-bold rounded-pill px-5 shadow-sm">
                Automate Your Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder">Automation Features</h2>
            <p className="text-muted">Work smarter, not harder.</p>
          </div>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 text-center hover-shadow transition-all rounded-4">
                  <div className="bg-danger-subtle text-danger p-3 rounded-circle d-inline-block mx-auto mb-3">
                    {feature.icon}
                  </div>
                  <h6 className="fw-bold mb-0">{feature.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-danger text-white text-center">
        <div className="container py-5">
          <h2 className="display-6 fw-bolder mb-4">Ready to put your business on autopilot?</h2>
          <Link to="/register" className="btn btn-light btn-lg fw-bold rounded-pill px-5 text-danger shadow-sm mt-3">
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AutomationPage;
