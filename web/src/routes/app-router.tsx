import { DashboardLayout } from "@layouts/dashboard-layout";
import AccountsPage from "@pages/accounts-page";
import AppDashboardPage from "@pages/app-dashboard-page";
import AuditLogsPage from "@pages/audit-logs-page";
import HomePage from "@pages/home-page";
import IPAddressPage from "@pages/ip-address-page";
import IPAddressesPage from "@pages/ip-addresses-page";
import SigninPage from "@pages/signin-page";
import SignupPage from "@pages/signup-page";
import AdminGuard from "@routes/admin-guard";
import AuthGuard from "@routes/auth-guard";
import GuestOnlyGuard from "@routes/guest-only-guard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      {/* Public Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      {/* Strict Guest Only Routes */}
      <Routes>
        <Route element={<GuestOnlyGuard />}>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>

      {/* Private Routes */}
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/app" element={<DashboardLayout />}>
            <Route element={<AdminGuard />}>
              <Route path="audit" element={<AuditLogsPage />} />
            </Route>
            <Route path="" element={<AppDashboardPage />} />
            <Route path="ip-address" element={<IPAddressesPage />} />
            <Route path="ip-address/:id" element={<IPAddressPage />} />
            <Route path="account" element={<AccountsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
