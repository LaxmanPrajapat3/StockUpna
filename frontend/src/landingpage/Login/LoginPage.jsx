
import { Link } from 'react-router-dom';
export default function LoginPage(){

return(


<>
  <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
       

        {/* Login Form */}
        <div className="bg-white shadow-md rounded-lg px-8 py-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Log in</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="********"
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
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>

</>


)


}