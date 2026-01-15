import {jwtDecode} from "jwt-decode";

function Navbar() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const user = jwtDecode(token);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <strong>EduVillage</strong>

      <span style={{ marginLeft: "20px" }}>
        Welcome, {user.name} ({user.role})
      </span>

      {/* ROLE-BASED MENU */}
      <span style={{ marginLeft: "20px" }}>
        {user.role === "student" && (
          <>
            <button>My Courses</button>
            <button>Progress</button>
          </>
        )}

        {user.role === "teacher" && (
          <>
            <button>Create Course</button>
            <button>My Courses</button>
          </>
        )}

        {user.role === "admin" && (
          <>
            <button>Manage Users</button>
            <button>Manage Courses</button>
          </>
        )}
      </span>

      <button style={{ float: "right" }} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;