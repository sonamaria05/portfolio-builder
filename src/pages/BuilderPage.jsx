import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import PortfolioForm from "../components/PortfolioForm";
import LivePreview from "../components/LivePreview";

// Mock APIs
const savePortfolioApi = async (payload) => {
  console.log("Saving portfolio:", payload);
  await new Promise((r) => setTimeout(r, 800));
  return { success: true };
};

export default function BuilderPage() {
  const [data, setData] = useState({
    name: "",
    about: "",
    skills: "",
    font: "Poppins",
    theme: "light",
    template: "Modern",
  });
  const [preview, setPreview] = useState(false);

  // Equal height sync
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);

  useEffect(() => {
    if (leftBoxRef.current && rightBoxRef.current) {
      const leftHeight = leftBoxRef.current.offsetHeight;
      rightBoxRef.current.style.minHeight = `${leftHeight}px`;
    }
  }, [preview, data]);

  // Save
  const handleSave = async () => {
    try {
      const payload = {
        ...data,
        template: data.template || "Modern",
        font: data.font || "Poppins",
        theme: data.theme || "light",
      };
      await savePortfolioApi(payload);
      alert("✅ Saved successfully!");
      setPreview(true);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving portfolio");
    }
  };

  // ✅ Simple Publish — creates fake link, copies & opens it
  const handlePublish = async () => {
    try {
      const payload = {
        ...data,
        template: data.template || "Modern",
        font: data.font || "Poppins",
        theme: data.theme || "light",
      };

      // Create fake portfolio URL
      const fakeUrl = `https://my-portfolio-demo.com/${encodeURIComponent(
        data.name || "user"
      )}-${Date.now()}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(fakeUrl);

      // Show popup message
      alert(`🌐 Portfolio published!\n\nLink copied to clipboard:\n${fakeUrl}`);

      // Open in new tab
      window.open(fakeUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("❌ Error publishing portfolio");
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          ✨ Portfolio Builder
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 1, mb: 3 }}>
          Fill your details, preview live, and publish your stunning portfolio.
        </Typography>
      </motion.div>

      {/* Font/Theme/Template Controls */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.paper",
          p: 2,
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Font Style</InputLabel>
          <Select
            value={data.font}
            label="Font Style"
            onChange={(e) => setData({ ...data, font: e.target.value })}
          >
            <MenuItem value="Poppins">Poppins</MenuItem>
            <MenuItem value="Roboto">Roboto</MenuItem>
            <MenuItem value="Lora">Lora</MenuItem>
            <MenuItem value="Montserrat">Montserrat</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Theme</InputLabel>
          <Select
            value={data.theme}
            label="Theme"
            onChange={(e) => setData({ ...data, theme: e.target.value })}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Template</InputLabel>
          <Select
            value={data.template}
            label="Template"
            onChange={(e) => setData({ ...data, template: e.target.value })}
          >
            <MenuItem value="Modern">Modern</MenuItem>
            <MenuItem value="Classic">Classic</MenuItem>
            <MenuItem value="Elegant">Elegant</MenuItem>
            <MenuItem value="Creative">Creative</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Builder Area */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {/* Left Side */}
        <Paper
          ref={leftBoxRef}
          elevation={6}
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 3,
            minWidth: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: "background.paper",
          }}
        >
          <PortfolioForm
            data={data}
            setData={setData}
            onSave={handleSave}
            onPublish={handlePublish}
          />

          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSave}>
              Save & Preview
            </Button>
            <Button fullWidth variant="outlined" color="success" onClick={handlePublish}>
              Publish Online
            </Button>
          </Box>
        </Paper>

        {/* Right Side - Live Preview */}
        {preview && (
          <Paper
            ref={rightBoxRef}
            component={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            elevation={6}
            sx={{
              flex: 1.2,
              p: 3,
              borderRadius: 3,
              overflowY: "auto",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #1e1e1e, #2c2c2c)"
                  : "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
              👀 Live Preview
            </Typography>
            <LivePreview data={data} />
          </Paper>
        )}
      </Box>
    </Container>
  );
}
