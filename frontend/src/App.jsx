import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";
import MentorLayout from "./layouts/MentorLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MentorList from "./pages/MentorList";
import MentorDetails from "./pages/MentorDetails";
import CreateMentorProfile from "./pages/CreateMentorProfile";
import Chat from "./pages/Chat";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import Sessions from "./pages/Sessions";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SessionForm from "./components/Session/SessionForm";
const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/mentors/:mentorId" element={<MentorDetails />} />
      </Route>

      {/* Protected Common Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<GroupDetails />} />
          <Route path="/sessions" element={<Sessions />} />
         <Route path="/sessions/book/:mentorId" element={<SessionForm />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Route>

      {/* Student Routes */}
      <Route element={<RoleBasedRoute allowedRoles={["student"]} />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Mentor Routes */}
      <Route element={<RoleBasedRoute allowedRoles={["mentor"]} />}>
        <Route element={<MentorLayout />}>
          <Route path="/mentor-profile" element={<CreateMentorProfile />} />
          <Route path="/mentor/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;