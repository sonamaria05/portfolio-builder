import React from "react";
import { Box, Typography, Divider, Chip, Stack } from "@mui/material";

const projectText = (project) => project?.desc || project?.description || "";

export default function TemplateTimeline({ data = {} }) {
  const projects = (data.projects || []).filter((item) => item.title || projectText(item) || item.link);
  const experience = (data.experience || []).filter((item) => item.company || item.role || item.duration);
  const education = (data.education || []).filter((item) => item.institution || item.degree || item.year);
  const skills = (data.skills || []).filter(Boolean);

  const timelineItems = [
    ...experience.map((item) => ({
      title: item.role || "Experience",
      meta: [item.company, item.duration].filter(Boolean).join(" - "),
      body: "Professional experience",
    })),
    ...education.map((item) => ({
      title: item.degree || "Education",
      meta: [item.institution, item.year].filter(Boolean).join(" - "),
      body: "Education",
    })),
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#fff", borderLeft: "6px solid #1976d2" }}>
      <Typography variant="h3" fontWeight={900}>
        {data.name || "Your Name"}
      </Typography>
      <Typography variant="h6" color="primary">
        {data.title || "Professional Title"}
      </Typography>
      <Typography color="text.secondary">{data.email || "you@example.com"}</Typography>
      <Typography sx={{ mt: 2, lineHeight: 1.8 }}>{data.about || "Add a concise professional summary."}</Typography>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" fontWeight={900}>
        Timeline
      </Typography>
      {timelineItems.length ? (
        timelineItems.map((item, i) => (
          <Box key={i} sx={{ position: "relative", pl: 3, mt: 2, borderLeft: "2px solid #bbdefb" }}>
            <Box sx={{ position: "absolute", left: -7, top: 4, width: 12, height: 12, borderRadius: "50%", bgcolor: "primary.main" }} />
            <Typography fontWeight={900}>{item.title}</Typography>
            <Typography color="text.secondary">{item.meta}</Typography>
          </Box>
        ))
      ) : (
        <Typography sx={{ mt: 1 }}>Add experience or education to build your timeline.</Typography>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" fontWeight={900}>
        Projects
      </Typography>
      {projects.map((project, i) => (
        <Box key={i} sx={{ mt: 1.5 }}>
          <Typography fontWeight={800}>{project.title || "Untitled Project"}</Typography>
          <Typography color="text.secondary">{projectText(project)}</Typography>
        </Box>
      ))}

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mt: 3 }}>
        {skills.map((skill, i) => (
          <Chip key={i} label={skill} size="small" />
        ))}
      </Stack>
    </Box>
  );
}
