import Dashboard from "./Dashboard";
import DashboardAdmin from "./DashboardAdmin";
import DashboardAdvisor from "./DashboardAdvisor";

const DashboardWrapper = () => {
  const ROLES = {
    User: "2022",
    Admin: "1986",
    Advisor: "1974",
  };

  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === ROLES.Admin ? (
    <DashboardAdmin />
  ) : user?.role === ROLES.Advisor ? (
    <DashboardAdvisor />
  ) : user?.role === ROLES.User ? (
    <Dashboard />
  ) : null;
};

export default DashboardWrapper;
