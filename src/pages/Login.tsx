import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await authService.login(email, password);
      console.log("User data from API:", userData);

      // Extract the correct firstName
      const firstName = userData.result?.firstName || "User";

      toast.success(`Welcome back, ${firstName}!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Logo Section */}
        <div className="flex justify-center py-8 bg-[#CA168C]/20">
          <img
            src="/logo.png" // Path to the logo in the public folder
            alt="Company Logo"
            className="h-16 w-auto" // Adjust size as needed
          />
        </div>

        {/* Form Section */}
        <div className="px-8 py-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
            Sign in to your account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CA168C] focus:border-[#CA168C] sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} // Toggle input type
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CA168C] focus:border-[#CA168C] sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#CA168C]"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#CA168C] hover:bg-[#B3147D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CA168C] transition duration-300"
              >
                Sign in
              </button>
            </div>

            {/* Forgot Password Link */}
            {/* <div className="text-center">
              <a
                href="/forgot-password"
                className="text-sm text-[#CA168C] hover:text-[#B3147D]"
              >
                Forgot your password?
              </a>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
