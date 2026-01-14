import {jwtDecode} from "jwt-decode";

function Dashboard() {
  const token = localStorage.getItem("token");

  let user = null;
  if (token) {
    user = jwtDecode(token);
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>EduVillage Dashboard</h2>

      {user && (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;