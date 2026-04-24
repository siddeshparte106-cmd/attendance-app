const express = require('express')
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const StudentRoutes = require("./routes/studentRoutes");
const ClassRoutes = require("./routes/classRoutes");
const SubjectRoutes = require("./routes/subjectRoutes");
const TeacheRoutes = require("./routes/teachersRoutes");
const AttendanceRoutes = require("./routes/attendanceTableRoutes");


app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/attendanceDB').then(()=>{
    console.log('connect successfully...')
}).catch((err)=>{
     console.log("something error in connection..."+err)
})

app.use("/api/students",StudentRoutes);
app.use("/api/classes",ClassRoutes);
app.use("/api/subject",SubjectRoutes);
app.use("/api/teachers",TeacheRoutes);
app.use("/api/attendance",AttendanceRoutes);

app.get('/',(req,res)=>{
    res.send("engine is start")
})

app.listen(3000,()=>{
    console.log("engine start..:http://localhost:3000")
})