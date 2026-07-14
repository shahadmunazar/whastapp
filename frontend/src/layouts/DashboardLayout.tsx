import { LayoutDashboard, MessageSquare, Settings, LogOut, Search, Bell, Menu, User, CreditCard, ShieldCheck, Megaphone, Activity, Blocks } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="bg-white border-end vh-100 position-sticky top-0 d-none d-lg-block" style={{ width: '250px' }}>
      <div className="p-4 border-bottom d-flex align-items-center gap-2">
        <Link to="/dashboard" className="text-decoration-none d-flex align-items-center gap-2">
          <div className="bg-primary rounded p-1">
            <LayoutDashboard className="text-white" size={24} />
          </div>
          <span className="fw-bold fs-4 text-dark">Dasher CRM</span>
        </Link>
      </div>
      <div className="p-3">
        <ul className="nav nav-pills flex-column gap-1">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-dark d-flex align-items-center gap-3">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
          </li>
          {user.role === 'superadmin' && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link text-dark d-flex align-items-center gap-3">
                <ShieldCheck size={20} className="text-primary" /> Admin Panel
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/integrations" className="nav-link text-dark d-flex align-items-center gap-3">
              <Blocks size={20} /> Integrations
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/campaigns" className="nav-link text-dark d-flex align-items-center gap-3">
              <Megaphone size={20} /> Campaigns
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/messages" className="nav-link text-dark d-flex align-items-center gap-3">
              <MessageSquare size={20} /> All Messages
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/api-logs" className="nav-link text-dark d-flex align-items-center gap-3">
              <Activity size={20} /> API Logs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-dark d-flex align-items-center gap-3">
              <User size={20} /> Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/plans" className="nav-link text-dark d-flex align-items-center gap-3">
              <CreditCard size={20} /> Plans
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link text-dark d-flex align-items-center gap-3">
              <Settings size={20} /> Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto p-3 position-absolute bottom-0 w-100 border-top">
        <button onClick={handleLogout} className="btn nav-link text-danger d-flex align-items-center gap-3 border-0 bg-transparent w-100">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

const Topbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3 px-4 sticky-top">
      <div className="container-fluid p-0">
        <button className="btn btn-light d-lg-none me-3">
          <Menu size={20} />
        </button>
        <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2" style={{ width: '300px' }}>
          <Search size={18} className="text-muted me-2" />
          <input type="text" className="form-control border-0 bg-transparent p-0 shadow-none" placeholder="Search..." />
        </div>
        <div className="ms-auto d-flex align-items-center gap-4">
          <button className="btn btn-link text-muted p-0 position-relative">
            <Bell size={22} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-1">
              <span className="visually-hidden">unread notifications</span>
            </span>
          </button>
          <div className="dropdown">
            <div className="d-flex align-items-center gap-2" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <div className="text-end d-none d-sm-block">
                <div className="fw-bold small">Shahad</div>
                <div className="text-muted smaller" style={{ fontSize: '11px' }}>Administrator</div>
              </div>
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                SH
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Sidebar, Topbar };
