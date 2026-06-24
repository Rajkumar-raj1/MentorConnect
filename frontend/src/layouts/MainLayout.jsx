import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  const hideFooter =
    location.pathname.startsWith("/chat") ||
    location.pathname.startsWith("/groups") ||
    location.pathname.startsWith("/notifications");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 w-full">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
            hideFooter ? "py-0" : "py-6"
          }`}
        >
          <Outlet />
        </div>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;