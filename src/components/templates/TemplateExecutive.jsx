import React from "react";
import { Box, Typography, Divider, Stack, Chip } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateExecutive({ data = {} }) {
  const skills = (data.skills || []).filter(Boolean);
  const projects = (data.projects || []).filter((item) => item.title || projectText(item) || item.link);
  const experience = (data.experience || []).filter((item) => item.company || item.role || item.duration);

  return (
    <Box sx={{ bgcolor: "#fbfcff", color: "#162033", border: "1px solid #dce6f2" }}>
      <Box sx={{ p: 4, background: "linear-gradient(135deg, #0f172a, #1d4ed8)", color: "#fff" }}>
        <Typography variant="overline" sx={{ letterSpacing: 2, color: "#bfdbfe" }}>
          Professional Portfolio
        </Typography>
        <Typography variant="h3" fontWeight={800}>
          {data.name || "Your Name"}
        </Typography>
        <Typography variant="h6" sx={{ color: "#dbeafe" }}>
          {data.title || "Professional Title"}
        </Typography>
        <Typography sx={{ mt: 1, color: "#e0f2fe" }}>{data.email || "you@example.com"}</Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={800}>
          Profile
        </Typography>
        <Typography sx={{ mt: 1.5, lineHeight: 1.8 }}>{data.about || "Write a focused professional summary."}</Typography>

        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" fontWeight={800}>
          Core Strengths
        </Typography>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mt: 1.5 }}>
          {skills.length ? skills.map((skill, i) => <Chip key={i} label={skill} />) : <Typography>No skills added.</Typography>}
        </Stack>

        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" fontWeight={800}>
          Selected Work
        </Typography>
        {projects.length ? (
          projects.map((project, i) => (
            <Box key={i} sx={{ mt: 2 }}>
              <Typography fontWeight={800}>{project.title || "Untitled Project"}</Typography>
              <Typography color="text.secondary">{projectText(project)}</Typography>
              {project.link && <a href={project.link}>View project</a>}
            </Box>
          ))
        ) : (
          <Typography>No projects added.</Typography>
        )}

        {experience.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" fontWeight={800}>
              Experience
            </Typography>
            {experience.map((item, i) => (
              <Typography key={i} sx={{ mt: 1 }}>
                {[item.role, item.company, item.duration].filter(Boolean).join(" - ")}
              </Typography>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
