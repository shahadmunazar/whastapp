import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  ChevronRight,
  PieChart,
  CreditCard
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Admin Overview' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'User Management' },
    { path: '/admin/stats', icon: <PieChart size={20} />, label: 'Platform Stats' },
    { path: '/admin/billing', icon: <CreditCard size={20} />, label: 'Revenue & Subs' },
  ];

  return (
    <div className="d-flex bg-light min-vh-100">
      {/* Admin Sidebar */}
      <div className="bg-dark text-white vh-100 position-sticky top-0 d-none d-lg-block shadow-lg" style={{ width: '280px', zIndex: 1000 }}>
        <div className="p-4 border-bottom border-secondary d-flex align-items-center gap-3">
          <div className="bg-primary rounded p-2 shadow-sm">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <div>
            <span className="fw-bold fs-5 d-block">Admin Central</span>
            <span className="smaller text-secondary opacity-75">Control Panel v1.0</span>
          </div>
        </div>
        
        <div className="p-3">
          <div className="small text-uppercase text-secondary fw-bold mb-3 ms-2" style={{ fontSize: '10px', letterSpacing: '1px' }}>Main Navigation</div>
          <ul className="nav nav-pills flex-column gap-2">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link d-flex align-items-center justify-content-between gap-3 py-3 px-4 rounded-3 transition-all ${
                    location.pathname === item.path ? 'bg-primary text-white shadow-sm' : 'text-secondary hover-bg-dark-light'
                  }`}
                >
                  <div className="d-flex align-items-center gap-3">
                    {item.icon}
                    <span className="fw-medium">{item.label}</span>
                  </div>
                  {location.pathname === item.path && <ChevronRight size={14} />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 small text-uppercase text-secondary fw-bold mb-3 ms-2" style={{ fontSize: '10px', letterSpacing: '1px' }}>Account</div>
          <ul className="nav nav-pills flex-column gap-2">
            <li className="nav-item">
              <Link to="/settings" className="nav-link text-secondary d-flex align-items-center gap-3 py-3 px-4">
                <Settings size={20} /> Settings
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto p-4 position-absolute bottom-0 w-100 border-top border-secondary">
          <button onClick={handleLogout} className="btn nav-link text-danger d-flex align-items-center gap-3 border-0 bg-transparent w-100 py-2">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 overflow-hidden">
        {/* Admin Topbar */}
        <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3 px-4 sticky-top shadow-sm">
          <div className="container-fluid p-0">
            <div className="d-flex align-items-center gap-3">
              <h5 className="fw-bold mb-0 d-none d-md-block">Dashboard Overview</h5>
              <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fw-bold small">System Live</span>
            </div>
            
            <div className="ms-auto d-flex align-items-center gap-4">
              <div className="d-none d-lg-flex align-items-center bg-light rounded-pill px-3 py-2 border" style={{ width: '300px' }}>
                <Search size={18} className="text-muted me-2" />
                <input type="text" className="form-control border-0 bg-transparent p-0 shadow-none smaller" placeholder="Quick search users..." />
              </div>
              
              <button className="btn btn-link text-muted p-0 position-relative">
                <Bell size={22} />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
              </button>

              <div className="vr d-none d-sm-block"></div>

              <div className="d-flex align-items-center gap-3">
                <div className="text-end d-none d-sm-block">
                  <div className="fw-bold small text-dark">{user.name}</div>
                  <div className="badge bg-primary-subtle text-primary rounded-pill smaller fw-bold" style={{ fontSize: '9px' }}>SUPERADMIN</div>
                </div>
                <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center shadow-sm fw-bold border border-2 border-white" style={{ width: '45px', height: '45px' }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="p-4 p-lg-5">
          <Outlet />
        </main>
      </div>

      <style>{`
        .hover-bg-dark-light:hover {
          background-color: rgba(255,255,255,0.05);
          color: white !important;
        }
        .transition-all {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
