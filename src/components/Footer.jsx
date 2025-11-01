import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ textAlign: "center", py: 2, mt: 4, bgcolor: "#f0f0f0" }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Portfolio Builder | Built with ❤️ using React + MUI
      </Typography>
    </Box>
  );
}
