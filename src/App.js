import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import Dashboard from "./pages/dashboard/Dashboard";
import SignUpPage from "./pages/auth/SignUpPage";
import InitPasswordPage from "./pages/auth/InitPasswordPage";
import ProtectedRoutes from "./pages/auth/ProtectedRoutes";
import ProfilePage from "./pages/user/ProfilePage";
import CreateAccountPage from "./pages/account/CreateAccountPage";
import CreateRecordPage from "./pages/record/CreateRecordPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} exact />
            <Route path="/profile" element={<ProfilePage />} exact />
            <Route path="/reset-password" element={<InitPasswordPage />} />
            <Route path="/account/create" element={<CreateAccountPage />} />
            <Route path="/record/create" element={<CreateRecordPage />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

// {isauth && ()}
