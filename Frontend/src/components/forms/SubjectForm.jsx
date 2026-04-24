import { useEffect, useState } from "react"

export default function Subject(){
    const [subjectData,setData] = useState({
        subject_name:"",
        class_id:""
    })
    const [classData,setClassData] = useState([])

    const handleChange = (e)=>{
        setData({
            ...subjectData,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch('http://localhost:3000/api/subject/',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(subjectData),
        }).then((res)=> res.json())
        .then((data)=>{
            console.log('success:',data);
            alert("class information submit successfully...")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetch("http://localhost:3000/api/classes/").then((res)=>res.json())
        .then((data)=>{
            setClassData(data)
        })
        .catch((err)=>{
            console.log(err)
        },[])
    })

    return(
        <>
        <p style={{fontSize:40, padding:'10px',}}>subject Form</p >
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name="subject_name"
            value={subjectData.subject_name}
            onChange={handleChange}
            placeholder="enter subject name"
            required
             />
             <select name="class_id" value={subjectData.class_id} onChange={handleChange} required id="">
                <option value="">select Class</option>
                {
                    classData.map((item,index)=>(
                        <option key={index} value={item._id}>{item.class_name}</option>
                    ))
                }
             </select>
             <button style={{background:" #16a34a"}}  type="submit">Submit</button>

        </form> 
        </>
    )
}