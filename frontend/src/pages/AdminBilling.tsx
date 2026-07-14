import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  DollarSign, 
  Search, 
  Loader2, 
  CheckCircle, 
  Clock,
  Calendar,
  Download,
  TrendingUp,
  Wallet
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:3000/api';

const AdminBilling = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchData = async () => {
    try {
      const [paymentsRes, statsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/admin/payments`, authHeader),
        axios.get(`${BACKEND_URL}/admin/stats`, authHeader)
      ]);
      setPayments(paymentsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Billing fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPayments = payments.filter(p => 
    p.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn">
      <div className="mb-5">
        <h2 className="fw-bold mb-1">Billing & Revenue 💰</h2>
        <p className="text-muted">Monitor platform earnings and transaction history.</p>
      </div>

      {/* Revenue Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 bg-primary text-white overflow-hidden">
            <div className="card-body p-4 position-relative" style={{ zIndex: 1 }}>
              <div className="d-flex justify-content-between mb-3">
                <div className="p-3 bg-white bg-opacity-25 rounded-3">
                  <Wallet size={24} />
                </div>
                <div className="badge bg-white bg-opacity-25 rounded-pill px-3 py-2 smaller">Total Revenue</div>
              </div>
              <h2 className="fw-bold mb-1">₹{Number(stats?.totalRevenue).toLocaleString()}</h2>
              <p className="smaller opacity-75 mb-0 d-flex align-items-center gap-1">
                <TrendingUp size={14} /> +15% from last month
              </p>
              <DollarSign className="position-absolute end-0 bottom-0 opacity-10 mb-n3 me-n3" size={120} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-3">
                <div className="p-3 bg-success-subtle text-success rounded-3">
                  <CheckCircle size={24} />
                </div>
                <div className="badge bg-success-subtle text-success rounded-pill px-3 py-2 smaller">Success Rate</div>
              </div>
              <h2 className="fw-bold mb-1">100%</h2>
              <p className="text-muted smaller mb-0">Based on {stats?.totalTransactions} transactions</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-3">
                <div className="p-3 bg-info-subtle text-info rounded-3">
                  <Clock size={24} />
                </div>
                <div className="badge bg-info-subtle text-info rounded-pill px-3 py-2 smaller">Total Billing</div>
              </div>
              <h2 className="fw-bold mb-1">{stats?.totalTransactions}</h2>
              <p className="text-muted smaller mb-0">Total successful billings to date</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white p-4 border-0 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <h5 className="fw-bold mb-0">Transaction History</h5>
          <div className="d-flex gap-2">
            <div className="input-group input-group-sm" style={{ width: '250px' }}>
              <span className="input-group-text bg-light border-0"><Search size={16} /></span>
              <input 
                type="text" 
                className="form-control bg-light border-0 shadow-none" 
                placeholder="Search user or txn id..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-light btn-sm rounded-3"><Download size={16} /></button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4 py-3 small fw-bold text-uppercase opacity-50">Transaction ID</th>
                <th className="py-3 small fw-bold text-uppercase opacity-50">User</th>
                <th className="py-3 small fw-bold text-uppercase opacity-50">Plan</th>
                <th className="py-3 small fw-bold text-uppercase opacity-50">Amount</th>
                <th className="py-3 small fw-bold text-uppercase opacity-50">Date</th>
                <th className="pe-4 py-3 small fw-bold text-end text-uppercase opacity-50">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="ps-4 py-3">
                    <span className="fw-bold text-primary small">{payment.transactionId}</span>
                  </td>
                  <td>
                    <div className="small fw-bold">{payment.user?.name}</div>
                    <div className="smaller text-muted">{payment.user?.email}</div>
                  </td>
                  <td>
                    <span className={`badge bg-light text-dark border rounded-pill px-2 py-1 smaller`}>
                        {payment.planType.toUpperCase()} ({payment.billingCycle})
                    </span>
                  </td>
                  <td>
                    <div className="fw-bold">₹{Number(payment.amount).toLocaleString()}</div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1 smaller text-muted">
                        <Calendar size={12} /> {new Date(payment.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="pe-4 text-end">
                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill smaller">
                        <CheckCircle size={10} className="me-1" /> {payment.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-muted">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBilling;
