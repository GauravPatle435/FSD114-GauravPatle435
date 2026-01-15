function TeacherDashboard({ user }) {
  return (
    <div>
      <h3>👨‍🏫 Teacher Dashboard</h3>
      <p>Welcome, {user.name}</p>

      <ul>
        <li>➕ Create Course</li>
        <li>📝 Create Quiz</li>
        <li>📊 View Student Progress</li>
        <li>🎓 Issue Certificates</li>
      </ul>
    </div>
  );
}

export default TeacherDashboard;