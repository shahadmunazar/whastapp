import { useState } from 'react';

import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="bg-white min-vh-100 pb-5">
      {/* Header */}
      <section className="py-5 bg-light border-bottom border-light text-center">
        <div className="container py-4">
          <h1 className="fw-bolder display-5 mb-3">Simple, Transparent Pricing</h1>
          <p className="text-muted mx-auto lead" style={{ maxWidth: '600px' }}>
            Choose the plan that's perfect for your business.
          </p>
        </div>
      </section>

      {/* Pricing Content */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="d-inline-flex bg-white p-1 rounded-pill border shadow-sm">
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
    </div>
  );
};

export default Pricing;
