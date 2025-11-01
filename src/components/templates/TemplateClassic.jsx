import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function TemplateClassic({ data = {} }) {
  return (
    <Box sx={{ p: 4, fontFamily: "serif" }}>
      <Typography variant="h3" gutterBottom>
        {data?.name || "Your Name"}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {data?.email || "you@example.com"}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography>{data?.about || "Short bio or summary."}</Typography>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5">Experience & Projects</Typography>
      {data?.projects?.length ? (
        data.projects.map((p, i) => (
          <Box key={i} sx={{ mt: 1 }}>
            <Typography fontWeight="bold">{p?.title}</Typography>
            <Typography>{p?.description}</Typography>
            {p?.link && <a href={p.link}>View</a>}
          </Box>
        ))
      ) : (
        <Typography>No projects listed.</Typography>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5">Skills</Typography>
      <Typography>{data?.skills?.join(" | ") || "Add some skills"}</Typography>
    </Box>
  );
}
