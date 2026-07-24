import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Edit2, 
  Search, 
  Filter, 
  Loader2, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Activity,
  Layers,
  ArrowUpRight,
  UserCheck,
  UserX
} from 'lucide-react';

const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api`;

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
    <div className="card-body p-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className={`p-3 rounded-3 bg-${color}-subtle text-${color}`}>
          <Icon size={24} />
        </div>
        <div className="badge bg-success-subtle text-success d-flex align-items-center gap-1 smaller">
          <ArrowUpRight size={12} /> {trend}
        </div>
      </div>
      <h3 className="fw-bold mb-1">{value}</h3>
      <p className="text-muted small mb-0 fw-medium">{title}</p>
    </div>
    <div className={`bg-${color} opacity-10 position-absolute bottom-0 start-0 w-100`} style={{ height: '4px' }}></div>
  </div>
);

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, inactive
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [newPlan, setNewPlan] = useState('starter');
  const [newStatus, setNewStatus] = useState('active');
  const [newExpiry, setNewExpiry] = useState('');

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/admin/users`, authHeader),
        axios.get(`${BACKEND_URL}/admin/stats`, authHeader)
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Admin fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${BACKEND_URL}/admin/users/${selectedUser.id}/subscription`, {
        planType: newPlan,
        status: newStatus,
        expiresAt: newExpiry
      }, authHeader);
      alert('User status updated! 🚀');
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Update failed');
    }
  };

  const toggleUserStatus = async (user: any) => {
    const nextStatus = user.subscription?.status === 'active' ? 'inactive' : 'active';
    try {
      await axios.put(`${BACKEND_URL}/admin/users/${user.id}/subscription`, {
        status: nextStatus
      }, authHeader);
      fetchData();
    } catch (err) {
      alert('Toggle failed');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && u.subscription?.status === 'active') ||
                          (statusFilter === 'inactive' && u.subscription?.status !== 'active');
    return matchesSearch && matchesStatus;
  });

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn">
      {/* Page Title */}
      <div className="mb-5 d-flex justify-content-between align-items-end">
        <div>
          <h2 className="fw-bold mb-1">User Command Center 🛠️</h2>
          <p className="text-muted mb-0">Manage global user accounts, permissions, and accessibility.</p>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-xl-3">
          <StatCard 
            title="Registered Users" 
            value={stats?.totalUsers || 0} 
            icon={Users} 
            color="primary" 
            trend="+12%"
          />
        </div>
        <div className="col-md-6 col-xl-3">
          <StatCard 
            title="Active Users" 
            value={stats?.activeSubscriptions || 0} 
            icon={UserCheck} 
            color="success" 
            trend="+5%"
          />
        </div>
        <div className="col-md-6 col-xl-3">
          <StatCard 
            title="Total Projects" 
            value={stats?.totalProjects || 0} 
            icon={Layers} 
            color="info" 
            trend="+18%"
          />
        </div>
        <div className="col-md-6 col-xl-3">
          <StatCard 
            title="Platform Visits" 
            value={stats?.visitCount || 0} 
            icon={Activity} 
            color="warning" 
            trend="+24%"
          />
        </div>
      </div>

      {/* User Management Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
        <div className="card-header bg-white p-4 border-0">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
            <div className="d-flex align-items-center gap-4">
                <div className="nav nav-pills bg-light p-1 rounded-3">
                    <button onClick={() => setStatusFilter('all')} className={`nav-link py-1 px-3 smaller fw-bold ${statusFilter === 'all' ? 'bg-white shadow-sm text-primary' : 'text-muted'}`}>All Users</button>
                    <button onClick={() => setStatusFilter('active')} className={`nav-link py-1 px-3 smaller fw-bold ${statusFilter === 'active' ? 'bg-success text-white shadow-sm' : 'text-muted'}`}>Active</button>
                    <button onClick={() => setStatusFilter('inactive')} className={`nav-link py-1 px-3 smaller fw-bold ${statusFilter === 'inactive' ? 'bg-danger text-white shadow-sm' : 'text-muted'}`}>Inactive</button>
                </div>
            </div>
            
            <div className="d-flex gap-2">
              <div className="input-group input-group-sm" style={{ width: '250px' }}>
                <span className="input-group-text bg-light border-0"><Search size={16} /></span>
                <input 
                  type="text" 
                  className="form-control bg-light border-0 shadow-none" 
                  placeholder="Search name or email..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-light btn-sm rounded-3"><Filter size={16} /></button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4 py-3 small fw-bold text-uppercase opacity-50">User Details</th>
                <th className="py-3 small fw-bold text-uppercase opacity-50">Plan</th>
                <th className="py-3 small fw-bold text-uppercase opacity-50">Status</th>
                <th className="py-3 small fw-bold text-uppercase opacity-50">Usage / Limit</th>
                <th className="py-3 small fw-bold text-uppercase opacity-50">Expiry</th>
                <th className="pe-4 py-3 small fw-bold text-end text-uppercase opacity-50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm ${user.subscription?.status === 'active' ? 'bg-primary text-white' : 'bg-secondary text-white'}`} style={{ width: '40px', height: '40px' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="fw-bold small">{user.name}</div>
                        <div className="text-muted smaller">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 ${
                      user.subscription?.planType === 'enterprise' ? 'bg-dark' : 
                      user.subscription?.planType === 'professional' ? 'bg-primary' : 'bg-secondary'
                    }`}>
                      {user.subscription?.planType?.toUpperCase() || 'STARTER'}
                    </span>
                  </td>
                  <td>
                    {user.subscription?.status === 'active' ? (
                      <span className="badge bg-success-subtle text-success small d-flex align-items-center gap-1 w-fit"><CheckCircle size={12} /> Active</span>
                    ) : (
                      <span className="badge bg-danger-subtle text-danger small d-flex align-items-center gap-1 w-fit"><XCircle size={12} /> {user.subscription?.status?.toUpperCase() || 'INACTIVE'}</span>
                    )}
                  </td>
                  <td>
                    <div className="small fw-medium">
                        {user.projectCount} / {
                            user.subscription?.planType === 'enterprise' ? '∞' : 
                            user.subscription?.planType === 'professional' ? '12' : '1'
                        }
                    </div>
                  </td>
                  <td className="small text-muted">
                    {user.subscription?.expiresAt ? new Date(user.subscription.expiresAt).toLocaleDateString() : 'Lifetime'}
                  </td>
                  <td className="pe-4 text-end">
                    <div className="d-flex justify-content-end gap-2">
                        <button 
                            onClick={() => toggleUserStatus(user)}
                            className={`btn btn-sm rounded-pill p-2 border-0 bg-light ${user.subscription?.status === 'active' ? 'text-danger' : 'text-success'}`}
                            title={user.subscription?.status === 'active' ? 'Deactivate User' : 'Activate User'}
                        >
                            {user.subscription?.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                        </button>
                        <button 
                            onClick={() => {
                                setSelectedUser(user);
                                setNewPlan(user.subscription?.planType || 'starter');
                                setNewStatus(user.subscription?.status || 'active');
                                setNewExpiry(user.subscription?.expiresAt ? user.subscription.expiresAt.split('T')[0] : '');
                                setShowModal(true);
                            }}
                            className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm border-0"
                        >
                            <Edit2 size={12} className="me-1" /> Manage
                        </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan={6} className="text-center py-5">
                        <div className="text-muted">No users found for the selected filter.</div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Subscription Modal */}
      {showModal && (
        <div className="modal show d-block animate__animated animate__fadeIn" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0 p-4 bg-light">
                <h5 className="modal-title fw-bold">Manage User Account</h5>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '50px', height: '50px' }}>
                    {selectedUser?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">{selectedUser?.name}</h6>
                    <p className="text-muted small mb-0">{selectedUser?.email}</p>
                  </div>
                </div>

                <form onSubmit={handleUpdateSubscription}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Subscription Plan</label>
                    <select className="form-select border-0 bg-light shadow-none" value={newPlan} onChange={e => setNewPlan(e.target.value)}>
                      <option value="starter">Starter Plan (1 Project)</option>
                      <option value="professional">Professional Plan (12 Projects)</option>
                      <option value="enterprise">Enterprise Plan (Unlimited)</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Account Status</label>
                    <select className="form-select border-0 bg-light shadow-none" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                      <option value="active">Active (Access Granted)</option>
                      <option value="inactive">Inactive (Access Restricted)</option>
                      <option value="expired">Expired</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Plan Expiry Date</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light"><Calendar size={16} /></span>
                      <input 
                        type="date" 
                        className="form-control border-0 bg-light shadow-none" 
                        value={newExpiry}
                        onChange={e => setNewExpiry(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm border-0">
                    Save User Configuration
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .w-fit { width: fit-content; }
        .smaller { font-size: 0.75rem; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
