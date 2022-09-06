import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import SignUpPage from "./pages/auth/SignUpPage";
import InitPasswordPage from "./pages/auth/InitPasswordPage";
import CreateAccountPage from "./pages/account/CreateAccountPage";
import EditAccountPage from "./pages/account/EditAccountPage";
import AccountsPage from "./pages/account/AccountsPage";
import AccountPage from "./pages/account/AccountPage";
import CreateRecordPage from "./pages/record/CreateRecordPage";
import BulkRecordsPage from "./pages/bulkRecords/BulkRecordsPage";
import PermissionDenied from "./pages/auth/PermissionDenied";
import RequireAuth from "./pages/auth/RequireAuth";
import DashboardWrapper from "./pages/dashboard/DashboardWrapper";
import CreateAdvisor from "./pages/advisor/CreateAdvisor";
import AdvisorDetailsPage from "./pages/advisor/AdvisorDetailsPage";
import UserDetailsPage from "./pages/user/UserDetailsPage";
import ProfileWrapper from "./pages/profile/ProfileWrapper";
import MeetingsPage from "./pages/meetings/MeetingsPage";
import "./App.scss";
import BulkRecordListPage from "./pages/bulkRecords/BulkRecordListPage";
import RecordPage from "./pages/record/RecordPage";

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
          <Route path="account" element={<AccountsPage />} />
          <Route path="account/create" element={<CreateAccountPage />} />
          <Route path="account/edit/:aid" element={<EditAccountPage />} />
          <Route path="account/:aid" element={<AccountPage />} />
          <Route path="record/create/:aid" element={<CreateRecordPage />} />
          <Route path="record/:rid" element={<RecordPage />} />
          <Route
            path="record/create-bulk-record"
            element={<BulkRecordsPage />}
          />
          <Route path="record/bulk-records" element={<BulkRecordListPage />} />
        </Route>

        {/** Protected Routes - ADMIN */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="advisor/create" element={<CreateAdvisor />} />
        </Route>

        {/** Protected Routes - ADMIN and ADVISOR*/}
        <Route
          element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Advisor]} />}
        >
          <Route path="user/:uid" element={<UserDetailsPage />} />
        </Route>

        {/** Protected Routes - ADMIN and USER*/}
        <Route
          element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
        >
          <Route path="advisor/:aid" element={<AdvisorDetailsPage />} />
        </Route>

        {/** Protected Routes - ADVISOR */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Advisor]} />}>
          <Route path="meetings" element={<MeetingsPage />} />
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
          <Route path="profile" element={<ProfileWrapper />} />
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
