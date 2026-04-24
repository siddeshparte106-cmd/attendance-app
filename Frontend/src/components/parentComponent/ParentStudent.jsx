import { useEffect, useState } from 'react';
import StudentData from '../display/StudentData';
import UpdateForm from '../update/Student';


export default function ParentStudent(){
    const [Data, setStudentData] = useState([])
    const [edit, setEdit] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/api/students/')
        .then((res)=>res.json())
        .then((data)=> setStudentData(data))
        .catch((err)=> console.log("err",err));
    },[])

    const handledeleteFromUI = (id) =>{
        setStudentData((prev)=> prev.filter((item)=> item._id !== id));
    }
    return(
        <>
        <StudentData data={Data} onEdit={setEdit} onDelete = {handledeleteFromUI} />
        <UpdateForm editItem = {edit} setEditItem={setEdit} setStudData = {Data} />

        </>
    )
}