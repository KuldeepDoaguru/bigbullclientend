import "./App.css";
import Home from "./component/home";
import Login from "./component/Priyanshu2/login";
import CourseComponent from "./component/Aditya/CourseComponent";
import Blogs from "./component/Aditya/Blogs";
import About from "./component/Aditya/About";
import { Routes, Route, useLocation } from "react-router-dom";
import PurchasedCoursesPage from "./component/AsthaYadav/purchasedCoursesPage";
import HelpPage from "./component/Nousheen/helpPage";
import CourseDetail from "./component/Aditya/courseDetail";
import Cart from "./component/Priyanshu2/cart";
import Footer from "./component/Priyanshu2/footer";
import Invoice from "./component/Aditya/invoice";
import ResetPassword from "./component/Nousheen/resetPassword";
import Verification from "./component/Nousheen/verification";
import PrivacyPolicy from "./component/Nousheen/privacyPolicy";
import RefundPolicy from "./component/Nousheen/refundPolicy";
import TermCondition from "./component/Nousheen/termAndCondition";
import ContactUs from "./component/Priyanshu2/contactUs";
import SinglePost from "./component/Aditya/singleBlogPost";
import NotificationPage from "./component/Nousheen/notification";
import SubscriptionPlans from "./component/Nousheen/subscription";
import Navbar from "./component/navbar";
import EnrollForm from "./component/EnrollForm";
import PageNotFound from "./component/pageNotFound";
import ScrollToTop from "./component/scrollTop";
import EditProfileComponent from "./component/Aditya/editProfile";
import ProfilePage from "./component/Aditya/profileDashboard";
import Dashboard2 from "./component/Aditya/Dashboard2";
import Introduction from "./component/Aditya/Introduction";
import ForgetPass from "./component/Aditya/forget";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"];
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <>
      {location.pathname !== "/" || user?.id !== null ? <Navbar /> : ""}
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<CourseComponent />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/PurchasedCoursesPage"
            element={<PurchasedCoursesPage />}
          />
          <Route path="/HelpPage" element={<HelpPage />} />
          <Route path="/Cdetail/:id" element={<CourseDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/Invoice" element={<Invoice />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Verification" element={<Verification />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/RefundPolicy" element={<RefundPolicy />} />
          <Route path="/TermCondition" element={<TermCondition />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/singlepost/:id" element={<SinglePost />} />
          <Route path="/NotificationPage" element={<NotificationPage />} />
          <Route path="/SubscriptionPlans" element={<SubscriptionPlans />} />
          <Route path="/EnrollForm" element={<EnrollForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editProfile" element={<EditProfileComponent />} />
          <Route path="/course-dashboard/:id" element={<Dashboard2 />} />
          <Route path="/intro/:id" element={<Introduction />} />
          <Route path="/forget" element={<ForgetPass />} />
        </Routes>
      </ScrollToTop>
      <Footer />
    </>
  );
}

export default App;
