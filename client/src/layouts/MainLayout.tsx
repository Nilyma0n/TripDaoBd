import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#f7f5ef]">

      <Navbar />

      <main className="pt-20">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;