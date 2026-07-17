import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../components/Layout/Layout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import BusinessCard from "../pages/BusinessCard/BusinessCard";
import ProjectOverview from "../pages/Project/ProjectOverview";
import RoleAccess from "../pages/RoleAccess/RoleAccess";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import InviteFriends from "../pages/InviteFriends/InviteFriends";
import GiveFeedback from "../pages/GiveFeedback/GiveFeedback";
import Reports from "../pages/Reports/Reports";

const withLayout = (PageComponent) => (
  <ProtectedRoute>
    <Layout>
      <PageComponent />
    </Layout>
  </ProtectedRoute>
);

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />} 
      />

      {/* Protected Routes */}
      <Route path="/" element={withLayout(Dashboard)} />
      <Route path="/roles-access" element={withLayout(RoleAccess)} />
      <Route path="/business-card" element={withLayout(BusinessCard)} />
      <Route path="/invite-friends" element={withLayout(InviteFriends)} />
      <Route path="/give-feedback" element={withLayout(GiveFeedback)} />
      <Route path="/reports" element={withLayout(Reports)} />
      <Route path="/project/:id" element={withLayout(ProjectOverview)} />

      {/* Catch all - redirect to login or dashboard */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} 
      />
    </Routes>
  );
};

export default AppRoutes;
