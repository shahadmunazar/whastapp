import { MessageSquare, Clock, UploadCloud, FileText, Zap, Globe, Users, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const BulkSmsPage = () => {
  const features = [
    { title: 'Promotional SMS', icon: <MessageSquare /> },
    { title: 'Transactional SMS', icon: <Zap /> },
    { title: 'OTP SMS', icon: <ShieldCheck /> },
    { title: 'Unicode SMS', icon: <Globe /> },
    { title: 'Flash SMS', icon: <Zap /> },
    { title: 'Scheduled SMS', icon: <Clock /> },
    { title: 'Bulk Upload', icon: <UploadCloud /> },
    { title: 'Delivery Reports', icon: <FileText /> },
    { title: 'Contact Groups', icon: <Users /> },
    { title: 'API Integration', icon: <Zap /> },
    { title: 'DND Filtering', icon: <ShieldCheck /> },
    { title: 'Templates', icon: <FileText /> }
  ];

  return (
    <div className="bg-white">
      <section className="py-5 py-lg-7 text-center position-relative overflow-hidden bg-light">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="badge bg-info-subtle text-info fw-bold px-3 py-2 rounded-pill mb-4 border border-info-subtle">
                SMS Marketing Platform
              </span>
              <h1 className="display-4 fw-bolder mb-4 text-dark">
                Powerful Bulk SMS <br /> Marketing
              </h1>
              <p className="lead text-muted mb-5 px-md-4">
                Send messages instantly to thousands of customers. High delivery rates, instant OTPs, and robust campaign tracking.
              </p>
              <Link to="/register" className="btn btn-info text-white btn-lg fw-bold rounded-pill px-5 shadow-sm">
                Start Sending SMS
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder">Bulk SMS Features</h2>
            <p className="text-muted">Reach your audience globally with reliable SMS delivery.</p>
          </div>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 text-center hover-shadow transition-all rounded-4">
                  <div className="bg-info-subtle text-info p-3 rounded-circle d-inline-block mx-auto mb-3">
                    {feature.icon}
                  </div>
                  <h6 className="fw-bold mb-0">{feature.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-info text-white text-center">
        <div className="container py-5">
          <h2 className="display-6 fw-bolder mb-4 text-white">Ready to launch your first SMS campaign?</h2>
          <Link to="/register" className="btn btn-light btn-lg fw-bold rounded-pill px-5 text-info shadow-sm mt-3">
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BulkSmsPage;
