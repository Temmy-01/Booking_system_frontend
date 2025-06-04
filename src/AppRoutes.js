import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./Pages/Admin/Dashboard";
import BaseLayout from "./components/Layouts/BaseLayout";
import CompanyIndex from "./Pages/Admin/CompanyRepo";
import AdminLoginPage from "./Pages/Admin/Auth/Login";
import ForgotPasswordPage from "./Pages/Admin/Auth/ForgotPassword";
import PasswordChangePage from "./Pages/Admin/Auth/ChangePassword";
import VerifyEmailPage from "./Pages/Admin/Auth/VerifyEmail";
import EmailVerifiedPage from "./Pages/Admin/Auth/EmailVerified";
import ProtectedRoute from "./hooks/protectedRoute";
import Forbidden from "./Pages/Admin/Forbidden";
import NotFoundPage from "./Pages/Admin/NotFoundPage";
import OrganisationRepo from "./Pages/Admin/OrganisationRepo";
import Booking from "./Pages/Admin/Booking";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="auth">
        <Route path="login" element={<AdminLoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<PasswordChangePage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="email-verified" element={<EmailVerifiedPage />} />
      </Route>
      <Route
        path="/app/dashboard"
        element={<ProtectedRoute element={DashboardPage} layout={BaseLayout} />}
      />
      {/* <Route
        path="/app/dashboard"
        element={
          <BaseLayout>
            <DashboardPage />
          </BaseLayout>
        }
      /> */}
      <Route
        path="/app/index"
        element={<ProtectedRoute element={CompanyIndex} layout={BaseLayout} />}
      />
      <Route
        path="/app/repo"
        element={
          <ProtectedRoute element={OrganisationRepo} layout={BaseLayout} />
        }
      />
      <Route
        path="/app/booking"
        element={
          <ProtectedRoute element={Booking} layout={BaseLayout} />
        }
      />
      {/* <Route
        path="/app/index"
        element={
          <BaseLayout>
            <CompanyIndex />
          </BaseLayout>
        }
      /> */}
      <Route path="/unauthorized" element={<Forbidden />} />
      <Route path="*" element={<NotFoundPage />} />{" "}
    </Routes>
  );
};

export default AppRoutes;
