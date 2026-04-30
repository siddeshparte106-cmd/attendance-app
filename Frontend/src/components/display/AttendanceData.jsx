import { useState } from "react";

export default function AttendanceData({
  data = [],
  studData = [],
  subjectData = [],
  teachersData = [],
  classData = [],
}) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

  const handledelete = (id) => {
    if (!window.confirm("Are you sure?")) return;

    fetch(`http://localhost:3000/api/attendance/${id}`, {
      method: "DELETE",
    })
      .then(() => alert("Deleted"))
      .catch((err) => console.log(err));
  };

  // ✅ OR FILTER (with division)
  const filteredData = data.filter((item) => {
    if (
      !selectedClass &&
      !selectedSubject &&
      !selectedDate &&
      !selectedDivision
    )
      return true;

    const student = studData.find((s) => s._id === item.student_id);

    return (
      (selectedClass && item.class_id === selectedClass) ||
      (selectedSubject && item.subject_id === selectedSubject) ||
      (selectedDate && item.date === selectedDate) ||
      (selectedDivision && student?.division === selectedDivision)
    );
  });

  return (
    <div>
      <h1>Attendance Data</h1>

      {/* Filters */}
      <div style={{ marginBottom: "10px" }}>
        {/* Class */}
        <select onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">All Classes</option>
          {classData.map((c) => (
            <option key={c._id} value={c._id}>
              {c.class_name}
            </option>
          ))}
        </select>

        {/* Subject */}
        <select onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">All Subjects</option>
          {subjectData.map((s) => (
            <option key={s._id} value={s._id}>
              {s.subject_name}
            </option>
          ))}
        </select>

        {/* Division */}
        <select onChange={(e) => setSelectedDivision(e.target.value)}>
          <option value="">All Divisions</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        {/* Date */}
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student</th>
            <th>Class</th>
            <th>Division</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Status</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => {
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

                  <td>{classItem?.class_name || "N/A"}</td>

                  <td>{student?.division || "N/A"}</td>

                  <td>{subject?.subject_name || "N/A"}</td>

                  <td>{teacher?.first_name || "N/A"}</td>

                  <td>{item.status}</td>

                  <td>{item.remark}</td>

                  <td>
                    <button
                      style={{ background: "red", color: "white" }}
                      onClick={() => handledelete(item._id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No matching records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}