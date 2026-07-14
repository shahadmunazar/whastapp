import { Link } from 'react-router-dom';
import { Bell, Key, Clock, CalendarCheck, Shield, ChevronRight } from 'lucide-react';

const AutomatedMessagesFeature = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="py-5 bg-light border-bottom border-light">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-warning-subtle text-warning-emphasis fw-bold mb-4">
                <Clock size={14} /> Automated Workflows
              </div>
              <h1 className="display-4 fw-bolder mb-4 text-dark" style={{ letterSpacing: '-1px' }}>
                Set it and forget it. <br />
                <span className="text-warning">Automated</span> WhatsApp Messaging.
              </h1>
              <p className="lead text-muted mb-5">
                Trigger instant WhatsApp messages based on user actions. Send OTP verifications, payment reminders, and appointment alerts seamlessly through our Developer API.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/register" className="btn btn-warning btn-lg fw-bold rounded-1 px-5 shadow-sm">
                  Get API Key
                </Link>
                <Link to="/docs" className="btn btn-outline-dark btn-lg fw-bold rounded-1 px-4">
                  View API Docs
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6">
              {/* Graphic */}
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="bg-white p-4 rounded-4 shadow-sm border border-light h-100 position-relative">
                    <div className="bg-warning text-white p-2 rounded-circle d-inline-flex mb-3"><Bell size={20} /></div>
                    <h6 className="fw-bold">Payment Reminder</h6>
                    <div className="bg-light p-3 rounded-3 mt-3 font-monospace small text-muted">
                      "Hi Alex, your invoice #1234 for $50 is due tomorrow. Click here to pay."
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="bg-white p-4 rounded-4 shadow-sm border border-light h-100 position-relative" style={{ top: '30px' }}>
                    <div className="bg-danger text-white p-2 rounded-circle d-inline-flex mb-3"><Key size={20} /></div>
                    <h6 className="fw-bold">OTP Verification</h6>
                    <div className="bg-light p-3 rounded-3 mt-3 font-monospace small text-muted">
                      "Your verification code is 849201. It expires in 5 minutes."
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="bg-white p-4 rounded-4 shadow-sm border border-light h-100 position-relative">
                    <div className="bg-primary text-white p-2 rounded-circle d-inline-flex mb-3"><CalendarCheck size={20} /></div>
                    <h6 className="fw-bold">Appointment Alert</h6>
                    <div className="bg-light p-3 rounded-3 mt-3 font-monospace small text-muted">
                      "Just a reminder for your dentist appointment tomorrow at 10:00 AM."
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="bg-dark text-white p-4 rounded-4 shadow-sm h-100 position-relative d-flex flex-column justify-content-center" style={{ top: '30px' }}>
                    <h6 className="fw-bold mb-3">Trigger via API</h6>
                    <div className="bg-black p-2 rounded-3 font-monospace text-success" style={{ fontSize: '10px' }}>
                      POST /api/send<br/>
                      {`{ "to": "919...", "msg": "..." }`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-5 my-lg-5">
        <div className="container py-4">
          <div className="text-center mb-5 pb-4">
             <h2 className="fw-bolder display-6 mb-3">Why automate on WhatsApp?</h2>
             <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
               WhatsApp has a 98% open rate compared to email's 20%. When a message matters, send it where your customers will actually read it.
             </p>
          </div>

          <div className="row g-5 justify-content-center">
            {[
              { icon: <Shield size={32} />, title: "Secure & Instant OTPs", desc: "Replace expensive and unreliable SMS OTPs. WhatsApp delivers verification codes globally in under 2 seconds, drastically improving your user conversion rates." },
              { icon: <Bell size={32} />, title: "Reduce No-Shows", desc: "Automated reminders ensure your clients never miss an appointment or a payment deadline, directly impacting your bottom line." },
            ].map((feature, i) => (
              <div key={i} className="col-md-6 col-lg-5">
                <div className="bg-white border p-4 p-md-5 rounded-4 h-100 hover-shadow transition-all">
                  <div className="bg-light d-inline-flex p-3 rounded-circle text-warning mb-4 shadow-sm">
                    {feature.icon}
                  </div>
                  <h4 className="fw-bold mb-3">{feature.title}</h4>
                  <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>{feature.desc}</p>
                  <Link to="/docs" className="text-decoration-none fw-bold text-dark d-inline-flex align-items-center gap-1 hover-primary">
                    See Developer Docs <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-5 bg-warning text-dark text-center">
        <div className="container py-5">
          <h2 className="fw-bolder display-6 mb-4">Integrate WhatsApp into your workflow today.</h2>
          <Link to="/register" className="btn btn-dark btn-lg px-5 py-3 fw-bold rounded-pill">Start for Free</Link>
        </div>
      </section>
    </div>
  );
};

export default AutomatedMessagesFeature;
