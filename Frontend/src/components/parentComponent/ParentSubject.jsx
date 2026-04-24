import { useEffect, useState } from "react"
import SubData from '../display/SubjectData'
import UpdateForm from '../update/Subject'
import Subject from '../forms/SubjectForm'

export default function ParentSubject(){
    const [subjectData , setSubjectData] = useState([]);
    const [edit ,setEdit] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/api/subject')
        .then((res)=> res.json())
        .then((data)=> setSubjectData(data))
        .catch((err)=> console.log(err))
    },[])

    const handledeleteFromUI = (id) =>{
        setStudentData((prev)=> prev.filter((item)=> item._id !== id));
    }

    return(
        <>
        <Subject/>
        <UpdateForm editItem = {edit} setEditItem = {setEdit} setSubData = {subjectData}/>
        <SubData data = {subjectData} onEdit = {setEdit} onDelete = {handledeleteFromUI}/>
        
        </>
    )
}