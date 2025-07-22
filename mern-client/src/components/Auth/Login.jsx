import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data && res.data.user) {
        login(res.data);
        alert("Logged in successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen  py-4 flex flex-col justify-center sm:py-12 bg-white/50 ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-l from-[#cef7ef] to-[#a8f4ea] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-5 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#cef7ef] mt-3"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#cef7ef] mt-3"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative pt-4">
                  <button
                    type="submit"
                    className="bg-[#9dd1c8] hover:bg-[#aad9cf] text-white md:text-base text-xs font-semibold rounded-md px-4 py-2 w-full transition duration-200 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Don’t have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-[#9dd1c8] hover:text-[#aad9cf]"
              >
                Get Started
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
