import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Templates = () => {
  return (
    <div className="bg-white min-vh-100">
      {/* Header */}
      <section className="py-5 bg-light border-bottom border-light text-center">
        <div className="container py-4">
          <h1 className="fw-bolder display-5 mb-3">Message Templates</h1>
          <p className="text-muted mx-auto lead" style={{ maxWidth: '700px' }}>
            Choose from a wide range of pre-approved WhatsApp templates for different business needs.
          </p>
        </div>
      </section>

      {/* Templates Content */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">
            {/* Sidebar Categories */}
            <div className="col-lg-3">
              <div className="sticky-top" style={{ top: '100px' }}>
                <h6 className="fw-bold mb-3 text-uppercase tracking-wider small">Categories</h6>
                <div className="d-flex flex-column gap-2">
                  <button className="btn btn-success text-start fw-bold rounded-1 border-0 shadow-sm">All Templates</button>
                  <button className="btn btn-light text-start text-muted rounded-1 border-0">Promotional</button>
                  <button className="btn btn-light text-start text-muted rounded-1 border-0">Transactional</button>
                  <button className="btn btn-light text-start text-muted rounded-1 border-0">Utility</button>
                  <button className="btn btn-light text-start text-muted rounded-1 border-0">Authentication</button>
                  <button className="btn btn-light text-start text-muted rounded-1 border-0">Marketing</button>
                </div>
              </div>
            </div>
            
            {/* Template Cards */}
            <div className="col-lg-9">
              <div className="row g-4">
                {[
                  { name: 'Special Offer', type: 'Promotional', text: 'Hi {{name}}, \n\nEnjoy up to 50% OFF on all our products.\n\nShop now!' },
                  { name: 'Order Confirmation', type: 'Transactional', text: 'Hi {{name}}, \n\nYour order #{{order_id}} has been confirmed.\nThank you!' },
                  { name: 'Shipping Update', type: 'Utility', text: 'Hi {{name}}, \n\nYour order is on the way and will be delivered soon.' },
                  { name: 'Password Reset', type: 'Authentication', text: 'Hi {{name}}, \n\nUse {{otp}} to reset your password. This OTP is valid for 10 minutes.' },
                  { name: 'Appointment Reminder', type: 'Utility', text: 'Hi {{name}}, \n\nThis is a reminder for your appointment on {{date}} at {{time}}.' },
                  { name: 'Feedback Request', type: 'Marketing', text: 'Hi {{name}}, \n\nWe\'d love to hear your feedback. Please share your experience!' },
                ].map((tpl, i) => (
                  <div key={i} className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow transition-all bg-white p-0 overflow-hidden border border-light">
                      <div className="bg-light p-3 border-bottom d-flex align-items-center justify-content-between">
                        <h6 className="fw-bold mb-0">{tpl.name}</h6>
                        <span className="badge bg-white text-muted border fw-normal">{tpl.type}</span>
                      </div>
                      <div className="p-4 bg-white" style={{ minHeight: '150px' }}>
                         <p className="text-muted small mb-0" style={{ whiteSpace: 'pre-line' }}>{tpl.text}</p>
                      </div>
                      <div className="p-3 border-top bg-white text-center">
                         <button className="btn btn-outline-success btn-sm px-4 rounded-pill fw-bold">Use Template</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light-success text-center border-top border-success border-opacity-10">
        <div className="container py-4">
           <h3 className="fw-bold text-success mb-3">Can't find what you're looking for?</h3>
           <p className="text-muted mb-4">Create your own custom templates and get them approved in minutes.</p>
           <Link to="/register" className="btn btn-success px-5 py-3 fw-bold fs-6 shadow">Start Free Trial <ArrowRight size={18} className="ms-2"/></Link>
        </div>
      </section>
    </div>
  );
};

export default Templates;
