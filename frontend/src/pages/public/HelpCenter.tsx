import { Search, LifeBuoy, PlayCircle, Book, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Hero */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bolder mb-4">How can we help you?</h1>
          <div className="position-relative mx-auto" style={{ maxWidth: '600px' }}>
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
              <Search className="text-muted" size={20} />
            </div>
            <input 
              type="text" 
              className="form-control form-control-lg py-3 ps-5 rounded-pill border-0 shadow" 
              placeholder="Search for articles, guides, or troubleshooting..." 
            />
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          {/* Quick Links */}
          <div className="row g-4 mb-5 pb-5 border-bottom border-light">
            {[
              { icon: <PlayCircle size={32} className="text-primary" />, title: "Getting Started", desc: "Learn the basics of connecting your first device." },
              { icon: <Book size={32} className="text-warning" />, title: "Campaign Guides", desc: "Best practices for CSV importing and batch sizes." },
              { icon: <MessageSquare size={32} className="text-success" />, title: "Inbox & Chats", desc: "How to manage real-time conversations." },
              { icon: <LifeBuoy size={32} className="text-danger" />, title: "Troubleshooting", desc: "Fix connection drops and ban issues." }
            ].map((cat, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="bg-white p-4 rounded-4 shadow-sm text-center h-100 hover-shadow transition-all cursor-pointer">
                  <div className="bg-light d-inline-flex p-3 rounded-circle mb-3">{cat.icon}</div>
                  <h5 className="fw-bold">{cat.title}</h5>
                  <p className="text-muted small mb-0">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="fw-bolder mb-4 text-center">Frequently Asked Questions</h3>
              
              <div className="accordion accordion-flush bg-white rounded-4 shadow-sm overflow-hidden" id="faqAccordion">
                {[
                  { q: "Do I need my phone to be online all the time?", a: "No. WAMark uses the official Multi-Device protocol. Once you scan the QR code to connect your account, your phone does not need to remain connected to the internet." },
                  { q: "How many messages can I send per day?", a: "The limit depends on your WhatsApp account's trust score and age. For new accounts, we recommend starting with 50-100 messages per day and gradually scaling up to avoid bans." },
                  { q: "What happens if my number gets banned?", a: "While our anti-ban algorithms significantly reduce the risk, bans can still happen if you send highly reported spam. You will need to appeal the ban directly through the WhatsApp Business app." },
                  { q: "Can I use multiple numbers?", a: "Yes, you can create multiple 'Projects' in your dashboard and connect a different WhatsApp number to each project." }
                ].map((faq, i) => (
                  <div className="accordion-item border-0 border-bottom" key={i}>
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed fw-bold py-4 bg-white" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${i}`}>
                        {faq.q}
                      </button>
                    </h2>
                    <div id={`faq${i}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body text-muted pb-4 pt-0">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-5 pt-5 text-center">
            <p className="text-muted mb-2">Still can't find what you're looking for?</p>
            <Link to="/contact" className="btn btn-dark px-4 py-2 fw-bold rounded-pill">Contact Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
