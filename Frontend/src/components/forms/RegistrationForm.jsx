import { useEffect, useState } from "react";

export default function RegistrationForm() {
  const [studData, SetData] = useState({
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

  const [classdata, setClassdata] = useState([]);

  const handleChange = (e) => {
    SetData({
      ...studData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/students/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(studData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success:", data);
        alert("Student infromation is submit Successfully....");
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong");
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/classes/").then((res) => res.json())
    .then((data) => {
      setClassdata(data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <h1>Student Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="roll_number"
          value={studData.roll_number}
          onChange={handleChange}
          placeholder="Enter Student name"
          required
        />
        <input
          type="text"
          name="first_name"
          value={studData.first_name}
          onChange={handleChange}
          placeholder="enter the first name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={studData.last_name}
          onChange={handleChange}
          placeholder="enter the last name"
          required
        />
        <input
          type="email"
          name="email"
          value={studData.email}
          onChange={handleChange}
          placeholder="enter the email"
          required
        />
        <input
          type="number"
          name="phone_no"
          value={studData.phone_no}
          onChange={handleChange}
          placeholder="enter the phone number"
          required
        />
        <input
          type="date"
          name="dob"
          value={studData.dob}
          onChange={handleChange}
          placeholder="enter your DOB"
          required
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
              required
            />
            male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={studData.gender === "female"}
              onChange={handleChange}
            />
            female
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={studData.gender === "other"}
              onChange={handleChange}
            />
            other
          </label>
        </div>
        <textarea
          name="address"
          value={studData.address}
          onChange={handleChange}
          id=""
          placeholder="write address..."
          required
        ></textarea>

        <select  name="class_id"  value={studData.class_id} onChange={handleChange} required id="">
        <option  value="">select Class</option>
        {
        classdata.map((item,index)=>(
        <option key={index} value={item._id}>{item.class_name}</option>
        ))
        }
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
