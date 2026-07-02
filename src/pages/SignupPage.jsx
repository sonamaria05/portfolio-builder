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
import { signupApi } from "../api";
import { useNavigate } from "react-router-dom";
import AnimatedBackdrop from "../components/AnimatedBackdrop";
import SignupImg from "../assets/signup_illustration.svg"; // ✅ Add this SVG (see below)

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await signupApi(form.username, form.email, form.password);
      alert(res.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
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
        {/* Left side image */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #e8f5e9, #e3f2fd)",
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
            src={SignupImg}
            alt="Signup Illustration"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ width: "100%", maxWidth: 350 }}
          />
        </Box>

        {/* Right side form */}
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
            Create Account
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Join us and start building your professional portfolio today!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
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
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <Typography sx={{ mt: 3, textAlign: "center" }}>
            Already have an account?{" "}
            <Link component="button" onClick={() => navigate("/login")}>
              Log In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
    </AnimatedBackdrop>
  );
}
