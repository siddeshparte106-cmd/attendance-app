import { useState } from "react";

export default function TeachersForm() {
  const[teachersData, setTeachersData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
  });

  const handlechange = (e) => {
    setTeachersData({
        ...teachersData,
        [e.target.name]:e.target.value,
    });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    fetch("http://localhost:3000/api/teachers/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(teachersData),
    })
    .then((res) => res.json())
    .then((data)=> {
        console.log("Success:",data);
        alert("teachers infromation submit successfully....");
        setTeachersData({
            first_name:"",
            last_name:"",
            email:"",
            phone_no:"",
        });
    })
    .catch((err)=>{
            console.log("ERROR:",err);
            alert("something went wrong")
        });
  }
  return (
    <>
      <p style={{fontSize:40, padding:'10px', textAlign:'center'}}> Teachers Registration</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={teachersData.first_name}
          onChange={handlechange}
          placeholder="enter first Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={teachersData.last_name}
          onChange={handlechange}
          placeholder="enter last name"
          required
        />
        <input
          type="email"
          name="email"
          value={teachersData.email}
          onChange={handlechange}
          placeholder="Email"
          required
        />
        <input
          type="number"
          name="phone_no"
          value={teachersData.phone_no}
          onChange={handlechange}
          placeholder="enter phone no"
          required
        />
        <button  style={{background:" #16a34a"}} type="submit">submit</button>
      </form>
    </>
  );
}
