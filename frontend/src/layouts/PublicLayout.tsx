import { Outlet, Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-dark">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <MessageSquare size={18} />
            </div>
            WAMark
          </Link>
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#publicNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="publicNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium gap-lg-3" style={{ fontSize: '15px' }}>
              <li className="nav-item"><Link to="/" className="nav-link text-dark px-3">Home</Link></li>
              <li className="nav-item"><Link to="/features" className="nav-link text-dark px-3">Features</Link></li>
              <li className="nav-item"><Link to="/how-it-works" className="nav-link text-dark px-3">How It Works</Link></li>
              <li className="nav-item"><Link to="/templates" className="nav-link text-dark px-3">Templates</Link></li>
              <li className="nav-item"><Link to="/pricing" className="nav-link text-dark px-3">Pricing</Link></li>
              <li className="nav-item"><Link to="/docs" className="nav-link text-dark px-3">Docs</Link></li>
              <li className="nav-item"><Link to="/resources" className="nav-link text-dark px-3">Resources</Link></li>
            </ul>
            <div className="d-flex align-items-center gap-4">
              <Link to="/login" className="text-dark fw-bold text-decoration-none hover-primary transition-all">Log in</Link>
              <Link to="/register" className="btn btn-primary rounded-1 px-4 py-2 fw-bold shadow-sm">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
        <div className="container py-4">
          <div className="row g-4 justify-content-between">
            <div className="col-lg-3 pe-lg-4">
              <Link to="/" className="d-flex align-items-center gap-2 fw-bold fs-4 text-white text-decoration-none mb-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                  <MessageSquare size={18} />
                </div>
                WAMark
              </Link>
              <p className="text-muted mb-4 small" style={{ fontSize: '13px' }}>
                The most powerful WhatsApp marketing platform to grow your business faster.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-muted hover-primary transition-all"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-muted hover-primary transition-all"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-muted hover-primary transition-all"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-muted hover-primary transition-all"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-muted hover-primary transition-all"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            
            <div className="col-lg-2 col-6">
              <h6 className="fw-bold mb-4 text-white">Product</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><Link to="/features" className="text-muted text-decoration-none hover-primary">Features</Link></li>
                <li><Link to="/campaigns-feature" className="text-muted text-decoration-none hover-primary text-success fw-bold">Campaigns</Link></li>
                <li><Link to="/automated-messages" className="text-muted text-decoration-none hover-primary text-warning fw-bold">Automations</Link></li>
                <li><Link to="/pricing" className="text-muted text-decoration-none hover-primary">Pricing</Link></li>
                <li><Link to="/templates" className="text-muted text-decoration-none hover-primary">Templates</Link></li>
                <li><Link to="/integrations" className="text-muted text-decoration-none hover-primary">Integrations</Link></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-6">
              <h6 className="fw-bold mb-4 text-white">Resources</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><Link to="/docs" className="text-muted text-decoration-none hover-primary text-success fw-bold">Documentation</Link></li>
                <li><Link to="/blog" className="text-muted text-decoration-none hover-primary">Blog</Link></li>
                <li><Link to="/help" className="text-muted text-decoration-none hover-primary">Help Center</Link></li>
                <li><Link to="/resources" className="text-muted text-decoration-none hover-primary">Guides</Link></li>
                <li><Link to="/api-features" className="text-muted text-decoration-none hover-primary">API Docs</Link></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-6">
              <h6 className="fw-bold mb-4 text-white">Company</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><Link to="/about" className="text-muted text-decoration-none hover-primary">About Us</Link></li>
                <li><Link to="/careers" className="text-muted text-decoration-none hover-primary">Careers</Link></li>
                <li><Link to="/privacy" className="text-muted text-decoration-none hover-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted text-decoration-none hover-primary">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div className="col-lg-3">
              <h6 className="fw-bold mb-4 text-white">Newsletter</h6>
              <p className="text-muted small mb-3">Subscribe to get latest updates and exclusive offers.</p>
              <div className="input-group">
                <input type="email" className="form-control bg-dark text-white border-secondary" placeholder="Enter your email" />
                <button className="btn btn-primary px-3" type="button"><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
          
          <div className="border-top border-secondary mt-5 pt-4 text-center">
            <p className="text-muted mb-0 small" style={{ fontSize: '13px' }}>&copy; {new Date().getFullYear()} WAMark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
