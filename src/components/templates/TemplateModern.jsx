import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function TemplateModern({ data = {} }) {
  return (
    <Box sx={{ p: 4, textAlign: "left" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {data?.name || "Your Name"}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {data?.email || "you@example.com"}
      </Typography>

      <Typography sx={{ mt: 3 }}>{data?.about || "Tell us about yourself..."}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      {data?.projects?.length ? (
        data.projects.map((p, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography variant="h6">{p?.title}</Typography>
            <Typography color="text.secondary">{p?.description}</Typography>
            {p?.link && (
              <Typography>
                🔗 <a href={p.link} target="_blank" rel="noreferrer">{p.link}</a>
              </Typography>
            )}
          </Box>
        ))
      ) : (
        <Typography>No projects added.</Typography>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">Skills</Typography>
      <Typography>{data?.skills?.join(", ") || "No skills yet."}</Typography>
    </Box>
  );
}
