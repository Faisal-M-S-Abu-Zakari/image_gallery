import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Sign in to SnapShare
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Join us to manage and share your photos seamlessly!
        </p>

        {/* Google Login Button */}
        <button className="flex items-center justify-center w-full bg-white text-gray-700 border border-gray-300 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition">
          <FcGoogle className="mr-2 text-xl" />
          Continue with Google
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email & Password Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
          <input
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          No account?{" "}
          <a href="#" className="text-blue-500">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
