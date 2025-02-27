import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validate"; // Import validation function
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = ({ setAuth }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const navigate = useNavigate();

  // Login functionality
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(validateLogin(formValues)).length > 0) {
      setError(validateLogin(formValues));
      return;
    }
    setIsSubmit(true);

    if (
      formValues.email === "suraj@test.com" &&
      formValues.password === "suraj@1234"
    ) {
      localStorage.setItem("auth", "true");
      setAuth(true); // Update state immediately
      navigate("/customers");
    } else {
      setError({ general: "Invalid credentials!" });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newObject = { ...formValues, [name]: value };
    setFormValues({ ...newObject });

    if (isSubmit) {
      const errorObj = validateLogin(newObject);
      setError(errorObj);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-md px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-1">Please sign in to your account</p>
          </div>

          {error.general && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700 text-sm">{error.general}</p>
            </div>
          )}

          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                name="email"
                className={`p-3 border w-full rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200 ${
                  error.email ? "border-red-500" : "border-gray-300"
                }`}
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            {error.email && (
              <p className="text-red-500 mt-1 text-xs">{error.email}</p>
            )}
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label
                className="block text-gray-700 text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle input type
                name="password"
                placeholder="••••••••"
                className={`p-3 border w-full rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200 ${
                  error.password ? "border-red-500" : "border-gray-300"
                }`}
                value={formValues.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 mt-1 text-xs">{error.password}</p>
            )}
          </div>

          <div className="flex items-center mb-6">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 w-full rounded-lg font-medium transition duration-200 transform hover:scale-[1.02]"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
