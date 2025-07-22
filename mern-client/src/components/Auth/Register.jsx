import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const loginRes = await axios.post(
        "http://localhost:5000/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      login(loginRes.data);
      alert("Registration and login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen  py-4 flex flex-col justify-center sm:py-12 bg-white/50 ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-l from-[#cef7ef] to-[#a8f4ea] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-5 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Register</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#cef7ef]"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Full Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#cef7ef]"
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
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#cef7ef]"
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
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>


          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-[#9dd1c8] hover:text-[#aad9cf]"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
