import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../pages/Login";
import Dashboard from "../layouts/Dashboard";
import Customers from "../pages/Customers";
import BillGenerator from "../pages/BillGenerator";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  // checking localStorage every refresh
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    };

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/customers" : "/login"} />}
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/customers" />
            ) : (
              <Login setAuth={setIsAuthenticated} />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route path="/customers" element={<Customers />} />
          <Route path="/bill-generator" element={<BillGenerator />} />
        </Route>

        {/* Catch-All Route if you redirect and random route */}
        <Route
          path="*"
          element={<ProtectedRedirect isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

// go back to last visited route if authenticated, otherwise to login logic
const ProtectedRedirect = ({ isAuthenticated }) => {
  const location = useLocation();
  return isAuthenticated ? (
    <Navigate to="/customers" />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default AppRoutes;
