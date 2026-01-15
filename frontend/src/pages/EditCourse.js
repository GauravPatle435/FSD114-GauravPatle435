import { useParams } from "react-router-dom";
import { useState } from "react";

function EditCourse() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const updateCourse = async () => {
    const res = await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h3>Edit Course</h3>
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={updateCourse}>Update</button>
    </div>
  );
}

export default EditCourse;