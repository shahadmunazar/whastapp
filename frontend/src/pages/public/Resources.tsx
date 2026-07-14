import { Link } from 'react-router-dom';
import { BookOpen, FileText, HelpCircle } from 'lucide-react';

const Resources = () => {
  return (
    <div className="bg-white min-vh-100">
      <section className="py-5 bg-light border-bottom border-light text-center">
        <div className="container py-4">
          <h1 className="fw-bolder display-5 mb-3">Resources & Help Center</h1>
          <p className="text-muted mx-auto lead" style={{ maxWidth: '600px' }}>
            Everything you need to master WAMark and grow your business.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <Link to="#" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all bg-white text-center">
                  <div className="bg-success text-white p-3 rounded-circle d-inline-flex mx-auto mb-3">
                    <BookOpen size={24} />
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Blog</h5>
                  <p className="text-muted small mb-0">Latest tips, trends, and strategies for WhatsApp marketing.</p>
                </div>
              </Link>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <Link to="/docs" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all bg-white text-center">
                  <div className="bg-primary text-white p-3 rounded-circle d-inline-flex mx-auto mb-3">
                    <FileText size={24} />
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Guides & Docs</h5>
                  <p className="text-muted small mb-0">Step-by-step guides to help you set up and scale your campaigns.</p>
                </div>
              </Link>
            </div>

            <div className="col-md-6 col-lg-3">
              <Link to="/api-features" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all bg-white text-center">
                  <div className="bg-warning text-white p-3 rounded-circle d-inline-flex mx-auto mb-3">
                    <FileText size={24} />
                  </div>
                  <h5 className="fw-bold text-dark mb-2">API Documentation</h5>
                  <p className="text-muted small mb-0">Complete documentation for developers to integrate WAMark.</p>
                </div>
              </Link>
            </div>

            <div className="col-md-6 col-lg-3">
              <Link to="/contact" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all bg-white text-center">
                  <div className="bg-danger text-white p-3 rounded-circle d-inline-flex mx-auto mb-3">
                    <HelpCircle size={24} />
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Help Center</h5>
                  <p className="text-muted small mb-0">FAQs and support articles to answer your questions.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
