import { useEffect, useState } from "react";
import ClassData from "../display/ClassData";
import UpdateForm from "../update/Class";
import ClassForm from "../forms/ClassForm"

export default function ParentClass() {
  const [classData, setClassData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  

  useEffect(() => {
    fetch("http://localhost:3000/api/classes/")
      .then((res) => res.json())
      .then((data) =>{setClassData(data);})
      .catch((err) => console.log(err));
  }, []);

  
  const handleDeleteFromUI = (id) => {
    setClassData((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <>
    <ClassForm/>
    <UpdateForm
        editItem={editItem}
        setEditItem={setEditItem}
        setClassData={setClassData}
      />
      <ClassData
        data={classData}
        onEdit={setEditItem}
        onDelete={handleDeleteFromUI}
      />
      
      
    </>
  );
}