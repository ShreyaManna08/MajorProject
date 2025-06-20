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
import Courses from "./components/Teachers/Pages/Courses";
import Schedule from "./components/Teachers/Pages/Schedule";
import Admin from "./components/Admin/Admin";
import TeacherLogin from "./components/Teachers/Auth/TeacherLogin";
import TeacherProfile from "./components/Teachers/TeacherProfile";
import StudentLayout from "./components/student/Layout/StudentLayout";
import StudentProfile from "./components/student/StudentProfile";
import MyCourses from "./components/student/Pages/MyCourses";

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
import ForgotPassword from "./components/student/Auth/ForgotPassword";
import ClassAssesment from "./components/student/Pages/ClassAssesment";
import Assistant from "./components/student/Pages/Assistant";
import Marks from "./components/student/Pages/Marks";
import UploadRecordedClass from "./components/Teachers/Pages/UploadRecordedClass";
import TeacherQuiz from "./components/Teachers/Pages/TeacherQuiz";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import RoutineScheduling from "./components/Teachers/Pages/RoutineScheduling";
import TeacherClassAssesment from "./components/Teachers/Pages/TeacherClassAssesment";
import AdmitCardGeneration from "./components/student/AdmitCard/AdmitCardGeneration";
import StudentIdentityCard from "./components/student/Pages/StudentIdentityCard";
import SalarySlip from "./components/Teachers/Pages/SalarySlip";
import DeleteCourse from "./components/Teachers/Pages/DeleteCourse";
import TeacherAssign from "./components/Teachers/Pages/TeacherAssign";
import StudentDocumentVerficationn from "./components/Admin/pages/RegitrationManagement/StudentDocumentVerficationn";
import TeacherDocumentVerfication from "./components/Admin/pages/RegitrationManagement/TeacherDocumentVerfication";
import StudentDetails from "./components/Admin/pages/RegitrationManagement/StudentDetails";
import TeacherDetails from "./components/Admin/pages/RegitrationManagement/TeacherDetails";
import DocumentIssue from "./components/Admin/pages/RegitrationManagement/DocumentIssue";
import RegistrationMessage from "./components/Admin/pages/RegitrationManagement/RegistrationMessage";
import NewRegisterStudent from "./components/Admin/pages/AccountingAndFinancial/NewRegisterStudent";
import RegularStudent from "./components/Admin/pages/AccountingAndFinancial/RegularStudent";
import EmployeeSalary from "./components/Admin/pages/AccountingAndFinancial/EmployeeSalary";
import AccountCommunication from "./components/Admin/pages/AccountingAndFinancial/AccountCommunication";
import SemesterPayment from "./components/SemesterPayment";
import TeacherApplication from "./components/HeaderandFooterComponents/Footer/TeacherApplication/TeacherApplication";
import TeacherReg from "./components/HeaderandFooterComponents/Footer/TeacherApplication/TeacherReg";

