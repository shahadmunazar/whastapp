import { Users, Filter, BarChart2, Activity, CheckSquare, Zap, Search, LayoutList, Layers, Share2, MessageSquare, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const LeadManagementPage = () => {
  const features = [
    { title: 'Lead Capture', icon: <Filter /> },
    { title: 'Duplicate Detection', icon: <AlertCircle /> },
    { title: 'Source Tracking', icon: <Search /> },
    { title: 'Pipeline Stages', icon: <Layers /> },
    { title: 'Status Management', icon: <Activity /> },
    { title: 'Team Assignment', icon: <Users /> },
    { title: 'Activity Tracking', icon: <LayoutList /> },
    { title: 'Follow-ups', icon: <CheckSquare /> },
    { title: 'Automation', icon: <Zap /> },
    { title: 'Lead Scoring', icon: <BarChart2 /> },
    { title: 'Quick Contact', icon: <MessageSquare /> },
    { title: 'Collaboration', icon: <Share2 /> }
  ];

  return (
    <div className="bg-white">
      <section className="py-5 py-lg-7 text-center position-relative overflow-hidden bg-light">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="badge bg-warning-subtle text-warning fw-bold px-3 py-2 rounded-pill mb-4 border border-warning-subtle">
                Sales Pipeline
              </span>
              <h1 className="display-4 fw-bolder mb-4 text-dark">
                Convert More Leads <br /> into Customers
              </h1>
              <p className="lead text-muted mb-5 px-md-4">
                Never miss an opportunity. Capture, track, and nurture leads effectively across your entire sales funnel.
              </p>
              <Link to="/register" className="btn btn-warning text-dark btn-lg fw-bold rounded-pill px-5 shadow-sm">
                Start Tracking Leads
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder">Lead Management Features</h2>
            <p className="text-muted">Tools designed to accelerate your sales cycle.</p>
          </div>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 text-center hover-shadow transition-all rounded-4">
                  <div className="bg-warning-subtle text-warning p-3 rounded-circle d-inline-block mx-auto mb-3">
                    {feature.icon}
                  </div>
                  <h6 className="fw-bold mb-0">{feature.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-warning text-dark text-center">
        <div className="container py-5">
          <h2 className="display-6 fw-bolder mb-4">Ready to close more deals?</h2>
          <Link to="/register" className="btn btn-dark btn-lg fw-bold rounded-pill px-5 shadow-sm mt-3">
            Try It For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LeadManagementPage;
