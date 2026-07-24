import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="card border-0 shadow-sm h-100">
    <div className="card-body d-flex flex-column gap-3">
      <div className="d-flex align-items-center gap-3">
        <div className={`rounded-circle p-3 bg-light-${color} text-${color}`}>
          <Icon size={24} />
        </div>
        <div className="text-muted fw-medium">{title}</div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="fs-3 fw-bold">{value}</div>
        {trend && (
          <div className="text-success small d-flex align-items-center gap-1">
            <TrendingUp size={14} /> {trend}
          </div>
        )}
      </div>
    </div>
  </div>
);

const Home = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMessages: 0,
    activeConnections: 0,
    failedMessages: 0,
    revenue: 0,
    recentActivities: []
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Track visit
    axios.post(`${import.meta.env.VITE_API_URL}/api/stats/visit`).catch(() => {});

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div>
      <div className="row mb-6">
        <div className="col-12">
          <div className="bg-primary text-white p-5 rounded-4 shadow-sm mb-4">
            <h1 className="h2 mb-2">👋 Welcome back, {user.name || 'User'}!</h1>
            <p className="opacity-75 mb-0">Here's what's happening with your projects today.</p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-6">
        <div className="col-md-6 col-xl-3">
          <StatsCard title="Total Projects" value={stats.totalProjects} icon={Users} color="primary" trend="+2.5%" />
        </div>
        <div className="col-md-6 col-xl-3">
          <StatsCard title="Messages Sent" value={stats.totalMessages.toLocaleString()} icon={TrendingUp} color="success" trend="+12.2%" />
        </div>
        <div className="col-md-6 col-xl-3">
          <StatsCard title="Active Connections" value={stats.activeConnections} icon={ShoppingCart} color="warning" trend="+4.8%" />
        </div>
        <div className="col-md-6 col-xl-3">
          <StatsCard title="Failed Messages" value={stats.failedMessages.toLocaleString()} icon={AlertTriangle} color="danger" trend="-1.2%" />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">Platform Growth</h5>
            <div className="bg-light rounded-4 d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
              <span className="text-muted italic">Analytics chart will appear here</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">Recent Activity</h5>
            <div className="list-group list-group-flush">
              {stats.recentActivities && stats.recentActivities.length > 0 ? (
                stats.recentActivities.map((act: any, i: number) => (
                  <div key={i} className="list-group-item px-0 py-3 border-0">
                    <div className="d-flex gap-3">
                      <div className={`rounded-circle p-2 ${act.type === 'message' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}>
                        {act.type === 'message' ? <TrendingUp size={16} /> : <Users size={16} />}
                      </div>
                      <div>
                        <div className="small fw-bold">{act.content}</div>
                        <div className="text-muted smaller">{new Date(act.time).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5 text-muted small">
                  No recent activity found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
