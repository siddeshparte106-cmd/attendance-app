import { useEffect, useState } from "react";

export default function StudentData({ data = [] , onDelete , onEdit}) {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/classes/")
      .then((res) => res.json())
      .then((data) => setClassData(data))
      .catch((err) => console.log(err));
  }, []);

  const handledelete = (id) =>{
    const confirmDelete = window.confirm("Are you sure want to delete?");
    if(!confirmDelete) return;

    fetch(`http://localhost:3000/api/Students/${id}`,{
      method:"DELETE",
    })
    .then((res)=>{
      if(!res.ok) throw new Error("Delete failed");
      return res.json().catch(()=>({}))
    })
    .then(()=>{
      alert('Delete Successfully');
      onDelete && onDelete(id);
    }).catch((err)=> console.log(err))
  };

  //style
  const buttonStyle = {
    borderRadius: "4px",
    border: "0",
    color: "white",
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    margin:"5px",
  };

  return (
    <>
      <h1>Student Data</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Roll no</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => {
              const classItem = classData.find(
                (c) => c._id === item.class_id
              );

              return (
                <tr key={item._id}>
                  <td>{item.roll_number}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_no}</td>
                  <td>{item.dob}</td>
                  <td>{item.gender}</td>
                  <td>{item.address}</td>
                  <td>{classItem ? classItem.class_name : "N/A"}</td>
                  <td>
                    <button style={{...buttonStyle,background: "#dc2626"}} onClick={()=> handledelete(item._id)}>DELETE</button>
                    <button style={{...buttonStyle,background:"#2563eb" }} onClick={()=> onEdit && onEdit(item)}>UPDATE</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No student records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}