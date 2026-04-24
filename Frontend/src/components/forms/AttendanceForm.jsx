import { useEffect, useState } from "react";

export default function AttendanceForm({
  studData,
  subjectData,
  teachersData,
  classData,
}) {

  const [formData, setFormData] = useState({
    class_id: "",
    subject_id: "",
    date: "",
    markedBy: "",
  });

  
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const formatted = studData.map((item) => ({
      student_id: item._id,
      name: item.first_name + " " + item.last_name,
      status: false,
      remark: "",
    }));

    setStudents(formatted);
  }, [studData]);


  const handleStatusChange = (index) => {
    const updated = [...students];
    updated[index].status = !updated[index].status;
    setStudents(updated);
  };

  
  const handleRemarkChange = (index, value) => {
    const updated = [...students];
    updated[index].remark = value;
    setStudents(updated);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      students,
    };

    try {
      const res = await fetch("http://localhost:3000/api/attendance/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Success:", data);

      alert("Attendance submitted successfully!");

      // reset
      setFormData({
        class_id: "",
        subject_id: "",
        date: "",
        markedBy: "",
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Attendance Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Date */}
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
        />

    
        <select
          required
          value={formData.class_id}
          onChange={(e) =>
            setFormData({ ...formData, class_id: e.target.value })
          }
        >
          <option value="">--select Class--</option>
          {classData.map((item) => (
            <option key={item._id} value={item._id}>
              {item.class_name}
            </option>
          ))}
        </select>

      
        <select
          required
          value={formData.subject_id}
          onChange={(e) =>
            setFormData({ ...formData, subject_id: e.target.value })
          }
        >
          <option value="">--select Subject--</option>
          {subjectData.map((item) => (
            <option key={item._id} value={item._id}>
              {item.subject_name}
            </option>
          ))}
        </select>

        <select
          required
          value={formData.markedBy}
          onChange={(e) =>
            setFormData({ ...formData, markedBy: e.target.value })
          }
        >
          <option value="">--Marked By--</option>
          {teachersData.map((item) => (
            <option key={item._id} value={item._id}>
              {item.first_name}
            </option>
          ))}
        </select>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
              <th>Remark</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((item, index) => (
                <tr key={item.student_id}>
                  <td>{item.name}</td>

                  <td>
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => handleStatusChange(index)}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={item.remark}
                      onChange={(e) =>
                        handleRemarkChange(index, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

