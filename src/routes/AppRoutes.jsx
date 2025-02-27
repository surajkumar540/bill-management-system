import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    };

    window.addEventListener("storage", checkAuth); // Listen for localStorage changes

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
      </Routes>
    </Router>
  );
};

export default AppRoutes;
