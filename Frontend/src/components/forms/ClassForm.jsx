import { useState } from "react";

export default function ClassForm() {
  const [classData, setclassData] = useState({
    class_name: "",
    section: "",
    academic_year: "",
  });

  const handleChange = (e) => {
    setclassData({
      ...classData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/classes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success:", data);
        alert("Class information submit successfully...");
        setclassData({
          class_name: "",
          section: "",
          academic_year: "",
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        alert("something went wrong");
      });
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
    <>
      <p style={{fontSize:40, padding:'10px',}}>Classs Registration Form</p>
      <form onSubmit={handleSubmit}>
        <input
        style={inputField}
          type="text"
          name="class_name"
          value={classData.class_name}
          onChange={handleChange}
          placeholder="Enter class Name"
          required
        />
        <select
        style={inputField}
          name="section"
          value={classData.section}
          onChange={handleChange}
          required
        >
          <option value="">Select class</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <input
        style={inputField}
          type="text"
          name="academic_year"
          value={classData.academic_year}
          onChange={handleChange}
          placeholder="Select academic year"
          required
        />
        <button style={{...buttonStyle,background:"#22c55e"}} type="submit">Submit</button>
      </form>
    </>
  );
}
