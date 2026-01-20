function TeacherDashboard({ user }) {
  return (
    <div>
      <h3>👨‍🏫 Teacher Dashboard</h3>
      <p>Welcome, {user.name}</p>

      <ul>
        <li><a href="/courses"><button>📚 All Courses</button></a></li>
         <li><a href="/create-course"><button>➕ Create Course</button></a></li>
         <li><a href="/teacher/courses"><button>📚My Course</button></a></li>

        <li>📝 Create Quiz</li>
        <li>📊 View Student Progress</li>
        <li>🎓 Issue Certificates</li>
      </ul>
    </div>
  );
}

export default TeacherDashboard;