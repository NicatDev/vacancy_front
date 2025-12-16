import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Index from './pages/index/index';
import React, { useEffect } from 'react';
import IndexTwo from './pages/index/index-two';
import IndexThree from './pages/index/index-three';
import IndexFour from './pages/index/index-four';
import IndexFive from './pages/index/index-five';
import IndexSeven from './pages/index/index-seven';
import IndexEight from './pages/index/index-eight';
import Comingsoon from './pages/comingsoon';
import Maintenance from './pages/maintenance';
import Error from './pages/error';
import Thankyou from './pages/thankyou';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import ResetPassword from './pages/auth/reset-password';
import Support from './pages/helpcenter/support';
import Guides from './pages/helpcenter/guides';

import JobGridsOne from './pages/job-grids/job-grids-one';
import JobGridsTwo from './pages/job-grids/job-grids-two';
import JobGridsThree from './pages/job-grids/job-grids-three';
import JobGridsFour from './pages/job-grids/job-grids-four';
import JobListOne from './pages/job-list/job-list-one';
import JobListTwo from './pages/job-list/job-list-two';
import JobListThree from './pages/job-list/job-list-three';
import JobListFour from './pages/job-list/job-list-four';
import JobListFive from './pages/job-list/job-list-five';
import JobListSix from './pages/job-list/job-list-six';
import JobDetailOne from './pages/job-detail/job-detail-one';
import JobDetailTwo from './pages/job-detail/job-detail-two';
import JobDetailThree from './pages/job-detail/job-detail-three';
import Overview from './pages/helpcenter/overview';
import Faqs from './pages/helpcenter/faqs';
import Aboutus from './pages/aboutus';
import Services from './pages/services';
import Pricing from './pages/pricing';
import Employerlist from './pages/employer/list';
import EmployerDetail from './pages/employer/detail';
import CandidateList from './pages/candidate/list';
import CandidateDetail from './pages/candidate/detail';
import JobApply from './pages/job-apply';
import JobPost from './pages/job-post';
import Career from './pages/career';
import Contact from './pages/contact';
import Switcher from './components/Switcher';
import Blogs from './pages/blog/blogs';
import BlogDetail from './pages/blog/blog-detail';
import LockScreen from './pages/auth/lock-screen';
import JobCategories from './pages/job-categories'
import Profile from './pages/profile'
import ScrollToTop from './components/Scroll-top';
import CandidateProfileSetting from './pages/candidate/candidate-profile-setting';
import IndexNine from './pages/index/index-nine';
import IndexTen from './pages/index/index-ten';
import { useTranslation } from "react-i18next";
import MainLayout from './layout/MainLayout';
import "./App.css";
import { GuestRoute } from './components/ProtectedRoute';
import EmailVerification from './pages/auth/EmailVerification';
import EmailSent from './pages/auth/EmailSent';
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext.jsx"
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add('light');
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          <Route path='/' element={<MainLayout />}>

            <Route exact path="/" element={<Index />} />
            <Route path="/" element={<Index />} />
            <Route path="/index-two" element={<IndexTwo />} />
            <Route path="/index-three" element={<IndexThree />} />
            <Route path="/index-four" element={<IndexFour />} />
            <Route path="/index-five" element={<IndexFive />} />
            {/* <Route path="/index-six" element={<IndexSix />} /> */}
            <Route path="/index-seven" element={<IndexSeven />} />
            <Route path="/index-eight" element={<IndexEight />} />
            <Route path="/index-nine" element={<IndexNine />} />
            <Route path="/index-ten" element={<IndexTen />} />

            <Route path="/categories" element={<JobCategories />} />
            <Route path="/job-apply" element={<JobApply />} />
            <Route path="/job-post" element={<JobPost />} />
            <Route path="/job-grid-one" element={<JobGridsOne />} />
            <Route path="/vacancies" element={<JobGridsTwo />} />
            <Route path="/job-grid-three" element={<JobGridsThree />} />
            <Route path="/job-grid-four" element={<JobGridsFour />} />
            <Route path="/job-list-one" element={<JobListOne />} />
            <Route path="/job-list-two" element={<JobListTwo />} />
            <Route path="/job-list-three" element={<JobListThree />} />
            <Route path="/job-list-four" element={<JobListFour />} />
            <Route path="/job-list-five" element={<JobListFive />} />
            <Route path="/job-list-six" element={<JobListSix />} />
            <Route path="/job-detail-one/:id" element={<JobDetailOne />} />
            <Route path="/job-detail-one" element={<JobDetailOne />} />
            <Route path="/vacancy/:id" element={<JobDetailTwo />} />
            <Route path="/job-detail-two" element={<JobDetailTwo />} />
            <Route path="/job-detail-three/:id" element={<JobDetailThree />} />
            <Route path="/job-detail-three" element={<JobDetailThree />} />

            <Route path="/helpcenter-faqs" element={<Faqs />} />
            <Route path="/helpcenter-overview" element={<Overview />} />
            <Route path="/helpcenter-support" element={<Support />} />
            <Route path="/helpcenter-guides" element={<Guides />} />

            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/companies" element={<Employerlist />} />
            <Route path="/company/:id" element={<EmployerDetail />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/candidate-profile/:id" element={<CandidateDetail />} />
            <Route path="/candidate-profile-setting" element={<CandidateProfileSetting />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/comingsoon" element={<Comingsoon />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path='/error' element={<Error />} />
            <Route path='/thankyou' element={<Thankyou />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/email/verify/:id/:hash' element={<EmailVerification />} />
            <Route path='/email-sent' element={<EmailSent />} />
            <Route element={<GuestRoute />}>

            </Route>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog-detail' element={<BlogDetail />} />
            <Route path='/blog-detail/:id' element={<BlogDetail />} />
            <Route path='/lock-screen' element={<LockScreen />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Error />} />
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
