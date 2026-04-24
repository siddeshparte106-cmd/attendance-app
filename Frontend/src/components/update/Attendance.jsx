import { useState } from "react";

export default function Attendance({
  studData,
  subjectData,
  teachersData,
  classData,
}) {
  const [formData, setFormData] = useState({
    student_id: "",
    class_id: "",
    subject_id: "",
    status: "",
    remark: "",
    markedBy: "",
    data: "",
  });
  return (
    <div>
    </div>
  );
}
