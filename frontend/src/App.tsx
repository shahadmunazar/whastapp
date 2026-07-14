import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import WhatsAppConnect from './components/WhatsAppConnect';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Plans from './pages/Plans';
import Campaigns from './pages/Campaigns';
import Messages from './pages/Messages';
import ApiLogs from './pages/ApiLogs';
import AdminDashboard from './pages/AdminDashboard';
import AdminBilling from './pages/AdminBilling';
import AdminLayout from './layouts/AdminLayout';
import Integrations from './pages/Integrations';
import DeveloperApi from './pages/DeveloperApi';
import Webhooks from './pages/Webhooks';
import LandingHome from './pages/public/LandingHome';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import ReturnPolicy from './pages/public/ReturnPolicy';


import Pricing from './pages/public/Pricing';
import Features from './pages/public/Features';
import HowItWorks from './pages/public/HowItWorks';
import Templates from './pages/public/Templates';
import Resources from './pages/public/Resources';
import Documentation from './pages/public/Documentation';
import CampaignsFeature from './pages/public/CampaignsFeature';
import AutomatedMessagesFeature from './pages/public/AutomatedMessagesFeature';
import AboutUs from './pages/public/AboutUs';
import Careers from './pages/public/Careers';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfService from './pages/public/TermsOfService';
import PublicIntegrations from './pages/public/PublicIntegrations';
import Blog from './pages/public/Blog';
import HelpCenter from './pages/public/HelpCenter';
import ApiDocs from './pages/public/ApiDocs';
import CrmPage from './pages/public/CrmPage.tsx';
import WhatsAppCrmPage from './pages/public/WhatsAppCrmPage.tsx';
import BulkSmsPage from './pages/public/BulkSmsPage.tsx';
import LeadManagementPage from './pages/public/LeadManagementPage.tsx';
import AutomationPage from './pages/public/AutomationPage.tsx';
import ApiPage from './pages/public/ApiPage.tsx';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactElement, adminOnly?: boolean }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) return <Navigate to="/login" />;

  if (adminOnly && user.role !== 'superadmin') return <Navigate to="/dashboard" />;

  return children;
};

function App() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isSuperadmin = user.role === 'superadmin';

  return (
    <Routes>
      {/* Public Marketing Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingHome />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* New Feature Pages */}
        <Route path="/crm" element={<CrmPage />} />
        <Route path="/whatsapp-crm" element={<WhatsAppCrmPage />} />
        <Route path="/bulk-sms" element={<BulkSmsPage />} />
        <Route path="/lead-management" element={<LeadManagementPage />} />
        <Route path="/automation" element={<AutomationPage />} />
        <Route path="/api-features" element={<ApiPage />} />

        {/* Dedicated Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/campaigns-feature" element={<CampaignsFeature />} />
        <Route path="/automated-messages" element={<AutomatedMessagesFeature />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/integrations" element={<PublicIntegrations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/api-features" element={<ApiDocs />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Routes with Separate Layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminDashboard />} />
        <Route path="stats" element={<AdminDashboard />} />
        <Route path="billing" element={<AdminBilling />} />
      </Route>

      {/* User Routes with Main Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {isSuperadmin ? <Navigate to="/admin" /> : <MainLayout />}
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Home />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="integrations/api" element={<DeveloperApi />} />
        <Route path="integrations/webhooks" element={<Webhooks />} />
        <Route path="whatsapp" element={<WhatsAppConnect />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="messages" element={<Messages />} />
        <Route path="api-logs" element={<ApiLogs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="plans" element={<Plans />} />
      </Route>
    </Routes>
  );
}

export default App;
