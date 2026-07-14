

const Privacy = () => {
  return (
    <div className="container py-5">
      <div className="bg-white p-5 rounded-4 shadow-sm border border-light mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="fw-bolder mb-4">Privacy Policy</h1>
        <p className="text-muted mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="text-muted d-flex flex-column gap-3">
          <p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website and software.</p>
          
          <h4 className="text-dark fw-bold mt-4">1. Information We Collect</h4>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
          
          <h4 className="text-dark fw-bold mt-4">2. Data Storage</h4>
          <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft.</p>
          
          <h4 className="text-dark fw-bold mt-4">3. Data Sharing</h4>
          <p>We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
