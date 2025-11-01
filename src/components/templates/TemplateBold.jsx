import React from "react";
import { Box, Typography } from "@mui/material";

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
        {data?.name || "Your Name"}
      </Typography>
      <Typography variant="subtitle1" color="#ccc">
        {data?.email || "Email address"}
      </Typography>

      <Typography sx={{ mt: 2, color: "#ddd" }}>
        {data?.about || "Describe yourself confidently..."}
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" color="secondary">
          Projects
        </Typography>
        {data?.projects?.length ? (
          data.projects.map((p, i) => (
            <Box key={i} sx={{ mt: 1 }}>
              <Typography fontWeight="bold">{p?.title}</Typography>
              <Typography>{p?.description}</Typography>
              {p?.link && (
                <a href={p.link} target="_blank" rel="noreferrer" style={{ color: "#90caf9" }}>
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
        <Typography>{data?.skills?.join(", ") || "No skills yet."}</Typography>
      </Box>
    </Box>
  );
}
