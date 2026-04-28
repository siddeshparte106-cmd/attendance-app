import { useEffect, useState } from "react";

export default function Student({ editItem, setEditItem, setStudData }) {
  const [studData, setData] = useState({
    roll_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    dob: "",
    gender: "",
    address: "",
    class_id: "",
  });

  const [classData, setClassData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...studData, [name]: value });
  };

  
  useEffect(() => {
    fetch("http://localhost:3000/api/classes/")
      .then((res) => res.json())
      .then((data) => setClassData(data))
      .catch((err) => console.log(err));
  }, []);

  
  useEffect(() => {
    if (editItem) {
      setData({
        roll_number: editItem.roll_number || "",
        first_name: editItem.first_name || "",
        last_name: editItem.last_name || "",
        email: editItem.email || "",
        phone_no: editItem.phone_no || "",
        dob: editItem.dob ? editItem.dob.split("T")[0] : "",
        gender: editItem.gender || "",
        address: editItem.address || "",
        class_id: editItem.class_id || "",
      });
    }
  }, [editItem]);

  if (!editItem) return null;

  const handleUpdate = () => {
    fetch(`http://localhost:3000/api/students/${editItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setStudData((prev) =>
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
      <h2>Update Student</h2>

      <input
      style={inputField}
        name="first_name"
        value={studData.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />

      <input
      style={inputField}
        name="last_name"
        value={studData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
      />

      <input
      style={inputField}
        name="email"
        value={studData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
      style={inputField}
        type="number"
        name="phone_no"
        value={studData.phone_no || ""}
        onChange={handleChange}
        placeholder="Phone"
      />

      <input
      style={inputField}
        type="date"
        name="dob"
        value={studData.dob}
        onChange={handleChange}
      />

      
      <div>
        <p>Gender:</p>

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={studData.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={studData.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={studData.gender === "other"}
            onChange={handleChange}
          />
          Other
        </label>
      </div>

      <textarea
        name="address"
        value={studData.address}
        onChange={handleChange}
        placeholder="Address..."
      />

    
      <select
        name="class_id"
        value={studData.class_id}
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

      <button style={{...buttonStyle, background:" #16a34a"}} onClick={handleUpdate}>SAVE</button>
      <button style={{...buttonStyle, background:"#6b7280"}} onClick={() => setEditItem(null)}>CANCEL</button>
    </div>
  );
}