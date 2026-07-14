

const ReturnPolicy = () => {
  return (
    <div className="container py-5">
      <div className="bg-white p-5 rounded-4 shadow-sm border border-light mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="fw-bolder mb-4">Return and Refund Policy</h1>
        <p className="text-muted mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="text-muted d-flex flex-column gap-3">
          <p>Thank you for subscribing to Dasher CRM. If you are not entirely satisfied with your purchase, we're here to help.</p>
          
          <h4 className="text-dark fw-bold mt-4">1. Refunds</h4>
          <p>We offer a 14-day money-back guarantee on all our subscription plans. If you are not satisfied with our service, you can request a full refund within 14 days of your initial purchase.</p>
          
          <h4 className="text-dark fw-bold mt-4">2. Cancellations</h4>
          <p>You can cancel your subscription at any time. Your service will remain active until the end of your current billing cycle.</p>
          
          <h4 className="text-dark fw-bold mt-4">3. Contact Us</h4>
          <p>If you have any questions about our Returns and Refunds Policy, please contact us at support@dashercrm.com.</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
