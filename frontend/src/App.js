import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import DeleteCourse from "./pages/DeleteCourse";

import MyCourses from "./pages/MyCourses";

import TeacherCourses from "./pages/TeacherCourses";
import EditCourse from "./pages/EditCourse";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

    <Route
     path="/courses"
     element={
      <ProtectedRoute>
      <Courses />
      </ProtectedRoute>
       }
/>
    <Route
  path="/create-course"
  element={
    <ProtectedRoute>
      <CreateCourse />
    </ProtectedRoute>
  }
/>
     <Route
  path="/admin/delete-course"
  element={
    <AdminRoute>
      <DeleteCourse />
    </AdminRoute>
  }
/> 
       <Route
  path="/my-courses"
  element={
    <ProtectedRoute>
      <MyCourses />
    </ProtectedRoute>
  }
/>
  <Route path="/teacher/courses" 
   element={<TeacherCourses />} />
  <Route path="/teacher/courses/edit/:id" 
   element={<EditCourse/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

