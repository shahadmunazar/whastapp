
import { BookOpen, QrCode, Play, Code, MessageCircle, Webhook, Shield } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Header */}
      <section className="bg-dark text-white py-5 text-center">
        <div className="container py-4">
          <BookOpen size={48} className="text-success mb-3" />
          <h1 className="fw-bolder display-5 mb-3">WAMark Documentation</h1>
          <p className="text-white-50 mx-auto lead" style={{ maxWidth: '600px' }}>
            Comprehensive guides on how to connect your device, send bulk campaigns, and integrate the Developer API.
          </p>
        </div>
      </section>

      {/* Docs Content */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">
            
            {/* Sidebar Navigation (Visual Only) */}
            <div className="col-lg-3 d-none d-lg-block">
              <div className="sticky-top bg-white rounded-4 shadow-sm p-4" style={{ top: '100px' }}>
                <h6 className="fw-bold mb-3 text-uppercase tracking-wider small text-muted">Quick Links</h6>
                <div className="d-flex flex-column gap-2">
                  <a href="#connecting" className="text-decoration-none text-dark fw-medium small hover-primary py-1">1. Connecting WhatsApp</a>
                  <a href="#campaigns" className="text-decoration-none text-dark fw-medium small hover-primary py-1">2. Sending Campaigns</a>
                  <a href="#api" className="text-decoration-none text-dark fw-medium small hover-primary py-1">3. Developer API</a>
                  <a href="#inbox" className="text-decoration-none text-dark fw-medium small hover-primary py-1">4. Live Message Inbox</a>
                  <a href="#webhooks" className="text-decoration-none text-dark fw-medium small hover-primary py-1">5. Webhooks & Automations</a>
                  <a href="#admin" className="text-decoration-none text-dark fw-medium small hover-primary py-1">6. Superadmin Dashboard</a>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-lg-9">
              
              {/* Section 1: Connecting */}
              <div id="connecting" className="card border-0 shadow-sm rounded-4 mb-5 p-4 p-md-5 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
                  <div className="bg-success text-white p-3 rounded-circle">
                    <QrCode size={24} />
                  </div>
                  <h2 className="fw-bold mb-0">1. Connecting WhatsApp</h2>
                </div>
                
                <p className="text-muted">
                  Before you can send any campaigns, you must link your WhatsApp Business (or personal) account to the WAMark platform. We use the official Multi-Device protocol, meaning your phone doesn't need to stay online after pairing.
                </p>

                <h5 className="fw-bold mt-4 mb-3">Step-by-step Guide:</h5>
                <ol className="text-muted" style={{ lineHeight: '1.8' }}>
                  <li>Log in to your dashboard and navigate to <strong>WhatsApp Connect</strong> on the sidebar.</li>
                  <li>Click the <strong>Add New</strong> button.</li>
                  <li>Enter a friendly name for this connection (e.g., "Main Sales Line") and input the phone number.</li>
                  <li>Click <strong>Generate QR Code</strong>. A QR code will appear on your screen.</li>
                  <li>Open WhatsApp on your phone, go to <em>Settings -&#62; Linked Devices -&#62; Link a Device</em>.</li>
                  <li>Scan the QR code on your computer screen. Once successful, the status will change to <span className="badge bg-success-subtle text-success">Connected</span>.</li>
                </ol>
                
                <div className="alert alert-warning border-warning-subtle mt-4">
                  <strong>Note:</strong> You can disconnect your device at any time by clicking the "Disconnect" button in the dashboard, or by logging out from the Linked Devices section on your phone.
                </div>
              </div>

              {/* Section 2: Campaigns */}
              <div id="campaigns" className="card border-0 shadow-sm rounded-4 mb-5 p-4 p-md-5 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
                  <div className="bg-primary text-white p-3 rounded-circle">
                    <Play size={24} />
                  </div>
                  <h2 className="fw-bold mb-0">2. Sending Campaigns</h2>
                </div>
                
                <p className="text-muted">
                  The Bulk Campaign engine allows you to send thousands of messages using a CSV list. We have implemented batching algorithms to prevent your number from being banned for spam.
                </p>

                <h5 className="fw-bold mt-4 mb-3">Phase 1: Creating & Importing</h5>
                <ol className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                  <li>Go to the <strong>Campaigns</strong> tab and click <strong>Create Campaign</strong>.</li>
                  <li>Select which connected WhatsApp project you want to send from, and write your message.</li>
                  <li>Once created, the campaign will be in a <em>Draft</em> state. Click <strong>Import</strong>.</li>
                  <li>Upload a <code>.csv</code> file containing your leads.</li>
                  <li><strong>Map your columns!</strong> The system will ask you which column represents the Phone Number, and optionally, which represents the Name and Custom Message.</li>
                  <li>Save the leads.</li>
                </ol>

                <h5 className="fw-bold mt-4 mb-3">Phase 2: Sending & Delays</h5>
                <ol className="text-muted" style={{ lineHeight: '1.8' }}>
                  <li>Click <strong>Start</strong> on your campaign.</li>
                  <li>A configuration modal will appear. This is critical for anti-ban protection:</li>
                  <ul className="mb-2">
                    <li><strong>Batch Size:</strong> How many messages to send before taking a long pause (e.g., 50).</li>
                    <li><strong>Delay Between Messages:</strong> Seconds to wait between each individual message (e.g., 5 seconds).</li>
                    <li><strong>Delay Between Batches:</strong> Seconds to wait after a batch completes (e.g., 60 seconds).</li>
                  </ul>
                  <li>Click <strong>Confirm & Start</strong>. The engine will run in the background. You can navigate away from the page.</li>
                </ol>
              </div>

              {/* Section 3: API */}
              <div id="api" className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
                  <div className="bg-dark text-white p-3 rounded-circle">
                    <Code size={24} />
                  </div>
                  <h2 className="fw-bold mb-0">3. Developer API</h2>
                </div>
                
                <p className="text-muted">
                  Integrate WhatsApp sending directly into your own applications using our REST API.
                </p>

                <h5 className="fw-bold mt-4 mb-3">Authentication</h5>
                <p className="text-muted">
                  Go to <strong>Integrations -&#62; Developer API</strong> to generate a Bearer Token. Include this token in the header of your requests.
                </p>
                <div className="bg-light p-3 rounded-3 mb-4 font-monospace small">
                  Authorization: Bearer YOUR_API_TOKEN_HERE
                </div>

                <h5 className="fw-bold mt-4 mb-3">Sending a Message</h5>
                <p className="text-muted">Make a POST request to dispatch a message immediately.</p>
                
                <div className="bg-dark text-white-50 p-4 rounded-3 mb-4 overflow-hidden">
                  <pre className="mb-0 font-monospace small" style={{ color: '#a8c7fa' }}>
{`POST http://16.192.149.143:3000/api/projects/:projectId/send

{
  "phoneNumber": "919876543210",
  "message": "Hello from the API!"
}`}
                  </pre>
                </div>

                <h5 className="fw-bold mt-4 mb-3">API Use Cases</h5>
                <ul className="text-muted small">
                  <li><strong>WhatsApp OTPs:</strong> Send random 6-digit OTP codes for user authentication and password resets.</li>
                  <li><strong>Automated Reminders:</strong> Connect with Zapier or your internal CRM to send appointment or billing reminders.</li>
                </ul>

                <p className="text-muted small mt-4">
                  You can monitor all API hits and troubleshoot errors in the <strong>API Logs</strong> dashboard page.
                </p>
              </div>

              {/* Section 4: Inbox */}
              <div id="inbox" className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
                  <div className="bg-info text-white p-3 rounded-circle">
                    <MessageCircle size={24} />
                  </div>
                  <h2 className="fw-bold mb-0">4. Live Message Inbox</h2>
                </div>
                <p className="text-muted">
                  The dashboard provides a real-time conversational interface where you can monitor both outbound campaign messages and inbound customer replies.
                </p>
                <ol className="text-muted" style={{ lineHeight: '1.8' }}>
                  <li>Navigate to the <strong>Messages</strong> tab in the sidebar.</li>
                  <li>Select the WhatsApp Project (Device) you want to monitor.</li>
                  <li>All conversations will load on the left pane. Clicking a conversation opens the chat history.</li>
                  <li>The interface updates automatically via websockets when new messages arrive.</li>
                </ol>
              </div>

              {/* Section 5: Webhooks */}
              <div id="webhooks" className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
                  <div className="bg-warning text-white p-3 rounded-circle">
                    <Webhook size={24} />
                  </div>
                  <h2 className="fw-bold mb-0">5. Webhooks & Automations</h2>
                </div>
                <p className="text-muted">
                  If you want to receive incoming WhatsApp messages on your own server (e.g., to build a custom Chatbot or log messages into your CRM), you can configure Webhooks.
                </p>
                <ol className="text-muted" style={{ lineHeight: '1.8' }}>
                  <li>Go to <strong>Settings -&#62; Webhooks</strong>.</li>
                  <li>Add your server's public POST endpoint URL.</li>
                  <li>Whenever a message is received by your connected device, WAMark will immediately forward the JSON payload to your server.</li>
                </ol>
              </div>

              {/* Section 6: Admin */}
              <div id="admin" className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
                  <div className="bg-danger text-white p-3 rounded-circle">
                    <Shield size={24} />
                  </div>
                  <h2 className="fw-bold mb-0">6. Superadmin Dashboard</h2>
                </div>
                <p className="text-muted">
                  If your account has Superadmin privileges, you have access to a distinct administrative layer to manage the entire SaaS platform.
                </p>
                <ul className="text-muted mb-0" style={{ lineHeight: '1.8' }}>
                  <li><strong>User Management:</strong> View all registered accounts, block users, or reset passwords.</li>
                  <li><strong>Billing & Plans:</strong> Create and modify subscription tiers via the Admin Billing page.</li>
                  <li><strong>Global Stats:</strong> Monitor the total number of connected devices, campaigns processed, and API requests across the entire system.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
