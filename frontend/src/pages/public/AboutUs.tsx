import { Users, Target, Shield, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      {/* Hero */}
      <section className="py-5 bg-light text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bolder mb-3">About WAMark</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            We're on a mission to democratize WhatsApp marketing, making it accessible, affordable, and safe for businesses of all sizes.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bolder mb-4">Our Story</h2>
              <p className="text-muted" style={{ lineHeight: '1.8' }}>
                WAMark was founded out of frustration. Traditional WhatsApp APIs were too expensive and complex for small businesses, while unofficial tools were unreliable and led to constant bans.
              </p>
              <p className="text-muted" style={{ lineHeight: '1.8' }}>
                We built a platform that combines the official Multi-Device protocol with intelligent rate-limiting algorithms. Today, thousands of businesses use WAMark to connect with their customers safely and at scale.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="bg-light rounded-4 h-100 min-vh-25 d-flex align-items-center justify-content-center p-5">
                 <div className="display-1 text-success fw-bolder opacity-25">"</div>
                 <h4 className="fw-bold text-center mx-4">Connecting businesses to the world's most popular messaging app.</h4>
                 <div className="display-1 text-success fw-bolder opacity-25">"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-4">
              <h2 className="display-4 fw-bolder text-success">50M+</h2>
              <p className="text-white-50">Messages Delivered</p>
            </div>
            <div className="col-md-4">
              <h2 className="display-4 fw-bolder text-success">10k+</h2>
              <p className="text-white-50">Active Businesses</p>
            </div>
            <div className="col-md-4">
              <h2 className="display-4 fw-bolder text-success">99.9%</h2>
              <p className="text-white-50">Uptime Reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 pb-3">
            <h2 className="fw-bolder mb-3">Meet the Leadership</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              A diverse team of engineers, marketers, and product builders dedicated to your success.
            </p>
          </div>
          <div className="row g-5 justify-content-center text-center">
            {[
              { name: "Sarah Jenkins", role: "CEO & Co-founder", initials: "SJ", color: "bg-primary" },
              { name: "David Chen", role: "CTO & Co-founder", initials: "DC", color: "bg-success" },
              { name: "Maria Gonzalez", role: "Head of Product", initials: "MG", color: "bg-warning" },
              { name: "James Wilson", role: "Head of Engineering", initials: "JW", color: "bg-danger" }
            ].map((member, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className={`${member.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm mb-3`} style={{ width: '100px', height: '100px', fontSize: '2rem' }}>
                  <span className="fw-bold">{member.initials}</span>
                </div>
                <h5 className="fw-bold mb-1">{member.name}</h5>
                <p className="text-muted small">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bolder mb-3">Our Core Values</h2>
          </div>
          <div className="row g-4">
            {[
              { icon: <Target size={32} />, title: "Simplicity", desc: "Complex technology made accessible through intuitive design." },
              { icon: <Shield size={32} />, title: "Safety First", desc: "We prioritize account safety above all with our anti-ban algorithms." },
              { icon: <Heart size={32} />, title: "Customer Success", desc: "When you grow, we grow. Our support is available 24/7." },
              { icon: <Users size={32} />, title: "Community", desc: "Built by developers, for businesses. We listen to our users." },
            ].map((v, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="bg-white p-4 rounded-4 shadow-sm text-center h-100">
                  <div className="bg-success-subtle text-success d-inline-flex p-3 rounded-circle mb-3">{v.icon}</div>
                  <h5 className="fw-bold">{v.title}</h5>
                  <p className="text-muted small mb-0">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
