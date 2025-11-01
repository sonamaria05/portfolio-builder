export default function Template2({ data }) {
  return (
    <div style={{ background: "#f0f0f0", padding: "20px", width: "300px" }}>
      <h3 style={{ color: "blue" }}>{data.name || "Your Name"}</h3>
      <p>{data.about || "Tell us about yourself"}</p>
      <p>{data.skills || "List your skills"}</p>
    </div>
  );
}
