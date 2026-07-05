import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Party from "../pages/Party/Party";
import Transactions from "../pages/Transactions/Transactions";
import Attendance from "../pages/Attendance/Attendance";
import Tasks from "../pages/Tasks/Tasks";
import Materials from "../pages/Materials/Materials";
import Settings from "../pages/Settings/Settings";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";

const withLayout = (PageComponent) => (
  <Layout>
    <PageComponent />
  </Layout>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={withLayout(Dashboard)} />
      <Route path="/party" element={withLayout(Party)} />
      <Route path="/transactions" element={withLayout(Transactions)} />
      <Route path="/attendance" element={withLayout(Attendance)} />
      <Route path="/tasks" element={withLayout(Tasks)} />
      <Route path="/materials" element={withLayout(Materials)} />
      <Route path="/settings" element={withLayout(Settings)} />
      <Route path="/project/:id" element={<ProjectDetails/>} />
    </Routes>
  );
};

export default AppRoutes;
