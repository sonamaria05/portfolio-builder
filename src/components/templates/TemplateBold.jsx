import React from "react";
import { Box, Typography } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateBold({ data = {} }) {
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "#111",
        color: "#fff",
        borderRadius: 3,
        textAlign: "left",
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="secondary">
        {data.name || "Your Name"}
      </Typography>
      <Typography variant="h6" color="#ddd">
        {data.title || "Professional Title"}
      </Typography>
      <Typography variant="subtitle1" color="#ccc">
        {data.email || "Email address"}
      </Typography>

      <Typography sx={{ mt: 2, color: "#ddd" }}>
        {data.about || "Describe yourself confidently..."}
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" color="secondary">
          Projects
        </Typography>
        {(data.projects || []).filter((p) => p.title || projectText(p) || p.link).length ? (
          data.projects.map((project, i) => (
            <Box key={i} sx={{ mt: 1 }}>
              <Typography fontWeight="bold">{project.title || "Untitled Project"}</Typography>
              <Typography>{projectText(project)}</Typography>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" style={{ color: "#90caf9" }}>
                  View
                </a>
              )}
            </Box>
          ))
        ) : (
          <Typography>No projects available.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" color="secondary">
          Skills
        </Typography>
        <Typography>{(data.skills || []).filter(Boolean).join(", ") || "No skills yet."}</Typography>
      </Box>
    </Box>
  );
}
