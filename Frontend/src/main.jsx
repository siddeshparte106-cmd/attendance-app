import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ClassForm from './components/forms/ClassForm.jsx'
import RegistrationForm from './components/forms/RegistrationForm.jsx'
import SubjectForm from './components/forms/SubjectForm.jsx'
import TeachersForm from './components/forms/TeachersForm.jsx'
import Parent from './components/parentComponent/ParentClass.jsx'
import ParentStudent from './components/parentComponent/ParentStudent.jsx'
import ParentSubject from './components/parentComponent/ParentSubject.jsx'
import ParentTeachers from './components/parentComponent/ParentTeachers.jsx'
import ParentAttendance from './components/parentComponent/ParentAttendance.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App/>
    {/*<ClassForm/>
    <Parent/>
    <RegistrationForm/>
    <ParentStudent/>
    <SubjectForm/>
    <ParentSubject/>
    <TeachersForm/>
    <ParentTeachers/>

    <ParentAttendance/>*/}

  </StrictMode>,
)
