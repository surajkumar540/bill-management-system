import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
