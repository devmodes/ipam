import { DashboardLayout } from "@layouts/dashboard-layout";
import AccountsPage from "@pages/accounts-page";
import AppDashboardPage from "@pages/app-dashboard-page";
import AuditLogsPage from "@pages/audit-logs-page";
import HomePage from "@pages/home-page";
import IPAddressPage from "@pages/ip-address-page";
import IPAddressesPage from "@pages/ip-addresses-page";
import NotFoundPage from "@pages/not-found-page";
import SigninPage from "@pages/signin-page";
import SignupPage from "@pages/signup-page";
import AdminGuard from "@routes/admin-guard";
import AuthGuard from "@routes/auth-guard";
import GuestOnlyGuard from "@routes/guest-only-guard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Strict Guest Only Routes */}
        <Route element={<GuestOnlyGuard />}>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Private Routes */}
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

        {/* Misc pages */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
