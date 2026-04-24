import { useEffect, useState } from "react";

export default function Teachers({editItem, seteditItem, setData}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);
  if (!editItem) return null;

  const handleUpdate = () => {
    fetch(`http://localhost:3000/api/teachers/${editItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updated) => {
        setData((prev) =>
          prev.map((item) => (item._id === updated._id ? updated : item)),
        );
        seteditItem(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <p style={{fontSize:40, padding:'10px',}}>update class</p>
      <input
        value={formData.first_name || ""}
        onChange={(e) =>
          setFormData({ ...formData, first_name: e.target.value })
        }
        placeholder="First name"
      />
      <input
        value={formData.last_name || ""}
        onChange={(e) =>
          setFormData({ ...formData, last_name: e.target.value })
        }
        placeholder="last name"
      />
      <input
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value || "" })
        }
        placeholder="Email"
      />
      <input
        value={formData.phone_no}
        onChange={(e) =>
          setFormData({ ...formData, phone_no: e.target.value || "" })
        }
        placeholder="phone"
      />
      <button style={{background:" #16a34a"}} onClick={handleUpdate}>Update</button>
      <button onClick={()=>seteditItem(null)}>Cancel</button>
    </div>
  );
}
