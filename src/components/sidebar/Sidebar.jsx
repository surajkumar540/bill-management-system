import React, { useState, useEffect } from "react";
import { BiLeftArrow, BiLogOut, BiMoney } from "react-icons/bi";
import { BsFilePerson } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  //for mobile device responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCollapsed(true);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //my nav data
  const navItems = [
    {
      name: "Customers List",
      path: "/customers",
      icon: BsFilePerson,
    },
    {
      name: "Bill Generator",
      path: "/bill-generator",
      icon: BiMoney,
    },
  ];

  //  logout function
  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("auth"); // Remove only auth-related data
    window.location.reload();
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-gray-900 text-gray-100 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-800 ${
        isMobile ? "" : "relative"
      }`}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center">
            <h2 className="text-xl font-bold ml-2">Bill Manager</h2>
          </div>
        )}
        {collapsed && <div className="mx-auto font-bold text-xl">BM</div>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-800 focus:outline-none hidden sm:block"
        >
          {!collapsed ? (
            <BiLeftArrow />
          ) : (
            <BiLeftArrow className="rotate-180 " />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-1 px-4">
              <Link
                to={item.path}
                className={`
                  flex items-center py-3 px-3 rounded-lg transition-colors duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }
                `}
                onClick={() => isMobile && setCollapsed(true)}
              >
                <item.icon
                  className={`${collapsed ? "mx-auto" : "mr-3"} text-lg`}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div
        className={`p-4 border-t border-gray-800 flex ${
          collapsed ? "justify-center" : "items-center"
        }`}
      >
        {collapsed ? (
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            SK
          </div>
        ) : (
          <>
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              SK
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Suraj Kumar</p>
              <p className="text-xs text-gray-400">Frontend dev.</p>
            </div>
          </>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all text-white"
        >
          <BiLogOut className="text-lg" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setCollapsed(true)}
        />
      )}
    </div>
  );
};

export default Sidebar;
