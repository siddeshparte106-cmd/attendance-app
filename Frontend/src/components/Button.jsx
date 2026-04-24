import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
    padding: "10px",
  };

  const buttonStyle = {
    width: "120px",
    borderRadius: "4px",
    border: "0",
    color: "white",
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <button
        style={{
          ...buttonStyle,
          background: "linear-gradient(135deg, #2c5f7a, #3b86a6)",
        }}
        onClick={() => navigate("/class")} 
      >
        Class
      </button>

      <button onClick={()=> navigate("/teachers")} style={{ ...buttonStyle, background: "linear-gradient(135deg, #0a8f08, #12c012)" }}>
        Teacher
      </button>

      <button onClick={()=> navigate("/subject")} style={{ ...buttonStyle, background: "linear-gradient(135deg, #7b0f8a, #a0126b)" }}>
        Subject
      </button>

      <button onClick={()=> navigate("/attendance")} style={{ ...buttonStyle, background: "linear-gradient(135deg, #c2185b, #e91e63)" }}>
        Attendance
      </button>

      <button onClick={()=> navigate("/student")} style={{ ...buttonStyle, background: "linear-gradient(135deg, #0f9d58, #34d399)" }}>
        Student
      </button>
    </div>
  );
}