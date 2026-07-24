import React, { useState } from 'react';
import axios from 'axios';
import { CreditCard, ShieldCheck, Zap, Rocket, Crown, Loader2 } from 'lucide-react';

const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api`;

interface SubscriptionModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plan: any;
  billingCycle: 'monthly' | 'yearly';
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ show, onClose, onSuccess, plan, billingCycle }) => {
  const [loading, setLoading] = useState(false);

  if (!show || !plan) return null;

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BACKEND_URL}/auth/subscribe`, {
        planType: plan.id,
        billingCycle,
        amount: parseFloat(plan.price.replace(/,/g, ''))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert(`Successfully upgraded to ${plan.title}! ✨`);
      onSuccess();
      onClose();
    } catch (err) {
      alert('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'starter': return <Zap size={40} className="text-secondary" />;
      case 'professional': return <Rocket size={40} className="text-primary" />;
      case 'enterprise': return <Crown size={40} className="text-dark" />;
      default: return <CreditCard size={40} className="text-primary" />;
    }
  };

  return (
    <div className="modal show d-block animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-bold">Upgrade Subscription</h5>
            <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="text-center mb-4">
                <div className="p-3 bg-light rounded-circle d-inline-block mb-3">
                    {getIcon(plan.title)}
                </div>
                <h4 className="fw-bold mb-1">{plan.title} Plan</h4>
                <p className="text-muted small">You are upgrading to the {plan.title} tier billed {billingCycle}.</p>
            </div>

            <div className="bg-light p-4 rounded-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-medium">Plan Price</span>
                    <span className="fw-bold fs-5">₹{plan.price}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-medium">Billing Cycle</span>
                    <span className="badge bg-primary-subtle text-primary">{billingCycle.toUpperCase()}</span>
                </div>
                <hr className="my-3 opacity-10" />
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Total Amount</span>
                    <span className="fw-bold fs-4 text-primary">₹{plan.price}</span>
                </div>
            </div>

            <div className="d-flex flex-column gap-3">
                <button 
                  onClick={handleSubscribe} 
                  disabled={loading}
                  className="btn btn-primary w-100 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <CreditCard size={18} />}
                    {loading ? 'Processing...' : 'Pay & Upgrade Now'}
                </button>
                <div className="d-flex align-items-center justify-content-center gap-2 text-muted smaller">
                    <ShieldCheck size={14} className="text-success" /> Secure SSL Encrypted Payment
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
