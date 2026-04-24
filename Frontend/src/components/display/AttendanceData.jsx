export default function AttendanceData({
  data = [],
  studData = [],
  subjectData = [],
  teachersData = [],
  classData = [],
}) {
  return (
    <div>
      <h1>Attendance Data</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Status</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => {
              // 🔍 Find related data
              const student = studData.find(
                (s) => s._id === item.student_id
              );

              const subject = subjectData.find(
                (s) => s._id === item.subject_id
              );

              const classItem = classData.find(
                (c) => c._id === item.class_id
              );

              const teacher = teachersData.find(
                (t) => t._id === item.markedBy
              );

              return (
                <tr key={item._id}>
                  <td>
                    {student
                      ? `${student.first_name} ${student.last_name}`
                      : "N/A"}
                  </td>

                  <td>{classItem ? classItem.class_name : "N/A"}</td>

                  <td>{subject ? subject.subject_name : "N/A"}</td>

                  <td>{teacher ? teacher.first_name : "N/A"}</td>

                  <td>{item.status}</td>

                  <td>{item.remark}</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}