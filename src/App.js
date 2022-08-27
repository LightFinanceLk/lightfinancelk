import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import SignUpPage from "./pages/auth/SignUpPage";
import InitPasswordPage from "./pages/auth/InitPasswordPage";
import ProfilePage from "./pages/user/ProfilePage";
import CreateAccountPage from "./pages/account/CreateAccountPage";
import AccountPage from "./pages/account/AccountPage";
import CreateRecordPage from "./pages/record/CreateRecordPage";
import BulkRecordsPage from "./pages/bulkRecords/BulkRecordsPage";
import PermissionDenied from "./pages/auth/PermissionDenied";
import RequireAuth from "./pages/auth/RequireAuth";
import DashboardWrapper from "./pages/dashboard/DashboardWrapper";
import "./App.scss";

const ROLES = {
  User: "2022",
  Admin: "1986",
  Advisor: "1974",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** Public Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="unauthorized" element={<PermissionDenied />} />

        {/** Protected Routes - USER */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="account" element={<AccountPage />} />
          <Route path="account/create" element={<CreateAccountPage />} />
          <Route path="record/create" element={<CreateRecordPage />} />
          <Route path="record/create-bulk" element={<BulkRecordsPage />} />
        </Route>

        {/** Protected Routes - ALL USERS */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.Admin, ROLES.Advisor, ROLES.User]}
            />
          }
        >
          <Route path="/" element={<DashboardWrapper />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="reset-password" element={<InitPasswordPage />} />
        </Route>

        {/** Not Found Routes */}
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

// {isauth && ()}

// add to env GENERATE_SOURCEMAP=false
