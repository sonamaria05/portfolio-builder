import React from "react";
import { Box, Typography, Divider, Chip, Stack } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateModern({ data = {} }) {
  return (
    <Box sx={{ p: 4, textAlign: "left" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {data.name || "Your Name"}
      </Typography>
      <Typography variant="h6" color="primary">
        {data.title || "Professional Title"}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {data.email || "you@example.com"}
      </Typography>

      <Typography sx={{ mt: 3 }}>{data.about || "Tell visitors about yourself."}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Skills
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        {(data.skills || []).filter(Boolean).length ? (
          data.skills.filter(Boolean).map((skill, i) => <Chip key={i} label={skill} />)
        ) : (
          <Typography>No skills yet.</Typography>
        )}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      {(data.projects || []).filter((p) => p.title || projectText(p) || p.link).length ? (
        data.projects.map((project, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography variant="h6">{project.title || "Untitled Project"}</Typography>
            <Typography color="text.secondary">{projectText(project)}</Typography>
            {project.link && (
              <Typography>
                <a href={project.link} target="_blank" rel="noreferrer">
                  {project.link}
                </a>
              </Typography>
            )}
          </Box>
        ))
      ) : (
        <Typography>No projects added.</Typography>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5">Experience</Typography>
      {(data.experience || []).map((item, i) => (
        <Typography key={i}>
          {[item.role, item.company, item.duration].filter(Boolean).join(" - ")}
        </Typography>
      ))}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5">Education</Typography>
      {(data.education || []).map((item, i) => (
        <Typography key={i}>
          {[item.degree, item.institution, item.year].filter(Boolean).join(" - ")}
        </Typography>
      ))}
    </Box>
  );
}
