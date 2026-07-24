import React, { useState } from 'react';
import axios from 'axios';
import { Mail, MapPin, Phone } from 'lucide-react';

const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/sales/public-query`, formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Failed to send message. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-5">
          <h1 className="fw-bolder mb-4">Get in touch</h1>
          <p className="lead text-muted mb-5">
            Have questions about our CRM, API, or custom enterprise solutions? We'd love to hear from you.
          </p>
          
          <div className="d-flex flex-column gap-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary-subtle text-primary p-3 rounded-circle">
                <Mail size={24} />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Email us</h6>
                <p className="text-muted mb-0">hello@dashercrm.com</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success-subtle text-success p-3 rounded-circle">
                <Phone size={24} />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Call us</h6>
                <p className="text-muted mb-0">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning-subtle text-warning p-3 rounded-circle">
                <MapPin size={24} />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Visit us</h6>
                <p className="text-muted mb-0">123 Messaging Lane, Tech City, TX</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
            <h3 className="fw-bold mb-4">Send a Message</h3>
            
            {success ? (
              <div className="alert alert-success d-flex align-items-center gap-2 p-4 border-0 bg-success-subtle rounded-3">
                <h5 className="mb-0 text-success">✨ Message sent successfully! Our team will contact you shortly.</h5>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium small">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 py-2" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium small">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control bg-light border-0 py-2" 
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium small">Message</label>
                    <textarea 
                      className="form-control bg-light border-0 py-2" 
                      rows={5} 
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      required 
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="row justify-content-center mt-5 pt-5 border-top">
        <div className="col-lg-10">
          <div className="text-center mb-5">
            <h2 className="fw-bolder display-6">Frequently Asked Questions</h2>
            <p className="text-muted lead">Find quick answers to common questions about our platform.</p>
          </div>
          <div className="accordion accordion-flush" id="faqAccordion">
            {[
              { q: 'What is CRM?', a: 'CRM helps businesses manage customers, leads, sales, and communications in one place.' },
              { q: 'Is WhatsApp API official?', a: 'Yes, we support integration with the official WhatsApp Business Platform, ensuring high deliverability and compliance.' },
              { q: 'Can I send Bulk SMS?', a: 'Yes, you can send promotional, transactional, and OTP SMS through supported SMS gateway providers.' },
              { q: 'Can multiple employees use the CRM?', a: 'Yes, role-based access allows multiple team members to collaborate securely and manage shared inboxes.' },
              { q: 'Is there a mobile app?', a: 'Yes, Android and iOS applications are available for managing customers on the go.' }
            ].map((faq, idx) => (
              <div className="accordion-item border-0 mb-3 bg-light rounded-4" key={idx}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed bg-transparent fw-bold fs-5 px-4 py-4 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${idx}`}>
                    {faq.q}
                  </button>
                </h2>
                <div id={`faq${idx}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body px-4 pb-4 pt-0 text-muted lh-lg">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
