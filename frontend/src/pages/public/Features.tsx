import { Link } from 'react-router-dom';
import { QrCode, UploadCloud, MessageCircle, Code, ShieldCheck, Bell, Key } from 'lucide-react';

const Features = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      {/* Features Header */}
      <section className="py-5 bg-light border-bottom border-light text-center">
        <div className="container py-4">
          <h1 className="fw-bolder display-5 mb-3">Platform Capabilities</h1>
          <p className="text-muted mx-auto lead" style={{ maxWidth: '800px' }}>
            Discover the technical features powering WAMark. From multi-device syncing to batch campaign algorithms, explore what you can achieve.
          </p>
        </div>
      </section>

      {/* Actual Working Features List */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">
            
            {/* Feature 1 */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 hover-shadow transition-all bg-white">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-4 mb-md-0">
                    <div className="bg-success text-white p-4 rounded-circle d-inline-flex">
                      <QrCode size={48} />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <h3 className="fw-bold mb-3">Multi-Device QR Connection</h3>
                    <p className="text-muted mb-3">
                      Link your WhatsApp account directly to the WAMark platform without needing a permanent phone connection. 
                      Using the latest WhatsApp Multi-Device architecture (via Baileys/whatsapp-web.js), you simply scan a QR code from the dashboard to establish a persistent socket connection.
                    </p>
                    <ul className="text-muted small mb-0">
                      <li>Session persistence across logins.</li>
                      <li>Ability to connect multiple distinct phone numbers to different "Projects".</li>
                      <li>Live connection status indicators.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 hover-shadow transition-all bg-white">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-4 mb-md-0 order-md-2">
                    <div className="bg-primary text-white p-4 rounded-circle d-inline-flex">
                      <UploadCloud size={48} />
                    </div>
                  </div>
                  <div className="col-md-9 order-md-1">
                    <h3 className="fw-bold mb-3">Bulk Campaign Engine & CSV Import</h3>
                    <p className="text-muted mb-3">
                      Run massive outreach campaigns safely. Our custom campaign engine allows you to upload large <code>.csv</code> or <code>.txt</code> files and dynamically map data columns (like mapping the 'Name' column to personalize messages).
                    </p>
                    <ul className="text-muted small mb-0">
                      <li>Smart column mapping for Phone Numbers, Names, and Custom Messages.</li>
                      <li><strong className="text-dark">Anti-Ban Batch Sending:</strong> Configure exact batch sizes, delays between individual messages, and delays between batches to mimic human behavior and avoid WhatsApp spam detection.</li>
                      <li>Live progress tracking and pause/resume functionality.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Feature 2.5: Automated Reminders */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 hover-shadow transition-all bg-white">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-4 mb-md-0">
                    <div className="bg-warning text-white p-4 rounded-circle d-inline-flex">
                      <Bell size={48} />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <h3 className="fw-bold mb-3">Automated Reminders</h3>
                    <p className="text-muted mb-3">
                      Reduce no-shows and late payments by scheduling automated WhatsApp reminders. Connect your calendar or CRM to trigger perfectly timed messages to your clients.
                    </p>
                    <ul className="text-muted small mb-0">
                      <li>Appointment and booking reminders.</li>
                      <li>Payment and subscription renewal alerts.</li>
                      <li>Customizable templates with dynamic variables.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2.6: WhatsApp OTP & Auth */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 hover-shadow transition-all bg-white">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-4 mb-md-0 order-md-2">
                    <div className="bg-danger text-white p-4 rounded-circle d-inline-flex">
                      <Key size={48} />
                    </div>
                  </div>
                  <div className="col-md-9 order-md-1">
                    <h3 className="fw-bold mb-3">WhatsApp OTP Verification</h3>
                    <p className="text-muted mb-3">
                      Secure your platform by replacing expensive SMS verification with instantaneous WhatsApp OTPs. Significantly reduce authentication costs while boosting delivery rates.
                    </p>
                    <ul className="text-muted small mb-0">
                      <li>Near-instant delivery rates globally.</li>
                      <li>Cost-effective alternative to SMS OTP providers.</li>
                      <li>Simple API integration for your login flows.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 hover-shadow transition-all bg-white">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-4 mb-md-0">
                    <div className="bg-warning text-white p-4 rounded-circle d-inline-flex">
                      <MessageCircle size={48} />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <h3 className="fw-bold mb-3">Live Message Inbox Sync</h3>
                    <p className="text-muted mb-3">
                      A centralized inbox to monitor all inbound and outbound communications across your connected projects. The system fetches messages directly from the WhatsApp socket and displays them in a threaded UI.
                    </p>
                    <ul className="text-muted small mb-0">
                      <li>Read real-time incoming messages from your customers.</li>
                      <li>Verify outbound campaign message delivery statuses.</li>
                      <li>Filter conversations by specific connected Projects/Numbers.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 hover-shadow transition-all bg-white">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-4 mb-md-0 order-md-2">
                    <div className="bg-dark text-white p-4 rounded-circle d-inline-flex">
                      <Code size={48} />
                    </div>
                  </div>
                  <div className="col-md-9 order-md-1">
                    <h3 className="fw-bold mb-3">Developer APIs & Logging</h3>
                    <p className="text-muted mb-3">
                      Programmatically control your WhatsApp instances. Generate permanent API Bearer tokens from your dashboard and trigger REST API endpoints to send messages from external applications (like your own CRM, Zapier, or Node.js backends).
                    </p>
                    <ul className="text-muted small mb-0">
                      <li>Secure Bearer Token authentication.</li>
                      <li>Simple POST endpoints to dispatch text payloads to any number.</li>
                      <li>Dedicated <strong className="text-dark">API Logs</strong> dashboard to trace request payloads, IP addresses, and response codes.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 hover-shadow transition-all bg-white">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-4 mb-md-0">
                    <div className="bg-danger text-white p-4 rounded-circle d-inline-flex">
                      <ShieldCheck size={48} />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <h3 className="fw-bold mb-3">Superadmin Dashboard</h3>
                    <p className="text-muted mb-3">
                      A secluded administrative layer for platform owners. Superadmins can monitor global platform statistics, manage registered users, and oversee billing subscriptions across the entire SaaS environment.
                    </p>
                    <ul className="text-muted small mb-0">
                      <li>Role-based access control separating regular users from superadmins.</li>
                      <li>Global statistical overviews (total messages sent, active users).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-5 text-center bg-light p-5 rounded-4 border d-flex flex-column align-items-center justify-content-center mx-auto" style={{ maxWidth: '800px' }}>
             <h3 className="fw-bold text-dark mb-3">Ready to dive in?</h3>
             <p className="text-muted mb-4">Learn exactly how to use these features in our comprehensive documentation.</p>
             <Link to="/docs" className="btn btn-dark px-5 py-3 fw-bold fs-5 shadow-sm rounded-pill">Read the Docs</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
