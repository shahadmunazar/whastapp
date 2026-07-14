import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, Zap, Crown, Rocket, AlertCircle, Loader2, Calendar, ShieldCheck, Clock } from 'lucide-react';
import SubscriptionModal from '../components/SubscriptionModal';

const BACKEND_URL = 'http://localhost:3000/api';

const PricingCard = ({ title, price, icon: Icon, features, color, recommended = false, billingCycle, isCurrent, usage, limit, planStatus, onUpgrade }: any) => (
  <div className={`card border-0 shadow-lg h-100 overflow-hidden transition-all ${recommended ? 'transform-scale-105 z-1 border-primary border-2' : ''} ${isCurrent ? (planStatus === 'active' ? 'border-success border-2 shadow-success-subtle' : 'border-danger border-2 shadow-danger-subtle') : ''}`}>
    {recommended && (
      <div className="bg-primary text-white text-center py-1 small fw-bold">MOST POPULAR</div>
    )}
    {isCurrent && (
      <div className={`bg-${planStatus === 'active' ? 'success' : 'danger'} text-white text-center py-1 small fw-bold`}>
        {planStatus === 'active' ? 'YOUR ACTIVE PLAN' : 'PLAN ' + planStatus.toUpperCase()}
      </div>
    )}
    <div className="card-body p-5 d-flex flex-column">
      <div className={`rounded-circle p-3 bg-light-${color} text-${color} d-inline-block mb-4`}>
        <Icon size={32} />
      </div>
      <h3 className="fw-bold mb-1">{title}</h3>
      <div className="d-flex align-items-baseline mb-4">
        <span className="fs-1 fw-bold">₹{price}</span>
        <span className="text-muted ms-2">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
      </div>

      {isCurrent && limit !== 'Unlimited' && (
        <div className="mb-4">
            <div className="d-flex justify-content-between small mb-1">
                <span className="text-muted">Usage</span>
                <span className="fw-bold">{usage} / {limit} Projects</span>
            </div>
            <div className="progress" style={{ height: '6px' }}>
                <div 
                    className={`progress-bar bg-${(usage/limit) > 0.8 ? 'danger' : 'success'}`} 
                    role="progressbar" 
                    style={{ width: `${Math.min((usage/limit)*100, 100)}%` }}
                ></div>
            </div>
        </div>
      )}

      <ul className="list-unstyled mb-5 flex-grow-1">
        {features.map((f: string, i: number) => (
          <li key={i} className="mb-3 d-flex align-items-center gap-2">
            <Check size={18} className="text-success" />
            <span className="text-muted small">{f}</span>
          </li>
        ))}
      </ul>

      <button 
        disabled={isCurrent && planStatus === 'active'}
        onClick={onUpgrade}
        className={`btn btn-${isCurrent ? (planStatus === 'active' ? 'success' : 'danger') : (color === 'primary' ? 'primary' : 'outline-' + color)} w-100 py-3 fw-bold mt-auto`}
      >
        {isCurrent ? (planStatus === 'active' ? 'Active Plan' : 'Renew Now') : (price === '0' ? 'Get Started' : 'Upgrade Now')}
      </button>
    </div>
  </div>
);

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/profile`, authHeader);
      setUserProfile(res.data);
    } catch (err) {
      console.error('Failed to fetch profile', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const plans = {
    starter: {
      id: 'starter',
      title: 'Starter',
      price: '0',
      limit: 1,
      features: ["1 WhatsApp Project", "100 Messages / mo", "Basic API", "Community Support"]
    },
    professional: {
      id: 'professional',
      title: 'Professional',
      price: billingCycle === 'monthly' ? '4,900' : '44,100',
      limit: 12,
      features: ["Up to 12 Projects", "Unlimited Messages", "Advanced Webhooks", "Priority Support", "Custom App IDs"]
    },
    enterprise: {
      id: 'enterprise',
      title: 'Enterprise',
      price: billingCycle === 'monthly' ? '19,900' : '179,100',
      limit: 'Unlimited',
      features: ["Unlimited Projects", "Dedicated Server", "White-label Dashboard", "24/7 Phone Support", "SLA Guarantee"]
    }
  };

  const handleUpgradeClick = (plan: any) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn">
      {/* Subscription Modal */}
      <SubscriptionModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSuccess={fetchProfile}
        plan={selectedPlan} 
        billingCycle={billingCycle} 
      />

      {/* Active Subscription Details Header */}
      {userProfile && (
        <div className="row mb-5">
            <div className="col-12">
                <div className={`card border-0 shadow-sm p-4 rounded-4 ${userProfile.planStatus === 'active' ? 'bg-success-subtle border-start border-success border-4' : 'bg-danger-subtle border-start border-danger border-4'}`}>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className={`p-3 rounded-circle bg-white shadow-sm text-${userProfile.planStatus === 'active' ? 'success' : 'danger'}`}>
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">Subscription Details</h5>
                                <div className="d-flex flex-wrap gap-3 small text-muted">
                                    <span className="d-flex align-items-center gap-1">
                                        <Zap size={14} className="text-primary"/> Plan: <strong className="text-dark">{userProfile.plan?.toUpperCase()}</strong>
                                    </span>
                                    <span className="d-flex align-items-center gap-1">
                                        <Clock size={14} className="text-primary"/> Status: <span className={`badge ${userProfile.planStatus === 'active' ? 'bg-success' : 'bg-danger'}`}>{userProfile.planStatus?.toUpperCase()}</span>
                                    </span>
                                    <span className="d-flex align-items-center gap-1">
                                        <Calendar size={14} className="text-primary"/> Expires: <strong className="text-dark">{userProfile.planExpiresAt ? new Date(userProfile.planExpiresAt).toLocaleDateString() : 'Never'}</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {userProfile.planStatus !== 'active' && (
                            <button onClick={() => handleUpgradeClick(plans[userProfile.plan as keyof typeof plans])} className="btn btn-danger px-4 py-2 fw-bold rounded-3">Renew Plan</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="text-center mb-8 py-5">
        <h1 className="fw-bold display-5 mb-3">Simple, Transparent Pricing</h1>
        <p className="text-muted fs-5 mb-5">Choose the plan that's right for your business growth.</p>

        {/* Toggle Switch */}
        <div className="d-flex align-items-center justify-content-center gap-3 mb-5">
          <span className={`small fw-bold ${billingCycle === 'monthly' ? 'text-dark' : 'text-muted'}`}>Monthly</span>
          <div className="form-check form-switch p-0" style={{ minHeight: 'auto' }}>
            <input
              className="form-check-input ms-0 shadow-none"
              type="checkbox"
              style={{ width: '3.5rem', height: '1.75rem', cursor: 'pointer' }}
              checked={billingCycle === 'yearly'}
              onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            />
          </div>
          <span className={`small fw-bold ${billingCycle === 'yearly' ? 'text-dark' : 'text-muted'}`}>
            Yearly <span className="badge bg-success-subtle text-success ms-1">Save 10%</span>
          </span>
        </div>
      </div>

      <div className="row g-4 justify-content-center px-lg-5 mb-6">
        <div className="col-md-6 col-lg-4">
          <PricingCard
            title="Starter"
            price={plans.starter.price}
            icon={Zap}
            color="secondary"
            billingCycle={billingCycle}
            features={plans.starter.features}
            isCurrent={userProfile?.plan === 'starter'}
            usage={userProfile?.projectCount || 0}
            limit={plans.starter.limit}
            planStatus={userProfile?.planStatus}
            onUpgrade={() => handleUpgradeClick(plans.starter)}
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <PricingCard
            title="Professional"
            price={plans.professional.price}
            icon={Rocket}
            color="primary"
            recommended={true}
            billingCycle={billingCycle}
            features={plans.professional.features}
            isCurrent={userProfile?.plan === 'professional'}
            usage={userProfile?.projectCount || 0}
            limit={plans.professional.limit}
            planStatus={userProfile?.planStatus}
            onUpgrade={() => handleUpgradeClick(plans.professional)}
          />
        </div>

        <div className="col-md-6 col-lg-4">
          <PricingCard
            title="Enterprise"
            price={plans.enterprise.price}
            icon={Crown}
            color="dark"
            billingCycle={billingCycle}
            features={plans.enterprise.features}
            isCurrent={userProfile?.plan === 'enterprise'}
            usage={userProfile?.projectCount || 0}
            limit={plans.enterprise.limit}
            planStatus={userProfile?.planStatus}
            onUpgrade={() => handleUpgradeClick(plans.enterprise)}
          />
        </div>
      </div>

      {/* Usage Warning */}
      {userProfile?.projectCount >= (plans[userProfile?.plan as keyof typeof plans]?.limit as number) && (
        <div className="alert alert-warning border-0 shadow-sm mt-5 mx-lg-5 rounded-4 d-flex align-items-center gap-3">
          <AlertCircle className="text-warning" />
          <div>
            <h6 className="fw-bold mb-0">Project Limit Reached</h6>
            <p className="mb-0 small">You've reached the maximum number of projects for your current plan. Upgrade to create more.</p>
          </div>
        </div>
      )}

      <div className="row mt-5 py-5 bg-white rounded-4 shadow-sm border mx-0 mb-5">
        <div className="col-lg-6 p-5">
          <h4 className="fw-bold mb-3">Need something custom?</h4>
          <p className="text-muted mb-0">We offer specialized plans for high-volume agencies and government organizations. Contact our sales team for a custom quote.</p>
        </div>
        <div className="col-lg-6 p-5 d-flex align-items-center justify-content-lg-end">
          <button className="btn btn-dark px-5 py-3 fw-bold rounded-3">Contact Sales</button>
        </div>
      </div>

      {/* Terms and Conditions Section */}
      <div className="bg-light p-5 rounded-4 border mb-5">
        <h5 className="fw-bold mb-4">Payment Terms & Conditions</h5>
        <div className="row g-4">
          <div className="col-md-4">
            <h6 className="fw-bold small text-uppercase text-muted mb-2">Billing Cycle</h6>
            <p className="small text-muted mb-0">Monthly plans are billed every 30 days. Yearly plans are billed upfront for 12 months with a 10% discount included.</p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold small text-uppercase text-muted mb-2">Refund Policy</h6>
            <p className="small text-muted mb-0">We offer a 7-day money-back guarantee for all new subscriptions. Refunds are processed within 5-10 business days.</p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold small text-uppercase text-muted mb-2">Auto-Renewal</h6>
            <p className="small text-muted mb-0">Subscriptions auto-renew unless cancelled at least 24 hours before the current period ends.</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-top">
          <p className="smaller text-muted mb-0">* All prices are inclusive of applicable taxes. By subscribing, you agree to our full <a href="#" className="text-primary text-decoration-none fw-bold">User Agreement</a> and <a href="#" className="text-primary text-decoration-none fw-bold">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Plans;
