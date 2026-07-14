import { Link } from 'react-router-dom';
import { QrCode, UploadCloud, Settings, Send } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      {/* Header */}
      <section className="py-5 bg-light border-bottom border-light text-center">
        <div className="container py-4">
          <h1 className="fw-bolder display-5 mb-3">How It Works</h1>
          <p className="text-muted mx-auto lead" style={{ maxWidth: '700px' }}>
            A transparent look at the exact workflow you'll use in the WAMark dashboard to send your first bulk campaign.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-5 my-lg-5">
        <div className="container py-4">
          <div className="row g-5 position-relative z-1 text-center justify-content-center">
            {/* Connecting lines for desktop */}
            <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle w-75" style={{ height: '3px', backgroundColor: '#f8f9fa', zIndex: -1 }}></div>

            {[
              { 
                icon: <QrCode size={36} className="text-white" />, 
                color: 'bg-dark', 
                step: 1, 
                title: 'Scan QR Code', 
                desc: 'Navigate to "WhatsApp Connect" in the dashboard. Click "Add New", and scan the generated QR code with your phone to establish a live connection.' 
              },
              { 
                icon: <UploadCloud size={36} className="text-white" />, 
                color: 'bg-primary', 
                step: 2, 
                title: 'Upload CSV', 
                desc: 'Create a new Campaign and click "Import". Upload your .csv file and map the columns (e.g. telling the system which column holds the Phone Number).' 
              },
              { 
                icon: <Settings size={36} className="text-white" />, 
                color: 'bg-warning', 
                step: 3, 
                title: 'Configure Delays', 
                desc: 'When you click Start, you\'ll be prompted to set "Batch Sizes" and "Delays" (e.g. wait 5 seconds between messages) to avoid getting banned for spam.' 
              },
              { 
                icon: <Send size={36} className="text-white" />, 
                color: 'bg-success', 
                step: 4, 
                title: 'Dispatch Batch', 
                desc: 'Hit Confirm. The backend engine takes over, processing your leads in chunks and dispatching them through the connected socket.' 
              },
            ].map((step, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="d-flex flex-column align-items-center bg-white p-4 rounded-4 shadow-sm border border-light h-100 hover-shadow transition-all">
                  <div className={`rounded-circle ${step.color} d-flex align-items-center justify-content-center mb-4 shadow`} style={{ width: '80px', height: '80px' }}>
                    {step.icon}
                  </div>
                  <h6 className="fw-bold text-muted mb-2 text-uppercase tracking-wider small">Step {step.step}</h6>
                  <h5 className="fw-bold mb-3">{step.title}</h5>
                  <p className="text-muted small px-2 mb-0" style={{ lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 pt-5 text-center">
             <Link to="/docs" className="btn btn-outline-dark px-5 py-3 fw-bold fs-6 rounded-pill border-2">Read Detailed Documentation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
