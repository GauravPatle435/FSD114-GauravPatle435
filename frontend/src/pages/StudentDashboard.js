function StudentDashboard({ user }) {
  return (
    <div>
      <h3>🎓 Student Dashboard</h3>
      <p>Welcome, {user.name}</p>

      <ul>
        <li><a href="/courses"><button>📚 All Courses</button></a></li>
        <li><a href="/my-courses"><button>📘 My Courses</button></a></li>
        <li>📝 My Quizzes</li>
        <li>📊 My Progress</li>
        <li>🎓 Certificates</li>
      </ul>
    </div>
  );
}

export default StudentDashboard;