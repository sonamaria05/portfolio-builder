import React from "react";
import { Box, Typography } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateGradient({ data = {} }) {
  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 3,
        background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        color: "#000",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        {data.name || "Your Name"}
      </Typography>
      <Typography variant="subtitle1">{data.title || "Professional Title"}</Typography>
      <Typography variant="subtitle2">{data.email || "Email here"}</Typography>

      <Typography sx={{ mt: 2 }}>{data.about || "Add your bio..."}</Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Projects</Typography>
        {(data.projects || []).filter((p) => p.title || projectText(p) || p.link).length ? (
          data.projects.map((project, i) => (
            <Box key={i} sx={{ mt: 1 }}>
              <Typography fontWeight="500">{project.title}</Typography>
              <Typography>{projectText(project)}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No projects yet.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Skills</Typography>
        <Typography>{(data.skills || []).filter(Boolean).join(", ") || "Add some"}</Typography>
      </Box>
    </Box>
  );
}
