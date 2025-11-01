import React, { useState } from "react";
import LivePreview from "../components/LivePreview";

export default function EditorPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    about: "",
    skills: "",
  });
  const [template, setTemplate] = useState("template1");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await fetch("http://localhost:5000/api/users/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, template }),
    });
    alert("Portfolio saved! You can view it at /" + formData.username);
  };

  return (
    <div style={{ display: "flex", gap: "50px", padding: "20px" }}>
      <div>
        <h2>Create Your Portfolio</h2>
        <input name="username" placeholder="Username" onChange={handleChange} /><br/>
        <input name="name" placeholder="Your Name" onChange={handleChange} /><br/>
        <textarea name="about" placeholder="About You" onChange={handleChange} /><br/>
        <input name="skills" placeholder="Your Skills" onChange={handleChange} /><br/>

        <label>Choose Template: </label>
        <select onChange={(e) => setTemplate(e.target.value)}>
          <option value="template1">Modern</option>
          <option value="template2">Minimal</option>
          <option value="template3">Classic</option>
        </select><br/><br/>

        <button onClick={handleSave}>Save Portfolio</button>
      </div>

      <LivePreview data={formData} template={template} />
    </div>
  );
}
