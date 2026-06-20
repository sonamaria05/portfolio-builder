import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateElegant({ data = {} }) {
  return (
    <Paper
      sx={{
        p: 5,
        borderRadius: 5,
        background: "linear-gradient(135deg, #fafafa, #e3f2fd)",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        {data.name || "Your Name"}
      </Typography>
      <Typography color="text.secondary">{data.title || "Professional Title"}</Typography>
      <Typography color="text.secondary" gutterBottom>
        {data.email || "your@email.com"}
      </Typography>

      <Typography sx={{ mt: 3, fontStyle: "italic" }}>
        {data.about || "Describe yourself with elegance..."}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Projects</Typography>
        {(data.projects || []).filter((p) => p.title || projectText(p) || p.link).length ? (
          data.projects.map((project, i) => (
            <Box key={i} sx={{ mt: 2 }}>
              <Typography fontWeight="500">{project.title || "Untitled Project"}</Typography>
              <Typography>{projectText(project)}</Typography>
              {project.link && (
                <Typography>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </Typography>
              )}
            </Box>
          ))
        ) : (
          <Typography>No projects yet.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Skills</Typography>
        <Typography>{(data.skills || []).filter(Boolean).join(", ") || "Add skills"}</Typography>
      </Box>
    </Paper>
  );
}
