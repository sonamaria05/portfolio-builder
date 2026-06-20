import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateClassic({ data = {} }) {
  return (
    <Box sx={{ p: 4, fontFamily: "serif" }}>
      <Typography variant="h3" gutterBottom>
        {data.name || "Your Name"}
      </Typography>
      <Typography variant="subtitle1">{data.title || "Professional Title"}</Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {data.email || "you@example.com"}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography>{data.about || "Short bio or summary."}</Typography>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5">Experience & Projects</Typography>
      {(data.projects || []).filter((p) => p.title || projectText(p) || p.link).length ? (
        data.projects.map((project, i) => (
          <Box key={i} sx={{ mt: 1 }}>
            <Typography fontWeight="bold">{project.title || "Untitled Project"}</Typography>
            <Typography>{projectText(project)}</Typography>
            {project.link && <a href={project.link}>View</a>}
          </Box>
        ))
      ) : (
        <Typography>No projects listed.</Typography>
      )}

      {(data.experience || []).map((item, i) => (
        <Typography key={i} sx={{ mt: 1 }}>
          {[item.role, item.company, item.duration].filter(Boolean).join(" - ")}
        </Typography>
      ))}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5">Skills</Typography>
      <Typography>{(data.skills || []).filter(Boolean).join(" | ") || "Add some skills"}</Typography>
    </Box>
  );
}
