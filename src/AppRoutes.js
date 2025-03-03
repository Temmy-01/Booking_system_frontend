import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./Pages/Admin/Dashboard";
import BaseLayout from "./components/Layouts/BaseLayout";
import CompanyIndex from "./Pages/Admin/CompanyRepo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/dashboard" />} />
      <Route
        path="/app/dashboard"
        element={
          <BaseLayout>
            <DashboardPage />
          </BaseLayout>
        }
      />

      <Route
        path="/app/index"
        element={
          <BaseLayout>
            <CompanyIndex />
          </BaseLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
