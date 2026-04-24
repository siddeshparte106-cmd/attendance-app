import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import "./App.css"
import Class from "./components/parentComponent/ParentClass";
import Teachers from "./components/parentComponent/ParentTeachers"
import Subject from "./components/parentComponent/ParentSubject"
import Attendance from "./components/parentComponent/ParentAttendance"
import Student from './components/parentComponent/ParentStudent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class" element={<Class />} />
        <Route path="/teachers" element={<Teachers/>}/>
        <Route path="/subject" element={<Subject/>}/>
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/student" element={<Student/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;