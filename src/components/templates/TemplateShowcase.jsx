import React from "react";
import { Box, Typography, Stack, Chip, Paper } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateShowcase({ data = {} }) {
  const skills = (data.skills || []).filter(Boolean);
  const projects = (data.projects || []).filter((item) => item.title || projectText(item) || item.link);

  return (
    <Box sx={{ p: 3, background: "linear-gradient(180deg, #f8fbff, #eef7f7)", borderRadius: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" fontWeight={900} sx={{ color: "#063b5c" }}>
          {data.name || "Your Name"}
        </Typography>
        <Typography variant="h6" sx={{ color: "#007c89" }}>
          {data.title || "Professional Title"}
        </Typography>
        <Typography color="text.secondary">{data.email || "you@example.com"}</Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #d5e8ee", mb: 3 }}>
        <Typography variant="overline" color="primary" fontWeight={800}>
          About
        </Typography>
        <Typography sx={{ lineHeight: 1.8 }}>{data.about || "Add a short summary about your work and strengths."}</Typography>
      </Paper>

      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Featured Projects
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
        {projects.length ? (
          projects.map((project, i) => (
            <Paper key={i} elevation={0} sx={{ p: 2.5, borderRadius: 2, border: "1px solid #d5e8ee" }}>
              <Typography fontWeight={900}>{project.title || "Untitled Project"}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {projectText(project)}
              </Typography>
              {project.link && (
                <Typography sx={{ mt: 1 }}>
                  <a href={project.link}>Open link</a>
                </Typography>
              )}
            </Paper>
          ))
        ) : (
          <Typography>No projects added.</Typography>
        )}
      </Box>

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mt: 3 }}>
        {skills.length ? skills.map((skill, i) => <Chip key={i} label={skill} color="primary" variant="outlined" />) : null}
      </Stack>
    </Box>
  );
}
