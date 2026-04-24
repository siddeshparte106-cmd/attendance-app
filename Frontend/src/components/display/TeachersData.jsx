export default function TeachersData({data=[],onDelete, onEdit}){
    const handleDelete = (id) =>{
        const confirmDelete = window.confirm("Are you sure you want to delete");
        if(!confirmDelete) return;

        fetch(`http://localhost:3000/api/teachers/${id}`,{
            method:"DELETE",
        }).then((res)=>{
            if(!res.ok) throw new Error("Delete failed");
            return res.json().catch(()=>({}));
        })
        .then(()=>{
            alert("Delete successfully");
            onDelete && onDelete(id);
        })
        .catch((err)=> console.log(err));
    };
    return(
        <><p style={{fontSize:40, padding:'10px',}}>teachers data</p >
        <table border='1'>
            <thead>
                <tr>
                    <th>first name</th>
                    <th>last name</th>
                    <th>email</th>
                    <th>phone no</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                   data.length > 0 ? (
                   data.map((item)=>( <tr key={item._id}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_no}</td>
                    <td>
                        <button style={{background: "#dc2626"}} onClick={()=> handleDelete(item._id)}>Delete</button>
                        <button style={{background:"#2563eb" }} onClick={() => onEdit && onEdit(item)}>Update</button>
                    </td>
                    
                   </tr>))
                   ):(<>
                   <tr>
                    <td colSpan='4' style={{textAlign:"center"}}>
                        no class record found
                    </td>
                    </tr></>)
                }
            </tbody>
        </table>
        </>
    )
}