import { useEffect, useState } from "react";

export default function Subject({ editItem, setEditItem, setSubData }) {
  const [formData, setFormData] = useState({
    subject_name: "",
    class_id: "",
  });

  const [classData, setClassData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    fetch("http://localhost:3000/api/classes/")
      .then((res) => res.json())
      .then((data) => setClassData(data))
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    if (editItem) {
      setFormData({
        subject_name: editItem.subject_name || "",
        class_id: editItem.class_id || "",
      });
    }
  }, [editItem]);

  if (!editItem) return null;

  const handleUpdate = () => {
    fetch(`http://localhost:3000/api/subject/${editItem._id}`, { // ✅ fixed
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setSubData((prev) =>
          prev.map((item) =>
            item._id === updated._id ? updated : item
          )
        );
        setEditItem(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <p style={{fontSize:40, padding:'10px',}}>Update Subject</p >

      <input
        type="text"
        name="subject_name"
        value={formData.subject_name || ""}
        onChange={handleChange}
        placeholder="Subject Name"
      />

      <select
        name="class_id"
        value={formData.class_id || ""}
        onChange={handleChange}
      >
        <option value="">Select Class</option>
        {classData.map((item) => (
          <option key={item._id} value={item._id}>
            {item.class_name}
          </option>
        ))}
      </select>

      <br />

      <button onClick={handleUpdate} style={{background:" #16a34a"}} >SAVE</button>
      <button style={{background:"#6b7280"}} onClick={() => setEditItem(null)}>CANCEL</button>
    </>
  );
}