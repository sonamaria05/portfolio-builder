import React from "react";
import { Box } from "@mui/material";

export default function AnimatedBackdrop({ children, compact = false }) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: compact ? "auto" : "calc(100vh - 140px)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0.55,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(33, 150, 243, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(33, 150, 243, 0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          animation: "gridDrift 18s linear infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: "auto 0 0 0",
          height: 180,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(33, 150, 243, 0.08) 55%, rgba(33, 203, 243, 0.12) 100%)",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
}
