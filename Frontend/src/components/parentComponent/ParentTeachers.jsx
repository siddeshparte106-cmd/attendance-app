import { useEffect, useState } from "react";
import TeachersData from "../display/TeachersData";
import UpdateForm from "../update/Teachers";
import TeacherForm from "../forms/TeachersForm"

export default function ParentTeachers() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
  });
  const [editItem , seteditItem] = useState(null);
  useEffect(()=>{
    fetch('http://localhost:3000/api/teachers/')
    .then((res)=>res.json())
    .then((data)=>{setData(data);})
    .catch((err)=>console.log("error:",err))
  },[])

  const handleDeleteUI = (id) =>{
    setData((prev) => prev.filter((item)=> item._id !== id))
  }
  return(
    <>
    <TeacherForm/>
    <UpdateForm editItem = {editItem} seteditItem = {seteditItem} setData = {setData}/>
    <TeachersData data = {data} onDelete={handleDeleteUI} onEdit = {seteditItem}/>
    
    </>
  )
}
