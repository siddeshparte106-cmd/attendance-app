import { useState, useEffect} from "react";

export default function Cards() {
  const [studData , setStudData] = useState([]);
  const [teachersData, setTeacherData] = useState([])
  const [avgAttendance, setAvgAttendace] = useState()
  const [present,setPresent] = useState([]);


   useEffect(()=>{
        fetch('http://localhost:3000/api/attendance/present')
        .then((res)=>res.json())
        .then((data)=> setPresent(data))
        .catch((err)=> console.log("err",err));
    },[])


    useEffect(()=>{
        fetch('http://localhost:3000/api/students/')
        .then((res)=>res.json())
        .then((data)=> setStudData(data))
        .catch((err)=> console.log("err",err));
    },[])

     useEffect(()=>{
    fetch('http://localhost:3000/api/teachers/')
    .then((res)=>res.json())
    .then((data)=>{setTeacherData(data);})
    .catch((err)=>console.log("error:",err))
  },[])


  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  };

  const cardStyle = {
    width: "180px",
    borderRadius: "12px",
    color: "white",
    display: "flex",
    padding:"0px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };

  const iconStyle = {
    fontSize: "40px",
    marginBottom: "8px",
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...cardStyle, background: "green" }}>
        <div style={iconStyle}>🎓</div>
        <p>Total Students <br /> {studData.length}</p>
      </div>

      <div style={{ ...cardStyle, background: "#1e5a7a" }}>
        <div style={iconStyle}>👩‍🏫</div>
        <p>Total Teachers <br />{teachersData.length}</p>
      </div>

      <div style={{ ...cardStyle, background: "purple" }}>
        <div style={iconStyle}>📊</div>
        <p>Average Attendance <br /> {(present.length/studData.length)*100}%</p>
      </div>

      <div style={{ ...cardStyle, background: "#c2185b" }}>
        <div style={iconStyle}>🎯</div>
        <p>Pass Rate</p>
      </div>
    </div>
  );
}