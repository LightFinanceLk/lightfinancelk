import Dashboard from "./user/Dashboard";
import DashboardAdmin from "./admin/DashboardAdmin";
import DashboardAdvisor from "./advisor/DashboardAdvisor";
import { useSelector } from "react-redux";

const DashboardWrapper = () => {
  // useSelector((state) => {
  //   console.log(state);
  // });
  const role = useSelector((state) => state.auth.role);
  const ROLES = {
    User: "2022",
    Admin: "1986",
    Advisor: "1974",
  };

  return (
    <>
      {role && role === ROLES.Admin ? (
        <DashboardAdmin />
      ) : role && role === ROLES.Advisor ? (
        <DashboardAdvisor />
      ) : role && role === ROLES.User ? (
        <Dashboard />
      ) : null}
    </>
  );
};

export default DashboardWrapper;
