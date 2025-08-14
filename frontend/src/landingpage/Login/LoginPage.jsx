

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authCheckfunction/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleLoginBtn = async (event) => {
    event.preventDefault();
    console.log("Button was Clicked");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/login`, {
        method: "POST",
        credentials: "include", // required for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login process:", data);

      if (data.message === "Login Successful") {
        toast.success("✅ Login Successful!", {
          position: "bottom-right",
          autoClose: 2000,
        });

        setIsLoggedIn(true);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.message || "❌ Invalid email or password", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("❌ Server error. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-lg px-8 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">Log in</h2>
            <form className="space-y-6" onSubmit={handleLoginBtn}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-semibold"
              >
                Log in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}
