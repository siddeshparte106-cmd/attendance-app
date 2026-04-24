export default function ClassData({ data = [], onEdit, onDelete }) {
  const handledelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/api/classes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json().catch(() => ({}));
      })
      .then(() => {
        alert("Deleted successfully");
        onDelete && onDelete(id);
      })
      .catch((err) => console.log(err));
  };



  // style 

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
      <p style={{fontSize:40, padding:'10px',}} >Class Information</p> 
      <table border="1">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Section</th>
            <th>Academic Year</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
                <td>{item.class_name}</td>
                <td>{item.section}</td>
                <td>{item.academic_year}</td>
                <td>
                  <button style={{...buttonStyle,background: "#dc2626"}} onClick={() => handledelete(item._id)}>
                    DELETE
                  </button>

                  <button style={{...buttonStyle,background:"#2563eb" }} onClick={() => onEdit && onEdit(item)}>
                    UPDATE
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No class records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Total: {data.length}</h2>
    </>
  );
}