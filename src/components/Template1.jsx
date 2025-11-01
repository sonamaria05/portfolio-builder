export default function Template1({ data }) {
  return (
    <div style={{ border: "2px solid black", padding: "20px", width: "300px" }}>
      <h2>{data.name || "Your Name"}</h2>
      <p>{data.about || "About section..."}</p>
      <p><b>Skills:</b> {data.skills || "Your skills..."}</p>
    </div>
  );
}
