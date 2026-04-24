import { useEffect, useState } from "react";

export default function Class({ editItem, setEditItem, setClassData }) {
  const [formData, setFormData] = useState({
    class_name: "",
    section: "",
    academic_year: "",
  });

  
  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);

  if (!editItem) return null;

  const handleUpdate = () => {
    fetch(`http://localhost:3000/api/classes/${editItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setClassData((prev) =>
          prev.map((item) =>
            item._id === updated._id ? updated : item
          )
        );

        setEditItem(null);
      })
      .catch((err) => console.log(err));
  };



  //style

  const buttonStyle = {
    borderRadius: "4px",
    border: "0",
    color: "white",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    margin:"10px"
  };

  const inputField = {
    margin:"10px",
    padding:"5px"
  }
  return (
    <div>
      <p style={{fontSize:40, padding:'10px',}}>Update Class</p>

      <input
      style={inputField}
        value={formData.class_name}
        onChange={(e) =>
          setFormData({ ...formData, class_name: e.target.value })
        }
        placeholder="Class Name"
      />

      <input
      style={inputField}
        value={formData.section}
        onChange={(e) =>
          setFormData({ ...formData, section: e.target.value })
        }
        placeholder="Section"
      />

      <input
      style={inputField}
        value={formData.academic_year}
        onChange={(e) =>
          setFormData({ ...formData, academic_year: e.target.value })
        }
        placeholder="Academic Year"
      />


      <div className="btns" style={{margin:"10px"}} >
        <button style={{...buttonStyle, background:" #16a34a"}} onClick={handleUpdate}>SAVE</button>
      <button style={{...buttonStyle, background:"#6b7280"}} onClick={() => setEditItem(null)}>CANCEL</button>
      </div>
    </div>
  );
}