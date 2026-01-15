function StudentDashboard({ user }) {
  return (
    <div>
      <h3>🎓 Student Dashboard</h3>
      <p>Welcome, {user.name}</p>

      <a href="/my-courses">My Courses</a>

      <ul>
        <li>📘 My Courses</li>
        <li>📝 My Quizzes</li>
        <li>📊 My Progress</li>
        <li>🎓 Certificates</li>
      </ul>
    </div>
  );
}

export default StudentDashboard;