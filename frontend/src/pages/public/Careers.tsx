import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  return (
    <div className="bg-white min-vh-100 pb-5">
      <section className="py-5 bg-dark text-white text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bolder mb-3">Join Our Team</h1>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
            Help us build the future of WhatsApp marketing. We are a remote-first team looking for passionate individuals.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bolder mb-3">Open Positions</h2>
            <p className="text-muted">Don't see a perfect fit? Send your resume to careers@wamark.com</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-3">
                {[
                  { title: "Senior Frontend Engineer", dept: "Engineering", loc: "Remote", type: "Full-time" },
                  { title: "Node.js Backend Developer", dept: "Engineering", loc: "Remote", type: "Full-time" },
                  { title: "Product Marketing Manager", dept: "Marketing", loc: "London, UK / Remote", type: "Full-time" },
                  { title: "Customer Success Specialist", dept: "Support", loc: "Remote (Asia Timezone)", type: "Contract" },
                ].map((job, i) => (
                  <div key={i} className="card border border-light shadow-sm p-4 hover-shadow transition-all">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                      <div>
                        <h5 className="fw-bold mb-2">{job.title}</h5>
                        <div className="d-flex flex-wrap gap-3 text-muted small">
                          <span className="d-flex align-items-center gap-1"><Briefcase size={14} /> {job.dept}</span>
                          <span className="d-flex align-items-center gap-1"><MapPin size={14} /> {job.loc}</span>
                          <span className="d-flex align-items-center gap-1"><Clock size={14} /> {job.type}</span>
                        </div>
                      </div>
                      <Link to="/contact" className="btn btn-outline-dark fw-bold px-4">Apply Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
