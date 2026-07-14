import { Code, Terminal, Server, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApiDocs = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="py-5 bg-dark text-white border-bottom border-light">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-white text-dark fw-bold mb-4" style={{ fontSize: '12px' }}>
                <Terminal size={14} /> Developer First
              </div>
              <h1 className="display-4 fw-bolder mb-4" style={{ letterSpacing: '-1px' }}>
                Build conversational apps with the <span className="text-success">REST API</span>.
              </h1>
              <p className="lead text-white-50 mb-5">
                Integrate WhatsApp messaging into your own software stack in minutes. Simple endpoints, secure Bearer token authentication, and real-time webhooks.
              </p>
              <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-success btn-lg fw-bold rounded-1 px-5">
                  Get API Key
                </Link>
                <Link to="/docs" className="btn btn-outline-light btn-lg fw-bold rounded-1 px-4 d-flex align-items-center gap-2">
                  Read Documentation <ChevronRight size={18} />
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="bg-black p-4 rounded-4 shadow-lg border border-secondary overflow-hidden">
                <div className="d-flex gap-2 mb-3">
                  <div className="bg-danger rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                  <div className="bg-warning rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                  <div className="bg-success rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                </div>
                <pre className="mb-0 font-monospace small" style={{ color: '#a8c7fa', lineHeight: '1.6' }}>
{`// Send a WhatsApp Message
const response = await fetch('https://api.wamark.com/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: "919876543210",
    message: "Your OTP is 492013"
  })
});

const data = await response.json();
console.log(data.status); // "queued"`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-5 my-lg-5">
        <div className="container py-4">
          <div className="row g-5">
            {[
              { icon: <Code size={32} />, title: "Simple Endpoints", desc: "Our REST API is designed for developer happiness. Send messages, check delivery status, and manage connections via straightforward JSON payloads." },
              { icon: <Server size={32} />, title: "Real-time Webhooks", desc: "Receive incoming WhatsApp messages directly to your server via HTTP POST webhooks. Perfect for building custom Chatbots." },
              { icon: <ShieldCheck size={32} />, title: "Secure & Monitored", desc: "Authenticate securely using Bearer Tokens. Monitor every single API request, response, and IP address in the dashboard API Logs." }
            ].map((feature, i) => (
              <div key={i} className="col-lg-4 text-center">
                <div className="bg-light d-inline-flex p-4 rounded-circle text-dark mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h4 className="fw-bold mb-3">{feature.title}</h4>
                <p className="text-muted px-3" style={{ lineHeight: '1.8' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiDocs;
