import { DashboardLayout } from "@layouts/dashboard-layout";
import AccountsPage from "@pages/accounts-page";
import AuditLogsPage from "@pages/audit-logs-page";
import IPAddressPage from "@pages/ip-address-page";
import IPAddressesPage from "@pages/ip-addresses-page";
import SigninPage from "@pages/signin-page";
import SignupPage from "@pages/signup-page";
import UsersPage from "@pages/users-page";
import AdminGuard from "@routes/admin-guard";
import AuthGuard from "@routes/auth-guard";
import GuestOnlyGuard from "@routes/guest-only-guard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      {/* Public Routes */}
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
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
              <Route path="users" element={<UsersPage />} />
            </Route>
            <Route path="" element={<h1>Dashboard</h1>} />
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
