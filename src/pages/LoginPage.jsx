import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Link,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { loginApi } from "../api";
import { useNavigate } from "react-router-dom";
import AnimatedBackdrop from "../components/AnimatedBackdrop";
import LoginImg from "../assets/login_illustration.svg"; // ✅ Add an SVG here

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await loginApi(form.email, form.password);
      if (res.token) {
        localStorage.setItem("token", res.token);
        alert("Login successful!");
        navigate("/builder");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedBackdrop compact>
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        sx={{
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
          width: "100%",
          maxWidth: 900,
          border: "1px solid rgba(33,150,243,0.12)",
        }}
      >
        {/* Left Image Section */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 24,
              border: "1px solid rgba(25,118,210,0.18)",
              borderRadius: 3,
            },
          }}
        >
          <motion.img
            src={LoginImg}
            alt="Login Illustration"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ width: "100%", maxWidth: 350 }}
          />
        </Box>

        {/* Right Form Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            flex: 1,
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Log in to access your portfolio dashboard.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3, borderRadius: 2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <Typography sx={{ mt: 3, textAlign: "center" }}>
            Don't have an account?{" "}
            <Link component="button" onClick={() => navigate("/signup")}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
    </AnimatedBackdrop>
  );
}
