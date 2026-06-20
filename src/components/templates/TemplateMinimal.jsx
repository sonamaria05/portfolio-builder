import React from "react";
import { Box, Typography } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateMinimal({ data = {} }) {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="500">
        {data.name || "Your Name"}
      </Typography>
      <Typography color="text.secondary">{data.title || "Professional Title"}</Typography>
      <Typography color="text.secondary">{data.email || "Email here"}</Typography>
      <Typography sx={{ mt: 2 }}>{data.about || "About yourself..."}</Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="500">
          Projects
        </Typography>
        {(data.projects || []).filter((p) => p.title || projectText(p) || p.link).length ? (
          data.projects.map((project, i) => (
            <Typography key={i}>
              {project.title || "Untitled"} {project.link ? <a href={project.link}>link</a> : null}
            </Typography>
          ))
        ) : (
          <Typography>No projects yet.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="500">
          Skills
        </Typography>
        <Typography>{(data.skills || []).filter(Boolean).join(", ") || "No skills added"}</Typography>
      </Box>
    </Box>
  );
}
