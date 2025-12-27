import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/index/index";
import { useEffect } from "react";
import Error from "./pages/error";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ResetPassword from "./pages/auth/reset-password";
import JobGridsTwo from "./pages/job-grids/job-grids-two";
import JobDetailThree from "./pages/job-detail/job-detail-three";
import Aboutus from "./pages/aboutus";
import Services from "./pages/services";
import Pricing from "./pages/pricing";
import Employerlist from "./pages/employer/list";
import EmployerDetail from "./pages/employer/detail";
import CandidateList from "./pages/candidate/list";
import CandidateDetail from "./pages/candidate/detail";
import JobPost from "./pages/job-post";
import Contact from "./pages/contact";
import Switcher from "./components/Switcher";
import JobCategories from "./pages/job-categories";
import Profile from "./pages/profile";
import CompanyProfile from "./pages/companyProfile";
import ScrollToTop from "./components/Scroll-top";
import CandidateProfileSetting from "./pages/candidate/candidate-profile-setting";
import { useTranslation } from "react-i18next";
import MainLayout from "./layout/MainLayout";
import "./App.css";
import { GuestRoute } from "./components/ProtectedRoute";
import EmailVerification from "./pages/auth/EmailVerification";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext.jsx";
import EmailSent from "./pages/auth/EmailSent";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("light");
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route exact path="/" element={<Index />} />
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<JobCategories />} />
            <Route path="/job-post" element={<JobPost />} />
            <Route path="/vacancies" element={<JobGridsTwo />} />
            <Route path="/vacancies/:id" element={<JobDetailThree />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/companies" element={<Employerlist />} />
            <Route path="/company/:id" element={<EmployerDetail />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route
              path="/candidate-profile/:id"
              element={<CandidateDetail />}
            />
            <Route
              path="/candidate-profile-setting"
              element={<CandidateProfileSetting />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/error" element={<Error />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/email/verify/:id/:hash"
              element={<EmailVerification />}
            />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route element={<GuestRoute />}></Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/company-profile" element={<CompanyProfile />} />

            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <Switcher />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
