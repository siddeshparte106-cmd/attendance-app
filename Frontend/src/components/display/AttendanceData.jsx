export default function AttendanceData({
  data = [],
  studData = [],
  subjectData = [],
  teachersData = [],
  classData = [],
}) {
    const handledelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/api/attendance/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json().catch(() => ({}));
      })
      .then(() => {
        alert("Deleted successfully");
        onDelete && onDelete(id);
      })
      .catch((err) => console.log(err));
  };



    // style 

    const buttonStyle = {
    borderRadius: "4px",
    border: "0",
    color: "white",
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    margin:"5px",
  };
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
                    <button style={{...buttonStyle,background: "#dc2626"}} onClick={() => handledelete(item._id)}>
                    DELETE
                  </button>
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