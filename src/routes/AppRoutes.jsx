import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
// import Customers from "../pages/Customers";
// import BillGenerator from "../pages/BillGenerator";
import Dashboard from "../layouts/Dashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Sidebar */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="/customers" element={<Customers />} />
          <Route path="/bill-generator" element={<BillGenerator />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
