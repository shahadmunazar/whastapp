import { Sidebar, Topbar } from './DashboardLayout';
import { Outlet } from 'react-router-dom';
import '../assets/css/theme.css';

const MainLayout = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Topbar />
        <main className="p-4 p-lg-5">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
