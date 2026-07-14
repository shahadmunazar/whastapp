import { Link } from 'react-router-dom';
import { PlayCircle, UploadCloud, Users, Zap, ShieldCheck, CheckCircle2, BarChart } from 'lucide-react';

const CampaignsFeature = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="py-5 bg-light border-bottom border-light">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-primary-subtle text-primary fw-bold mb-4">
                <Zap size={14} /> Bulk Campaigns Engine
              </div>
              <h1 className="display-4 fw-bolder mb-4 text-dark" style={{ letterSpacing: '-1px' }}>
                Reach thousands on <span className="text-success">WhatsApp</span> without getting banned.
              </h1>
              <p className="lead text-muted mb-5">
                Upload your CSV, map your columns, and let our intelligent batch-sending algorithms deliver personalized messages at scale while keeping your number safe.
              </p>
              <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-primary btn-lg fw-bold rounded-1 px-5 shadow-sm">
                  Start Sending
                </Link>
                <Link to="/contact" className="btn btn-outline-dark btn-lg fw-bold rounded-1 px-4">
                  Book a Demo
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6">
              {/* Abstract Graphic */}
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg border border-light position-relative">
                <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                  <div className="fw-bold fs-5">New Campaign</div>
                  <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">Ready to send</span>
                </div>
                
                <div className="d-flex align-items-center gap-3 bg-light p-3 rounded-3 mb-3">
                  <div className="bg-primary text-white p-2 rounded"><UploadCloud size={20} /></div>
                  <div>
                    <div className="fw-bold small">leads_q3.csv</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>12,450 Contacts Imported</div>
                  </div>
                  <div className="ms-auto"><CheckCircle2 className="text-success" size={20} /></div>
                </div>

                <div className="bg-light p-3 rounded-3 mb-4 font-monospace small text-muted">
                  Hi {'{{Name}}'}, here is your custom offer: {'{{DiscountCode}}'}
                </div>

                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <div className="border p-2 rounded bg-white text-center">
                      <div className="text-muted" style={{ fontSize: '10px' }}>Batch Size</div>
                      <div className="fw-bold">50 Msgs</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="border p-2 rounded bg-white text-center">
                      <div className="text-muted" style={{ fontSize: '10px' }}>Delay</div>
                      <div className="fw-bold">15 Secs</div>
                    </div>
                  </div>
                </div>

                <button className="btn btn-success w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow">
                  <PlayCircle size={20} /> Start Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-5 my-lg-5">
        <div className="container py-4">
          <div className="text-center mb-5 pb-4">
             <h2 className="fw-bolder display-6 mb-3">How the Engine Works</h2>
             <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
               We handles the complexity of rate-limiting, variable mapping, and connection stability so you can focus on your marketing copy.
             </p>
          </div>

          <div className="row g-5">
            {[
              { icon: <Users size={32} />, title: "Smart CSV Mapping", desc: "Our importer automatically detects phone numbers and allows you to map custom variables (Name, Company, Dates) to personalize every single message." },
              { icon: <ShieldCheck size={32} />, title: "Anti-Ban Protection", desc: "WhatsApp bans numbers that send messages too fast. Our algorithm breaks your list into batches and injects random delays to mimic human behavior." },
              { icon: <BarChart size={32} />, title: "Real-time Tracking", desc: "Watch exactly who received the message, who read it, and who failed. Pause, stop, or resume your campaigns at any moment." }
            ].map((feature, i) => (
              <div key={i} className="col-lg-4 text-center">
                <div className="bg-light d-inline-flex p-4 rounded-circle text-primary mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h4 className="fw-bold mb-3">{feature.title}</h4>
                <p className="text-muted px-3" style={{ lineHeight: '1.8' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container py-5">
          <h2 className="fw-bolder display-6 mb-4">Start your first campaign today.</h2>
          <Link to="/register" className="btn btn-success btn-lg px-5 py-3 fw-bold rounded-pill">Create Free Account</Link>
        </div>
      </section>
    </div>
  );
};

export default CampaignsFeature;
