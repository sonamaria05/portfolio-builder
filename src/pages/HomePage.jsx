import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedBackdrop from "../components/AnimatedBackdrop";
import PortfolioImg from "../assets/portfolio_hero.svg"; // 👈 Add any SVG or PNG image inside /src/assets

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <AnimatedBackdrop>
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { xs: "column-reverse", md: "row" },
        py: 8,
      }}
    >
      {/* Left Side - Text Content */}
      <Box
        component={motion.div}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{ textAlign: { xs: "center", md: "left" }, mt: { xs: 6, md: 0 } }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #2196f3, #21cbf3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Build Your Portfolio
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mt: 2, maxWidth: 500 }}
        >
          Create a stunning professional portfolio in just a few clicks. Choose
          templates, customize, and publish your online presence instantly.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: { xs: "center", md: "flex-start" } }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(45deg, #2196f3, #21cbf3)",
              "&:hover": { background: "linear-gradient(45deg, #1e88e5, #1ec8f3)" },
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                width: "60%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                animation: "sheen 2.8s ease-in-out infinite",
              },
            }}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              borderColor: "#21cbf3",
              color: "#21cbf3",
              bgcolor: "rgba(255,255,255,0.72)",
              "&:hover": { borderColor: "#1e88e5", color: "#1e88e5" },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Stack>
      </Box>

      {/* Right Side - Hero Image */}
      <Box
        component={motion.div}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          width: { xs: "80%", md: "45%" },
          display: "flex",
          justifyContent: "center",
          position: "relative",
          p: 3,
          borderRadius: 4,
          background: "linear-gradient(135deg, rgba(227,242,253,0.9), rgba(232,245,233,0.85))",
          border: "1px solid rgba(33,150,243,0.12)",
          boxShadow: "0 24px 70px rgba(25,118,210,0.16)",
        }}
      >
        <motion.img
          src={PortfolioImg}
          alt="Portfolio Builder Illustration"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "100%", maxWidth: "500px" }}
        />
      </Box>
    </Container>
    </AnimatedBackdrop>
  );
}
