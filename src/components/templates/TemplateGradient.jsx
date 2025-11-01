import React from "react";
import { Box, Typography } from "@mui/material";

export default function TemplateGradient({ data = {} }) {
  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 3,
        background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        color: "#000",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        {data?.name || "Your Name"}
      </Typography>
      <Typography variant="subtitle1">{data?.email || "Email here"}</Typography>

      <Typography sx={{ mt: 2 }}>{data?.about || "Add your bio..."}</Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">🚀 Projects</Typography>
        {data?.projects?.length ? (
          data.projects.map((p, i) => (
            <Box key={i} sx={{ mt: 1 }}>
              <Typography fontWeight="500">{p?.title}</Typography>
              <Typography>{p?.description}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No projects yet.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">🎯 Skills</Typography>
        <Typography>{data?.skills?.join(", ") || "Add some"}</Typography>
      </Box>
    </Box>
  );
}
