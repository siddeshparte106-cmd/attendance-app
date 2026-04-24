import { use } from "react";
import { useEffect, useState } from "react";
import AttendanceForm from "../forms/AttendanceForm";
import Attendance from "../update/Attendance";
import AttendanceData from "../display/AttendanceData";

export default function () {
  const [studData, setStudData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [subjectData, setsubjectData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/students/`)
      .then((res) => res.json())
      .then((data) => {
        setStudData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/api/classes/`)
      .then((res) => res.json())
      .then((data) => {
        setClassData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/api/subject/`)
      .then((res) => res.json())
      .then((data) => {
        setsubjectData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/api/teachers/`)
      .then((res) => res.json())
      .then((data) => {
        setTeachersData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/attendance")
      .then((res) => res.json())
      .then((data) => setAttendanceData(data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <AttendanceForm
        studData={studData}
        subjectData={subjectData}
        teachersData={teachersData}
        classData={classData}
      />
      <AttendanceData
        data={attendanceData}
        studData={studData}
        subjectData={subjectData}
        teachersData={teachersData}
        classData={classData}
      />
      <Attendance
        studData={studData}
        subjectData={subjectData}
        teachersData={teachersData}
        classData={classData}
      />
    </div>
  );
}
