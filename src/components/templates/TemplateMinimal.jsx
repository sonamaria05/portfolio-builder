import React from "react";
import { Box, Typography } from "@mui/material";

export default function TemplateMinimal({ data = {} }) {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="500">
        {data?.name || "Your Name"}
      </Typography>
      <Typography color="text.secondary">{data?.email || "Email here"}</Typography>
      <Typography sx={{ mt: 2 }}>{data?.about || "About yourself..."}</Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="500">Projects</Typography>
        {data?.projects?.length ? (
          data.projects.map((p, i) => (
            <Typography key={i}>
              • {p?.title || "Untitled"} ({p?.link ? <a href={p.link}>link</a> : "no link"})
            </Typography>
          ))
        ) : (
          <Typography>No projects yet.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="500">Skills</Typography>
        <Typography>{data?.skills?.join(", ") || "No skills added"}</Typography>
      </Box>
    </Box>
  );
}
