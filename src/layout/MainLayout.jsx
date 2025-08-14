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
            ? "nav-light"
            : pathname?.includes("companies")
            ? "nav-light"
            :  pathname?.includes("company")
            ? "nav-light"
            :  pathname?.includes("candidates")
            ? "nav-light"
            : pathname?.includes("job-apply")
            ? "nav-light"
            : pathname?.includes("job-post")
            ? "nav-light"
            : pathname?.includes("pricing")
            ? "nav-light"
            : null
        }
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
