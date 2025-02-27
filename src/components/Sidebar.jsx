import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Bill Management</h2>
      <ul>
        <li className="mb-2">
          <Link to="/customers">Customers List</Link>
        </li>
        <li className="mb-2">
          <Link to="/bill-generator">Bill Generator</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
