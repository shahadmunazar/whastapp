import { Target, BarChart3, Users, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const CrmPage = () => {
  const features = [
    { title: 'Lead Capture', icon: <Target /> },
    { title: 'Lead Assignment', icon: <Users /> },
    { title: 'Lead Tracking', icon: <BarChart3 /> },
    { title: 'Customer History', icon: <FileText /> },
    { title: 'Notes', icon: <FileText /> },
    { title: 'Activities', icon: <BarChart3 /> },
    { title: 'Tasks', icon: <CheckCircle /> },
    { title: 'Reminders', icon: <CheckCircle /> },
    { title: 'Follow-up Management', icon: <CheckCircle /> },
    { title: 'Receipts', icon: <FileText /> },
    { title: 'Invoices', icon: <FileText /> },
    { title: 'Reports', icon: <BarChart3 /> }
  ];

  return (
    <div className="bg-white">
      <section className="py-5 py-lg-7 text-center position-relative overflow-hidden bg-light">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-4 border border-primary-subtle">
                Customer Relationship Management
              </span>
              <h1 className="display-4 fw-bolder mb-4 text-dark">
                Complete Customer <br /> Relationship Management
              </h1>
              <p className="lead text-muted mb-5 px-md-4">
                Manage every customer interaction from one dashboard. Connect, track, and close more deals seamlessly.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg fw-bold rounded-pill px-5 shadow-sm">
                Start Managing Customers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder">Powerful CRM Features</h2>
            <p className="text-muted">Everything you need to nurture leads and retain customers.</p>
          </div>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 text-center hover-shadow transition-all rounded-4">
                  <div className="bg-primary-subtle text-primary p-3 rounded-circle d-inline-block mx-auto mb-3">
                    {feature.icon}
                  </div>
                  <h6 className="fw-bold mb-0">{feature.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-primary text-white text-center">
        <div className="container py-5">
          <h2 className="display-6 fw-bolder mb-4">Ready to upgrade your sales pipeline?</h2>
          <Link to="/register" className="btn btn-light btn-lg fw-bold rounded-pill px-5 text-primary shadow-sm mt-3">
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CrmPage;
