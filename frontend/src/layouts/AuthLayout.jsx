import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-blue-600">
              MentorConnect
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Connect. Learn. Grow.
            </p>
          </div>

          {/* Auth Card */}
          <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;