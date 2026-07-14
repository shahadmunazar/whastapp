import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      <section className="py-5 bg-light border-bottom border-light">
        <div className="container py-5 text-center">
          <h1 className="display-5 fw-bolder mb-3">Privacy Policy</h1>
          <p className="text-muted mb-0">Last updated: October 2023</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-muted" style={{ lineHeight: '1.8' }}>
            <h4 className="fw-bold text-dark mb-3 mt-4">1. Introduction</h4>
            <p>
              Welcome to WAMark ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please <Link to="/contact">contact us</Link>.
            </p>

            <h4 className="fw-bold text-dark mb-3 mt-5">2. Information We Collect</h4>
            <p>
              We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, or otherwise when you contact us.
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Names, phone numbers, email addresses, billing addresses.</li>
              <li><strong>WhatsApp Data:</strong> We access WhatsApp connections via the Multi-Device protocol to send messages on your behalf. We do not permanently store your message history unless explicitly required for the Inbox feature.</li>
            </ul>

            <h4 className="fw-bold text-dark mb-3 mt-5">3. How We Use Your Information</h4>
            <p>
              We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>

            <h4 className="fw-bold text-dark mb-3 mt-5">4. Data Security</h4>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
