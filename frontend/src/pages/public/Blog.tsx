import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      <section className="py-5 bg-light border-bottom border-light">
        <div className="container py-5 text-center">
          <div className="d-inline-flex bg-success-subtle text-success p-3 rounded-circle mb-4">
            <BookOpen size={32} />
          </div>
          <h1 className="display-4 fw-bolder mb-3">The WAMark Blog</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Tips, strategies, and updates on how to master WhatsApp marketing and grow your business.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">
            {/* Featured Post */}
            <div className="col-12 mb-4">
              <div className="card border-0 bg-dark text-white rounded-4 overflow-hidden shadow-lg position-relative min-vh-25 d-flex align-items-end p-5" style={{ background: 'linear-gradient(45deg, #1a1a1a, #2c3e50)' }}>
                <div className="position-relative z-1" style={{ maxWidth: '600px' }}>
                  <span className="badge bg-success mb-3 px-3 py-2">Featured Guide</span>
                  <h2 className="fw-bolder mb-3">How to Avoid WhatsApp Bans in 2024: The Ultimate Guide</h2>
                  <p className="text-white-50 mb-4">Learn the exact batching strategies, message variations, and technical setups required to keep your WhatsApp numbers safe while sending bulk campaigns.</p>
                  <Link to="#" className="btn btn-light fw-bold px-4">Read Article</Link>
                </div>
              </div>
            </div>

            {/* Grid Posts */}
            {[
              { tag: "Marketing", title: "5 Proven WhatsApp Message Templates for E-commerce", date: "Oct 12, 2023" },
              { tag: "Engineering", title: "Migrating to the WhatsApp Multi-Device Architecture", date: "Oct 05, 2023" },
              { tag: "Case Study", title: "How RetailX Increased Conversions by 40% using Automated Reminders", date: "Sep 28, 2023" },
              { tag: "Product Update", title: "Introducing: Real-time Inbox Sync and Message Threading", date: "Sep 15, 2023" },
              { tag: "Marketing", title: "WhatsApp OTP vs SMS OTP: A Cost-Benefit Analysis", date: "Sep 02, 2023" },
              { tag: "Best Practices", title: "How to Build a WhatsApp Opt-in List from Scratch", date: "Aug 20, 2023" },
            ].map((post, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="card h-100 border border-light shadow-sm hover-shadow transition-all rounded-4 overflow-hidden">
                  <div className="bg-light w-100 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                    <BookOpen size={48} className="text-muted opacity-25" />
                  </div>
                  <div className="p-4">
                    <span className="text-success small fw-bold text-uppercase tracking-wider">{post.tag}</span>
                    <h5 className="fw-bold mt-2 mb-3" style={{ lineHeight: '1.4' }}>{post.title}</h5>
                    <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top border-light">
                      <span className="text-muted small d-flex align-items-center gap-1"><Calendar size={14} /> {post.date}</span>
                      <Link to="#" className="text-dark text-decoration-none fw-bold small d-flex align-items-center gap-1 hover-primary">
                        Read <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5 pt-4">
            <button className="btn btn-outline-dark px-4 py-2 fw-bold rounded-pill">Load More Articles</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
