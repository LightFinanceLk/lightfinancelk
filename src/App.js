// import logo from "./logo.svg";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<>Home</>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
