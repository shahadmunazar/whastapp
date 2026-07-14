import { Bell, Globe, Lock } from 'lucide-react';

const Settings = () => {
  return (
    <div className="container-fluid p-0">
        <div className="row mb-4">
            <div className="col-12">
                <h2 className="fw-bold">General Settings</h2>
                <p className="text-muted">Configure platform-wide preferences</p>
            </div>
        </div>

        <div className="card border-0 shadow-sm p-0 overflow-hidden">
            <div className="list-group list-group-flush">
                <div className="list-group-item p-4 border-0 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                            <div className="p-2 bg-light rounded"><Bell size={20} className="text-primary"/></div>
                            <div>
                                <h6 className="mb-0 fw-bold">Email Notifications</h6>
                                <p className="text-muted small mb-0">Receive alerts about your project connections.</p>
                            </div>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                        </div>
                    </div>
                </div>

                <div className="list-group-item p-4 border-0 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                            <div className="p-2 bg-light rounded"><Globe size={20} className="text-success"/></div>
                            <div>
                                <h6 className="mb-0 fw-bold">API Region</h6>
                                <p className="text-muted small mb-0">Global (US East) - Recommended for best performance.</p>
                            </div>
                        </div>
                        <span className="badge bg-light text-dark border">Change</span>
                    </div>
                </div>

                <div className="list-group-item p-4 border-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                            <div className="p-2 bg-light rounded"><Lock size={20} className="text-danger"/></div>
                            <div>
                                <h6 className="mb-0 fw-bold">Two-Factor Authentication</h6>
                                <p className="text-muted small mb-0">Add an extra layer of security to your account.</p>
                            </div>
                        </div>
                        <button className="btn btn-sm btn-outline-danger">Enable</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Settings;
