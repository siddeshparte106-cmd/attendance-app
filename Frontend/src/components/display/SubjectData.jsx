import { useState,useEffect } from "react";
export default function SubjectData({data = [], onDelete, onEdit}){
    const [classData, setClassData] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:3000/api/classes/")
          .then((res) => res.json())
          .then((data) => setClassData(data))
          .catch((err) => console.log(err));
      }, []);

      const handledelate = (id) =>{
        const confirmDelete = window.confirm('Are you sure want to delete?');
        if(!confirmDelete) return;

        fetch(`http://localhost:3000/api/subject/${id}`,{
            method:"DELETE",
        })
        .then((res)=>{
            if(!res.ok) throw new Error("delete Failed");
            return res.json().catch(()=>({})) 
        })
        .then(()=>{
            alert('dalete successfully');
            onDelete && onDelete(id);
        }).catch((err)=> console.log(err))
      }

    return(
        <>
        <p style={{fontSize:40, padding:'10px',}}>Subject Data</p>
        <table border='1'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { data .length > 0 ? (
                    data.map((item)=>{
                        const classItem = classData.find(
                (c) => c._id === item.class_id
              );
              return(
                <tr key={item._id}>
                    <td>{item.subject_name}</td>
                    <td>{classItem ? classItem.class_name:'N/A'}</td>
                    <td>
                        <button style={{background:"#dc2626"}} onClick={()=> handledelate(item._id)}>DELETE</button>
                        <button style={{background:"#2563eb"}} onClick={()=> onEdit && onEdit(item)}>UPDATE</button>
                    </td>
                </tr>
              );
                        
                    })
                ):(
                    <tr>
                        <td colSpan='2' style={{textAlign:'center'}}>
                            No subject records found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}