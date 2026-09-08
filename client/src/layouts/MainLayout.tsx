import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#f7f5ef]">
      <Navbar />

      <main className={isHome ? "" : "pt-20"}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;