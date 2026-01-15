// import {jwtDecode} from "jwt-decode";
// import StudentDashboard from "./StudentDashboard";
// import TeacherDashboard from "./TeacherDashboard";
// import AdminDashboard from "./AdminDashboard";
// import Navbar from "../components/Navbar";

// function Dashboard() {
//   const token = localStorage.getItem("token");
//   const user = jwtDecode(token);

//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   return (
//     <div>
//       <h2>EduVillage Dashboard</h2>

//       <p><b>Name:</b> {user.name}</p>
//       <p><b>Email:</b> {user.email}</p>
//       <p><b>Role:</b> {user.role}</p>

//       <hr />

//       {user.role === "student" && <StudentDashboard user={user} />}
//       {user.role === "teacher" && <TeacherDashboard user={user} />}
//       {user.role === "admin" && <AdminDashboard user={user} />}

//       <br />
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }

// export default Dashboard;



import {jwtDecode} from "jwt-decode";
import Navbar from "../components/Navbar";
import StudentDashboard from "./StudentDashboard";
 import TeacherDashboard from "./TeacherDashboard";
 import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  const user = jwtDecode(token);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />

      <div>
       <h2>EduVillage Dashboard</h2>

       <p><b>Name:</b> {user.name}</p>
       <p><b>Email:</b> {user.email}</p>
       <p><b>Role:</b> {user.role}</p>

       <hr />

       {user.role === "student" && <StudentDashboard user={user} />}
       {user.role === "teacher" && <TeacherDashboard user={user} />}
       {user.role === "admin" && <AdminDashboard user={user} />}

         <br /> 
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default Dashboard;

