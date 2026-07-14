

const Terms = () => {
  return (
    <div className="container py-5">
      <div className="bg-white p-5 rounded-4 shadow-sm border border-light mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="fw-bolder mb-4">Terms and Conditions</h1>
        <p className="text-muted mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="text-muted d-flex flex-column gap-3">
          <p>Please read these terms and conditions carefully before using our Service.</p>
          
          <h4 className="text-dark fw-bold mt-4">1. Acceptance of Terms</h4>
          <p>By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
          
          <h4 className="text-dark fw-bold mt-4">2. Use of Service</h4>
          <p>You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Service.</p>
          
          <h4 className="text-dark fw-bold mt-4">3. Prohibited Activities</h4>
          <p>You may not use the Service to send spam, bulk marketing messages without consent, or any content that violates WhatsApp's commerce and business policies.</p>
          
          <h4 className="text-dark fw-bold mt-4">4. Account Suspension</h4>
          <p>We reserve the right to suspend or terminate your account at any time if we suspect a violation of these terms or WhatsApp's official policies.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
