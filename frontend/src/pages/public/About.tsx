

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="fw-bolder mb-4">About Us</h1>
          <p className="lead text-muted mb-5">
            We are on a mission to democratize WhatsApp automation and make it accessible for businesses of all sizes.
          </p>
          <div className="text-start bg-white p-5 rounded-4 shadow-sm border border-light">
            <h3 className="fw-bold mb-3">Our Story</h3>
            <p className="text-muted">
              Founded in 2024, Dasher CRM was built out of the frustration of dealing with complex, expensive WhatsApp Business APIs. We wanted a simple, scalable, and developer-friendly way to manage multiple devices and automate messaging.
            </p>
            <h3 className="fw-bold mb-3 mt-4">Our Vision</h3>
            <p className="text-muted">
              We believe that customer communication should be seamless. Our platform bridges the gap between your CRM software and the world's most popular messaging app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
