import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
//import landing page components
import LandingPage from "./LandingPage";

//error file
import Error404 from "./Error404";
//import CourseModules
import CoursesModules from "./components/Courses/CoursesModules";
// import student login/register

//import header footer components
import ContactUs from "./components/HeaderandFooterComponents/ContactUs";
import About from "./components/HeaderandFooterComponents/About";
import Carrers from "./components/HeaderandFooterComponents/Footer/Carrers";
import Documentation from "./components/HeaderandFooterComponents/Footer/Documentation";
import NewsBlog from "./components/HeaderandFooterComponents/Footer/NewsBlog";
import Library from "./components/HeaderandFooterComponents/Footer/Library";
import FAQ from "./components/HeaderandFooterComponents/Footer/FAQ";
import Forum from "./components/HeaderandFooterComponents/Footer/Forum";
import HowToBecomeTeacher from "./components/HeaderandFooterComponents/Footer/HowToBecomeTeacher";
import SiteMap from "./components/HeaderandFooterComponents/Footer/SiteMap";
import HowtoGuide from "./components/HeaderandFooterComponents/Footer/HowtoGuide";
import NoticeBoard from "./components/HeaderandFooterComponents/Header/NoticeBoard";
// import HomePage from "./components/videoCall/HomePage";
// import Room from "./components/videoCall/Room";
import TermsAndConditions from "./components/HeaderandFooterComponents/Footer/TermsAndConditions";
import Layout from "./components/Teachers/Layout/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Teacherlive from "./components/Teachers/Live/TeacherLive";
import Room from "./components/Teachers/Live/Room";
import Student from "./components/Teachers/Pages/Student";
import Examination from "./components/Teachers/Pages/Examination";
import Courses from "./components/Teachers/Pages/Courses";
import Schedule from "./components/Teachers/Pages/Schedule";
import Reports from "./components/Teachers/Pages/Reports";
import Settings from "./components/Teachers/Pages/Settings";
import Admin from "./components/Admin/Admin";
import TeacherLogin from "./components/Teachers/Auth/TeacherLogin";
import TeacherProfile from "./components/Teachers/TeacherProfile";
import StudentLayout from "./components/student/Layout/StudentLayout";
import StudentProfile from "./components/student/StudentProfile";
import MyCourses from "./components/student/Pages/MyCourses";
import PaymentInfo from "./components/student/Pages/PaymentInfo";
import StudentAttendence from "./components/student/Pages/StudentAttendence";
import Quiz from "./components/student/Pages/Quiz";
import EditProfile from "./components/student/Pages/EditProfile";
import StudentLive from "./components/student/Pages/StudentLive";
import StudentLogin from "./components/student/Auth/StudentLogIn";
import StudentSignup from "./components/student/Auth/StudentSingUp";
import ChatRoom from "./components/student/Pages/ChatRoom";
import Attendance from "./components/Teachers/Pages/Attendance";
import TeacherProtectedRoute from "./components/Teachers/Auth/TeacherProtectedRoute";
import ProtectedRoute from "./components/student/Auth/ProtectedRoute";
import ChatProvider from "./context/ChatProvider";
import Chatpage from "./components/chat/pages/Chatpage";
import EnrollCourse from "./components/Courses/CourseModulesTab/EnrollCourse";
import Payment from "./components/Payment";

// Create a layout component with Navbar and Footer
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const DisplaySetup = () => {
  return (
    <div>
      <Router>
        <ChatProvider>
          <Routes>
            {/* Teacher dashboard routes - NO navbar/footer */}
            <Route element={<Layout />}>
              <Route
                path="/teacher-home"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <TeacherProfile />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/live-teacher"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Teacherlive />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-students"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Student />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-examination"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Examination />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-courses"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Courses />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-schedule"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Schedule />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-reports"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Reports />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-settings"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Settings />
                  </TeacherProtectedRoute>
                }
              />

              <Route
                path="/teacher-attendance"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Attendance />
                  </TeacherProtectedRoute>
                }
              />
            </Route>
            {/* Admin */}
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/payment"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <Payment />
                </ProtectedRoute>
              }
            />
            {/* Student Dashboard Routes */}
            <Route element={<StudentLayout />}>
              <Route
                path="student-profile"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-courses"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <MyCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-payments"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <PaymentInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-attendance"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentAttendence />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-chat"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <Chatpage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-quiz"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <Quiz />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-edit-profile"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-live-class"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentLive />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* Error404 */}
            <Route path="*" element={<Error404 />} />
            <Route path="/room/:roomId" element={<Room />} />
            {/* Regular routes WITH navbar/footer */}
            <Route element={<MainLayout />}>
              <Route path="/contact-us" element={<ContactUs />} />

              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<StudentLogin />} />
              <Route
                path="/courseModules/:id/Enrollment-course"
                element={<EnrollCourse />}
              />

              {/* payment */}

              {/* Payment */}
              {/* <Route path="/payment" element={<Payment />} /> */}
              <Route path="/signup" element={<StudentSignup />} />
              {/* <Route path="/chats" element={<Chatpage />} /> */}
              <Route path="/courseModules" element={<CoursesModules />} />
              <Route path="/courseModules/:id" element={<CoursesModules />} />
              <Route path="/about" element={<About />} />
              <Route path="/carrers" element={<Carrers />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/newsblog" element={<NewsBlog />} />
              <Route path="/library" element={<Library />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/sitemap" element={<SiteMap />} />
              <Route
                path="/howtobecometeacher"
                element={<HowToBecomeTeacher />}
              />
              <Route path="/howtoguide" element={<HowtoGuide />} />
              <Route path="/termsandcondion" element={<TermsAndConditions />} />
              <Route path="/notice" element={<NoticeBoard />} />
              <Route path="/teacher-login" element={<TeacherLogin />} />
            </Route>
          </Routes>
        </ChatProvider>
      </Router>
    </div>
  );
};

export default DisplaySetup;