import CourseCodeManagement from "./components/Admin/pages/AcademicManagement/CourseCodeManagement";
import TeacherCourseManagement from "./components/Admin/pages/AcademicManagement/TeacherCourseManagement";
import StudentSemester from "./components/Admin/pages/AcademicManagement/StudentSemester";
import AcademicManagementNotice from "./components/Admin/pages/AcademicManagement/AcademicManagementNotice";
import AdminLogin from "./components/Admin/Auth/AdminLogin";
import CreateCourseCode from "./components/Admin/pages/AcademicManagement/CreateCourseCode";
import AccountsAdminProtectedRoute from "./components/Admin/Auth/AccountsAdminProtectedRoute";
import RegisterAdminProtectedRoute from "./components/Admin/Auth/RegisterAdminProtectedRoute";
import AcademicAdminProtectedRoute from "./components/Admin/Auth/AcademicAdminProtectedRoute";
import UnAuthorizedAccessPage from "./components/Admin/Auth/UnAuthorizedAccessPage";
import TeacherForgetpassword from "./components/Teachers/Auth/TeacherForgetpassword";
import AccountNotice from "./components/Admin/pages/AccountingAndFinancial/AccountNotice";
import RegisterAdmin from "./components/Admin/pages/RegitrationManagement/RegisterAdmin";
import TeacherNotice from "./components/Teachers/Pages/TeacherNotice";
import SuccessMessage from "./SuccessMessage";
import Credits from "./components/HeaderandFooterComponents/Footer/Credits";

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
                path="/upload-recorded-class"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <UploadRecordedClass />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-quiz"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <TeacherQuiz />
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
                path="/teacher-attendance"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Attendance />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-notice"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <TeacherNotice />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-chat"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <Chatpage />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/schedule-class"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <RoutineScheduling />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-assesment"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <TeacherClassAssesment />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/delete-class"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <DeleteCourse />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/teacher-assign"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <TeacherAssign />
                  </TeacherProtectedRoute>
                }
              />
              <Route
                path="/salary-slip"
                element={
                  <TeacherProtectedRoute allowedRoles={["teacher"]}>
                    <SalarySlip />
                  </TeacherProtectedRoute>
                }
              />
            </Route>
            {/* Admin */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Admin />} />
              {/* Register Admin */}
              <Route
                path="/student-document-verification"
                element={
                  <RegisterAdminProtectedRoute allowedRoles={["registerAdmin"]}>
                    <StudentDocumentVerficationn />
                  </RegisterAdminProtectedRoute>
                }
              />
              <Route
                path="/teacher-document-verification"
                element={
                  <RegisterAdminProtectedRoute allowedRoles={["registerAdmin"]}>
                    <TeacherDocumentVerfication />
                  </RegisterAdminProtectedRoute>
                }
              />
              <Route
                path="/students-details"
                element={
                  <RegisterAdminProtectedRoute allowedRoles={["registerAdmin"]}>
                    <StudentDetails />
                  </RegisterAdminProtectedRoute>
                }
              />
              <Route
                path="/teachers-details"
                element={
                  <RegisterAdminProtectedRoute allowedRoles={["registerAdmin"]}>
                    <TeacherDetails />
                  </RegisterAdminProtectedRoute>
                }
              />
              <Route
                path="/register-communication"
                element={
                  <RegisterAdminProtectedRoute allowedRoles={["registerAdmin"]}>
                    <Chatpage />
                  </RegisterAdminProtectedRoute>
                }
              />
              <Route
                path="/register-management-notice"
                element={
                  <RegisterAdminProtectedRoute allowedRoles={["registerAdmin"]}>
                    <RegisterAdmin />
                  </RegisterAdminProtectedRoute>
                }
              />
              <Route
                path="/document-issue"
                element={
                  <RegisterAdminProtectedRoute allowedRoles={["registerAdmin"]}>
                    <DocumentIssue />
                  </RegisterAdminProtectedRoute>
                }
              />
              <Route
                path="/register-communication"
                element={
                  <RegisterAdminProtectedRoute allowedRoles={["registerAdmin"]}>
                    <RegistrationMessage />
                  </RegisterAdminProtectedRoute>
                }
              />
              {/* Financial Admin */}
              <Route
                path="/new-registerStudent"
                element={
                  <AccountsAdminProtectedRoute allowedRoles={["accountsAdmin"]}>
                    <NewRegisterStudent />
                  </AccountsAdminProtectedRoute>
                }
              />
              <Route
                path="/regular-student"
                element={
                  <AccountsAdminProtectedRoute allowedRoles={["accountsAdmin"]}>
                    <RegularStudent />
                  </AccountsAdminProtectedRoute>
                }
              />
              <Route
                path="/employees-salary"
                element={
                  <AccountsAdminProtectedRoute allowedRoles={["accountsAdmin"]}>
                    <EmployeeSalary />
                  </AccountsAdminProtectedRoute>
                }
              />
              <Route
                path="/financial-management-notice"
                element={
                  <AccountsAdminProtectedRoute allowedRoles={["accountsAdmin"]}>
                    <AccountNotice />
                  </AccountsAdminProtectedRoute>
                }
              />
              <Route
                path="/account-communication"
                element={
                  <AccountsAdminProtectedRoute allowedRoles={["accountsAdmin"]}>
                    <Chatpage />
                  </AccountsAdminProtectedRoute>
                }
              />
              /{/* Academin Admin Routes */}
              <Route
                path="/teacher-course-management"
                element={
                  <AcademicAdminProtectedRoute allowedRoles={["academicAdmin"]}>
                    <TeacherCourseManagement />
                  </AcademicAdminProtectedRoute>
                }
              />
              <Route
                path="/course-code-management"
                element={
                  <AcademicAdminProtectedRoute allowedRoles={["academicAdmin"]}>
                    <CourseCodeManagement />
                  </AcademicAdminProtectedRoute>
                }
              />
              <Route
                path="/academic-Create-Course-Code"
                element={
                  <AcademicAdminProtectedRoute allowedRoles={["academicAdmin"]}>
                    <CreateCourseCode />
                  </AcademicAdminProtectedRoute>
                }
              />
              <Route
                path="/student-semester"
                element={
                  <AcademicAdminProtectedRoute allowedRoles={["academicAdmin"]}>
                    <StudentSemester />
                  </AcademicAdminProtectedRoute>
                }
              />
              <Route
                path="/academic-management-notice"
                element={
                  <AcademicAdminProtectedRoute allowedRoles={["academicAdmin"]}>
                    <AcademicManagementNotice />
                  </AcademicAdminProtectedRoute>
                }
              />
              <Route
                path="/academic-communication"
                element={
                  <AcademicAdminProtectedRoute allowedRoles={["academicAdmin"]}>
                    <Chatpage />
                  </AcademicAdminProtectedRoute>
                }
              />
            </Route>

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/teacher-forgot-password"
              element={<TeacherForgetpassword />}
            />
            <Route
              path="/pay-admission-fees"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pay-semester-fees"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <SemesterPayment />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/test/:orderid" element={<SuccessMessage />} /> */}
            <Route path="/payment/:orderid" element={<SuccessMessage />} />
            {/* <Route
              path="/unauthenticated-user-found"
              element={<UnauthorizedAccessPage />}
            /> */}

            <Route
              path="/unauthenticated-user-found"
              element={<UnAuthorizedAccessPage />}
            />
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* Student Dashboard Routes */}
            <Route element={<StudentLayout />}>
              <Route
                path="/student-profile"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-courses"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <MyCourses />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student-attendance"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentAttendence />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-chat"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <Chatpage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-Admit"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <AdmitCardGeneration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-idcard"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentIdentityCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-quiz"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <Quiz />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-edit-profile"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/class-assessment"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <ClassAssesment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student-marks"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <Marks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/class-assistant"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <Assistant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-live-class"
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
              <Route path="/check-status" element={<TeacherApplication />} />

              <Route path="/teacher-register" element={<TeacherReg />} />
              <Route path="/sitemap" element={<SiteMap />} />
              <Route
                path="/howtobecometeacher"
                element={<HowToBecomeTeacher />}
              />
              <Route path="/credits" element={<Credits />} />
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
