const TermsOfService = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      <section className="py-5 bg-light border-bottom border-light">
        <div className="container py-5 text-center">
          <h1 className="display-5 fw-bolder mb-3">Terms of Service</h1>
          <p className="text-muted mb-0">Last updated: October 2023</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-muted" style={{ lineHeight: '1.8' }}>
            <h4 className="fw-bold text-dark mb-3 mt-4">1. Agreement to Terms</h4>
            <p>
              By accessing our website and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h4 className="fw-bold text-dark mb-3 mt-5">2. Use License</h4>
            <p>
              Permission is granted to temporarily use the WAMark platform for personal or commercial use, subject to the following restrictions:
            </p>
            <ul>
              <li>You may not use the platform for sending unsolicited spam or illegal content.</li>
              <li>You may not attempt to decompile or reverse engineer any software contained on the platform.</li>
              <li>You may not transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h4 className="fw-bold text-dark mb-3 mt-5">3. Disclaimer</h4>
            <p>
              The materials on WAMark's website are provided on an 'as is' basis. WAMark makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              WAMark is not affiliated with WhatsApp Inc. or Meta Platforms, Inc. Use of this platform is at your own risk regarding WhatsApp's terms of service.
            </p>

            <h4 className="fw-bold text-dark mb-3 mt-5">4. Limitations</h4>
            <p>
              In no event shall WAMark or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption, or WhatsApp account bans) arising out of the use or inability to use the materials on WAMark's website.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
