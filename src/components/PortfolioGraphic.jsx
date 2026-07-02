import React from "react";
import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import { AutoAwesome, Code, RocketLaunch, WorkspacePremium } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export default function PortfolioGraphic() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 520,
        minHeight: 420,
        display: "grid",
        placeItems: "center",
      }}
    >
      <MotionPaper
        elevation={10}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          width: "74%",
          p: 3,
          borderRadius: 4,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(33,150,243,0.18)",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <WorkspacePremium color="primary" />
          <Typography fontWeight={800}>Portfolio</Typography>
        </Stack>
        <Box sx={{ height: 12, width: "72%", borderRadius: 10, bgcolor: "#1976d2", mb: 1.5 }} />
        <Box sx={{ height: 9, width: "92%", borderRadius: 10, bgcolor: "#d8eefc", mb: 1 }} />
        <Box sx={{ height: 9, width: "82%", borderRadius: 10, bgcolor: "#d8eefc", mb: 2.5 }} />
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {["React", "Design", "API"].map((label) => (
            <Chip key={label} label={label} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>
      </MotionPaper>

      {[
        { icon: <Code />, label: "Build", top: 34, left: 0, delay: 0 },
        { icon: <AutoAwesome />, label: "Style", top: 6, right: 22, delay: 0.4 },
        { icon: <RocketLaunch />, label: "Publish", bottom: 34, right: 0, delay: 0.8 },
      ].map((item) => (
        <MotionPaper
          key={item.label}
          elevation={6}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
          sx={{
            position: "absolute",
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            p: 1.5,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
            background: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(33,150,243,0.16)",
          }}
        >
          {item.icon}
          <Typography fontWeight={700}>{item.label}</Typography>
        </MotionPaper>
      ))}
    </Box>
  );
}
