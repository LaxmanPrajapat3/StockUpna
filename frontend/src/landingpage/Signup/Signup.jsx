import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignupbtn = async (event) => {
    event.preventDefault(); // prevent form reload

    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Signup success:", data);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-left mb-4">
         
        </div>

        <div className="bg-white shadow-md rounded-lg px-8 py-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Sign up</h2>
          <form className="space-y-6" onSubmit={handleSignupbtn}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-semibold"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
