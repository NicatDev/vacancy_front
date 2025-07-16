import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar
        navClass={
          pathname?.includes("vacancies") ||
          pathname?.includes("aboutus") ||
          pathname?.includes("terms") ||
          pathname?.includes("privacy") ||
          pathname?.includes("categories")
            ? "!justify-end nav-light"
            : null
        }
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
