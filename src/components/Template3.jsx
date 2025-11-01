export default function Template3({ data }) {
  return (
    <div style={{ borderRadius: "10px", padding: "20px", background: "#ffe0b2", width: "300px" }}>
      <h2>{data.name}</h2>
      <em>{data.about}</em>
      <p><strong>Skills:</strong> {data.skills}</p>
    </div>
  );
}
