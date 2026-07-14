import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlayCircle, CheckCircle2, MessageSquare, Zap, Bot, FileText, 
  BarChart, Users, Check, MapPin,
  Mail, Phone, Code, Bell, Key
} from 'lucide-react';

const LandingHome = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-5 pt-lg-7 pb-lg-5 overflow-hidden">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-light-success text-success fw-bold mb-4">
                <span className="badge bg-success rounded-circle p-1"><Check size={12} /></span>
                #1 WhatsApp Marketing Platform
              </div>
              <h1 className="display-4 fw-bolder mb-4 text-dark" style={{ letterSpacing: '-1.5px', lineHeight: '1.1' }}>
                WhatsApp Marketing <br className="d-none d-lg-block" />
                Made <span className="text-success">Simple, Powerful</span> <br className="d-none d-lg-block" />
                & Results Driven
              </h1>
              <p className="lead text-muted mb-5 pe-lg-5" style={{ fontSize: '1.1rem' }}>
                Send bulk messages, run smart campaigns, automate customer chats with chatbot & grow your business.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3 mb-5">
                <Link to="/register" className="btn btn-success btn-lg fw-bold rounded-1 px-5 shadow-sm">
                  Start Free Trial
                </Link>
                <Link to="/contact" className="btn btn-outline-dark btn-lg fw-bold rounded-1 px-4 d-flex align-items-center justify-content-center gap-2">
                  <PlayCircle size={20} /> Watch Demo
                </Link>
              </div>
              
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4 text-start">
                <div>
                  <h4 className="fw-bolder mb-0">10,000+</h4>
                  <p className="text-muted small mb-0">Happy Customers</p>
                </div>
                <div>
                  <h4 className="fw-bolder mb-0">99.9%</h4>
                  <p className="text-muted small mb-0">Delivery Rate</p>
                </div>
                <div>
                  <h4 className="fw-bolder mb-0">24/7</h4>
                  <p className="text-muted small mb-0">Customer Support</p>
                </div>
                <div>
                  <h4 className="fw-bolder mb-0">100%</h4>
                  <p className="text-muted small mb-0">Secure & Safe</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 position-relative">
              {/* Dashboard Placeholder Graphic */}
              <div className="bg-light rounded-4 shadow-lg p-4 border border-light position-relative" style={{ height: '500px', background: 'linear-gradient(145deg, #ffffff, #f0f0f0)' }}>
                {/* Simulated UI Header */}
                <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                  <div className="bg-success text-white p-2 rounded-2"><MessageSquare size={20} /></div>
                  <div className="fw-bold fs-5">Dashboard</div>
                  <div className="ms-auto d-flex gap-2">
                     <div className="bg-secondary rounded-circle" style={{ width: '12px', height: '12px', opacity: 0.2 }}></div>
                     <div className="bg-secondary rounded-circle" style={{ width: '12px', height: '12px', opacity: 0.2 }}></div>
                     <div className="bg-secondary rounded-circle" style={{ width: '12px', height: '12px', opacity: 0.2 }}></div>
                  </div>
                </div>
                
                {/* Simulated UI Stats */}
                <div className="row g-3 mb-4">
                  <div className="col-4">
                    <div className="bg-white p-3 rounded-3 shadow-sm border border-light">
                      <div className="text-muted small mb-1">Messages Sent</div>
                      <div className="fw-bolder fs-4">125,890</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-white p-3 rounded-3 shadow-sm border border-light">
                      <div className="text-muted small mb-1">Delivered</div>
                      <div className="fw-bolder fs-4 text-primary">120,455</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-white p-3 rounded-3 shadow-sm border border-light">
                      <div className="text-muted small mb-1">Read Rate</div>
                      <div className="fw-bolder fs-4 text-success">98.7%</div>
                    </div>
                  </div>
                </div>

                {/* Simulated UI Chart & List */}
                <div className="row g-3">
                  <div className="col-7">
                    <div className="bg-white p-3 rounded-3 shadow-sm border border-light h-100 d-flex flex-column justify-content-end align-items-center pb-4 relative overflow-hidden">
                       <div className="w-100 px-3 d-flex align-items-end justify-content-between" style={{ height: '120px' }}>
                          <div className="bg-primary-subtle rounded-top w-100 mx-1" style={{ height: '40%' }}></div>
                          <div className="bg-success-subtle rounded-top w-100 mx-1" style={{ height: '70%' }}></div>
                          <div className="bg-primary-subtle rounded-top w-100 mx-1" style={{ height: '50%' }}></div>
                          <div className="bg-success-subtle rounded-top w-100 mx-1" style={{ height: '90%' }}></div>
                          <div className="bg-primary-subtle rounded-top w-100 mx-1" style={{ height: '60%' }}></div>
                       </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="bg-white p-3 rounded-3 shadow-sm border border-light h-100">
                      <div className="fw-bold small mb-3">Recent Campaigns</div>
                      {[1,2,3].map(i => (
                        <div key={i} className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                          <div className="d-flex align-items-center gap-2">
                             <div className="bg-light rounded p-1"><Zap size={14} className="text-warning" /></div>
                             <div className="small fw-medium" style={{ fontSize: '11px' }}>Campaign {i}</div>
                          </div>
                          <div className="text-success small fw-bold" style={{ fontSize: '10px' }}>Completed</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="position-absolute bottom-0 end-0 translate-middle-y me-n4 bg-success text-white p-3 rounded-circle shadow-lg border border-4 border-white">
                   <MessageSquare size={32} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5 pt-5">
            <p className="text-muted small fw-medium text-uppercase tracking-widest mb-4">Trusted by 10,000+ Businesses Worldwide</p>
            <div className="d-flex flex-wrap justify-content-center gap-4 gap-lg-5 opacity-50">
              <span className="fs-5 fw-bold text-dark d-flex align-items-center gap-2"><div className="rounded-circle bg-dark" style={{ width:'20px', height:'20px'}}></div> TechFlow</span>
              <span className="fs-5 fw-bold text-dark d-flex align-items-center gap-2"><div className="rounded-circle bg-dark" style={{ width:'20px', height:'20px'}}></div> PentaCode</span>
              <span className="fs-5 fw-bold text-dark d-flex align-items-center gap-2"><div className="rounded-circle bg-dark" style={{ width:'20px', height:'20px'}}></div> Maxbizz</span>
              <span className="fs-5 fw-bold text-dark d-flex align-items-center gap-2"><div className="rounded-circle bg-dark" style={{ width:'20px', height:'20px'}}></div> GrowFast</span>
              <span className="fs-5 fw-bold text-dark d-flex align-items-center gap-2"><div className="rounded-circle bg-dark" style={{ width:'20px', height:'20px'}}></div> SoftNext</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-5 bg-light border-top border-bottom border-light">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder display-6 mb-3">Technical Capabilities <br /> Powering Your Growth</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              We've built WAMark from the ground up to support high-volume, reliable WhatsApp messaging.
            </p>
          </div>
          
          <div className="row g-4">
            {[
              { icon: <CheckCircle2 className="text-success" />, title: 'Multi-Device QR Sync', desc: 'Link your WhatsApp number seamlessly using the official Multi-Device protocol via QR code.' },
              { icon: <Zap className="text-primary" />, title: 'Bulk CSV Imports', desc: 'Upload .csv files and map columns dynamically for personalized bulk messaging.' },
              { icon: <Bell className="text-warning" />, title: 'Automated Reminders', desc: 'Schedule and send automated appointment or payment reminders to your customers.' },
              { icon: <Key className="text-danger" />, title: 'WhatsApp OTP & Auth', desc: 'Secure your app by sending OTP verification codes instantly via WhatsApp.' },
              { icon: <MessageSquare className="text-info" />, title: 'Live Inbox Sync', desc: 'Monitor inbound and outbound messages in real-time from a centralized dashboard.' },
              { icon: <Code className="text-dark" />, title: 'Developer REST APIs', desc: 'Generate Bearer tokens and trigger WhatsApp messages programmatically via API.' },
              { icon: <Bot className="text-primary" />, title: 'Anti-Ban Algorithms', desc: 'Configure exact batch sizes and time delays to mimic human sending patterns.' },
              { icon: <BarChart className="text-success" />, title: 'Real-Time Progress', desc: 'Watch your campaigns send in real-time with granular delivery statuses.' },
            ].map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 hover-shadow transition-all bg-white rounded-3">
                  <div className="bg-light p-3 rounded-3 d-inline-block mb-4" style={{ width: 'fit-content' }}>
                    {f.icon}
                  </div>
                  <h6 className="fw-bold mb-2">{f.title}</h6>
                  <p className="text-muted small mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center bg-white p-4 rounded-3 shadow-sm border border-light d-flex flex-column flex-md-row align-items-center justify-content-between max-w-4xl mx-auto">
             <div className="text-start mb-3 mb-md-0">
               <h5 className="fw-bold mb-1">Ready to explore these features?</h5>
               <p className="text-muted small mb-0">Read our comprehensive documentation to see how it works.</p>
             </div>
             <Link to="/docs" className="btn btn-dark px-4 py-2 fw-bold">Read the Docs</Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 pb-4">
            <h2 className="fw-bolder display-6 mb-2">How It Works</h2>
            <p className="text-muted">A transparent look at the exact workflow you'll use in the WAMark dashboard.</p>
          </div>

          <div className="row g-4 position-relative z-1 text-center justify-content-center">
            {/* Connecting lines for desktop */}
            <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle w-75" style={{ height: '2px', backgroundColor: '#e9ecef', zIndex: -1 }}></div>

            {[
              { icon: <MessageSquare size={32} className="text-white" />, color: 'bg-dark', step: 1, title: 'Scan QR Code', desc: 'Establish a live connection via Multi-Device QR sync.' },
              { icon: <Users size={32} className="text-white" />, color: 'bg-primary', step: 2, title: 'Upload CSV', desc: 'Upload .csv leads and dynamically map data columns.' },
              { icon: <FileText size={32} className="text-white" />, color: 'bg-warning', step: 3, title: 'Configure Delays', desc: 'Set batch sizes and delays to avoid getting banned.' },
              { icon: <BarChart size={32} className="text-white" />, color: 'bg-success', step: 4, title: 'Dispatch Batch', desc: 'The background engine dispatches your messages.' },
            ].map((step, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="d-flex flex-column align-items-center bg-white p-3 rounded h-100">
                  <div className={`rounded-circle ${step.color} d-flex align-items-center justify-content-center mb-4 shadow-sm`} style={{ width: '80px', height: '80px' }}>
                    {step.icon}
                  </div>
                  <h4 className="fw-bold text-muted mb-1">{step.step}</h4>
                  <h6 className="fw-bolder mb-2">{step.title}</h6>
                  <p className="text-muted small px-3">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 text-center bg-light-success border border-success border-opacity-25 p-4 rounded-3 d-flex flex-column flex-md-row align-items-center justify-content-between max-w-4xl mx-auto">
             <div className="text-start mb-3 mb-md-0">
               <h5 className="fw-bold text-success mb-1">Start Your First Campaign Today!</h5>
               <p className="text-muted small mb-0">Join thousands of businesses already growing with WAMark.</p>
             </div>
             <Link to="/register" className="btn btn-success px-4 py-2 fw-bold">Start Free Trial</Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder display-6 mb-2">Simple, Transparent Pricing</h2>
            <p className="text-muted">Choose the plan that's perfect for your business.</p>
            
            <div className="d-inline-flex bg-white p-1 rounded-pill border shadow-sm mt-4">
              <button 
                className={`btn rounded-pill px-4 py-2 fw-medium border-0 ${billingCycle === 'monthly' ? 'btn-success text-white' : 'btn-light text-muted'}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`btn rounded-pill px-4 py-2 fw-medium border-0 ${billingCycle === 'yearly' ? 'btn-success text-white' : 'btn-light text-muted'}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly <span className="badge bg-warning text-dark ms-1">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="row g-4 justify-content-center align-items-center">
            {/* Starter Plan */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-shadow transition-all bg-white">
                <h5 className="fw-bold mb-1">Starter</h5>
                <div className="mb-4">
                  <span className="fs-1 fw-bolder">₹{billingCycle === 'monthly' ? '999' : '799'}</span>
                  <span className="text-muted small">/month</span>
                </div>
                <p className="text-muted small mb-4 pb-2 border-bottom">Perfect for small businesses</p>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-5">
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> 5,000 Messages / Month</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> 1 WhatsApp Account</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Basic Templates</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Standard Support</li>
                </ul>
                <button className="btn btn-outline-dark w-100 py-2 fw-bold rounded-1 mt-auto">Start Free Trial</button>
              </div>
            </div>

            {/* Business Plan (Popular) */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-2 border-success shadow p-4 rounded-4 position-relative bg-white" style={{ transform: 'scale(1.05)', zIndex: 2 }}>
                <div className="position-absolute top-0 start-50 translate-middle-x bg-success text-white px-3 py-1 rounded-bottom small fw-bold">
                  Most Popular
                </div>
                <h5 className="fw-bold mb-1 mt-3">Business</h5>
                <div className="mb-4">
                  <span className="fs-1 fw-bolder">₹{billingCycle === 'monthly' ? '2,499' : '1,999'}</span>
                  <span className="text-muted small">/month</span>
                </div>
                <p className="text-muted small mb-4 pb-2 border-bottom">Great for growing businesses</p>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-5">
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> 25,000 Messages / Month</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> 3 WhatsApp Accounts</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Premium Templates</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Chatbot (Basic)</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Priority Support</li>
                </ul>
                <button className="btn btn-success w-100 py-2 fw-bold rounded-1 mt-auto">Start Free Trial</button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-shadow transition-all bg-white">
                <h5 className="fw-bold mb-1">Enterprise</h5>
                <div className="mb-4 mt-2">
                  <span className="fs-2 fw-bolder">Custom</span>
                </div>
                <p className="text-muted small mb-4 pb-2 border-bottom mt-1">For large scale organizations</p>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-5">
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Unlimited Messages</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Unlimited Accounts</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Advanced Chatbot</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> API Access</li>
                  <li className="small d-flex align-items-start gap-2"><CheckCircle2 size={18} className="text-success shrink-0" /> Dedicated Support</li>
                </ul>
                <button className="btn btn-outline-dark w-100 py-2 fw-bold rounded-1 mt-auto">Contact Sales</button>
              </div>
            </div>
          </div>
          
          <div className="row mt-5 pt-4 border-top border-light text-center g-4">
             <div className="col-md-3 d-flex align-items-center justify-content-center gap-2 text-muted small">
                <CheckCircle2 size={20} className="text-success" /> No Setup Fees
             </div>
             <div className="col-md-3 d-flex align-items-center justify-content-center gap-2 text-muted small">
                <CheckCircle2 size={20} className="text-success" /> 14-Day Free Trial
             </div>
             <div className="col-md-3 d-flex align-items-center justify-content-center gap-2 text-muted small">
                <CheckCircle2 size={20} className="text-success" /> Cancel Anytime
             </div>
             <div className="col-md-3 d-flex align-items-center justify-content-center gap-2 text-muted small">
                <CheckCircle2 size={20} className="text-success" /> 100% Secure
             </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section id="contact" className="py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-5">
              <h2 className="fw-bolder display-6 mb-3">Get in Touch</h2>
              <p className="text-muted mb-5">We're here to help you grow your business on WhatsApp.</p>
              
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light-success text-success p-3 rounded-circle">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email Us</h6>
                    <p className="text-muted small mb-0">support@wamark.com</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light-success text-success p-3 rounded-circle">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Call Us</h6>
                    <p className="text-muted small mb-0">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light-success text-success p-3 rounded-circle">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">WhatsApp</h6>
                    <p className="text-muted small mb-0">+91 98765 43210 (Support)</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light-success text-success p-3 rounded-circle">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Address</h6>
                    <p className="text-muted small mb-0">123, Business Street, Mumbai,<br/>Maharashtra, India - 400001</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-7">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light h-100">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Your Name</label>
                      <input type="text" className="form-control bg-light border-0 py-2" placeholder="John Doe" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Email Address</label>
                      <input type="email" className="form-control bg-light border-0 py-2" placeholder="john@example.com" />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Subject</label>
                      <input type="text" className="form-control bg-light border-0 py-2" placeholder="How can we help you?" />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Message</label>
                      <textarea className="form-control bg-light border-0 py-2" rows={5} placeholder="Type your message here..."></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-success w-100 py-3 fw-bold rounded-1">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingHome;
