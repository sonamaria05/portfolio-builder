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
  Alert,
  Link,
  Chip,
  Stack,
} from "@mui/material";
import { AutoAwesome, CloudDone, DashboardCustomize, Timeline, Tune, Workspaces } from "@mui/icons-material";
import { motion } from "framer-motion";
import PortfolioForm from "../components/PortfolioForm";
import LivePreview from "../components/LivePreview";
import { getMyPortfolioApi, publishPortfolioApi, savePortfolioApi } from "../api";
import AnimatedBackdrop from "../components/AnimatedBackdrop";

const defaultData = {
  name: "",
  title: "",
  email: "",
  about: "",
  skills: [""],
  projects: [{ title: "", desc: "", link: "" }],
  experience: [{ company: "", role: "", duration: "" }],
  education: [{ institution: "", degree: "", year: "" }],
  font: "Poppins",
  theme: "light",
  template: "TemplateModern",
};

const appBasePath = process.env.PUBLIC_URL || "";

const templateCards = [
  { value: "TemplateModern", label: "Modern", icon: <DashboardCustomize />, note: "Balanced profile and project layout." },
  { value: "TemplateExecutive", label: "Executive", icon: <Workspaces />, note: "Boardroom-ready summary style." },
  { value: "TemplateShowcase", label: "Showcase", icon: <AutoAwesome />, note: "Project-first visual portfolio." },
  { value: "TemplateTimeline", label: "Timeline", icon: <Timeline />, note: "Experience-led career story." },
];

export default function BuilderPage() {
  const [data, setData] = useState(defaultData);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("token")) return;
      try {
        const res = await getMyPortfolioApi();
        if (res.portfolio) {
          setData({ ...defaultData, ...res.portfolio });
          setPreview(true);
          if (res.portfolio.slug) {
            setPublishedUrl(`${window.location.origin}${appBasePath}/portfolio/${res.portfolio.slug}`);
          }
        }
      } catch {
        setMessage("Log in to save and publish your portfolio.");
      }
    })();
  }, []);

  useEffect(() => {
    if (leftBoxRef.current && rightBoxRef.current) {
      rightBoxRef.current.style.minHeight = `${leftBoxRef.current.offsetHeight}px`;
    }
  }, [preview, data]);

  const handleSave = async (portfolioData = data) => {
    setIsSaving(true);
    try {
      const res = await savePortfolioApi(portfolioData);
      setData({ ...defaultData, ...res.portfolio });
      setPreview(true);
      setMessage("Portfolio saved successfully.");
      return res.portfolio;
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving portfolio.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (portfolioData = data) => {
    setIsPublishing(true);
    try {
      const res = await publishPortfolioApi(portfolioData);
      const absoluteUrl = `${window.location.origin}${appBasePath}${res.url}`;
      setData({ ...defaultData, ...res.portfolio });
      setPublishedUrl(absoluteUrl);
      setPreview(true);
      try {
        await navigator.clipboard?.writeText(absoluteUrl);
        setMessage("Portfolio published. The link has been copied to your clipboard.");
      } catch {
        setMessage("Portfolio published. Use the link below to open or copy it.");
      }
      window.open(absoluteUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error publishing portfolio.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <AnimatedBackdrop compact>
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
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          <Chip icon={<AutoAwesome />} label="Design" color="primary" variant="outlined" />
          <Chip icon={<Tune />} label="Customize" color="primary" variant="outlined" />
          <Chip icon={<CloudDone />} label="Publish" color="primary" variant="outlined" />
        </Stack>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          Portfolio Builder
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 1, mb: 3 }}>
          Fill your details, preview live, and publish your portfolio.
        </Typography>
      </motion.div>

      {message && (
        <Alert severity={message.toLowerCase().includes("error") ? "error" : "info"} sx={{ width: "100%", maxWidth: 900 }}>
          {message}
          {publishedUrl && (
            <>
              {" "}
              <Link href={publishedUrl} target="_blank" rel="noreferrer">
                Open published portfolio
              </Link>
            </>
          )}
        </Alert>
      )}

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
          <Select value={data.font} label="Font Style" onChange={(e) => setData({ ...data, font: e.target.value })}>
            <MenuItem value="Poppins">Poppins</MenuItem>
            <MenuItem value="Roboto">Roboto</MenuItem>
            <MenuItem value="Lora">Lora</MenuItem>
            <MenuItem value="Montserrat">Montserrat</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Theme</InputLabel>
          <Select value={data.theme} label="Theme" onChange={(e) => setData({ ...data, theme: e.target.value })}>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Template</InputLabel>
          <Select value={data.template} label="Template" onChange={(e) => setData({ ...data, template: e.target.value })}>
            <MenuItem value="TemplateModern">Modern</MenuItem>
            <MenuItem value="TemplateExecutive">Executive</MenuItem>
            <MenuItem value="TemplateShowcase">Showcase</MenuItem>
            <MenuItem value="TemplateTimeline">Timeline</MenuItem>
            <MenuItem value="TemplateMinimal">Minimal</MenuItem>
            <MenuItem value="TemplateGradient">Gradient</MenuItem>
            <MenuItem value="TemplateClassic">Classic</MenuItem>
            <MenuItem value="TemplateElegant">Elegant</MenuItem>
            <MenuItem value="TemplateBold">Bold</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {templateCards.map((template) => {
          const selected = data.template === template.value;
          return (
            <Paper
              key={template.value}
              component={motion.button}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setData({ ...data, template: template.value })}
              sx={{
                textAlign: "left",
                p: 2,
                borderRadius: 2,
                border: selected ? "2px solid #1976d2" : "1px solid rgba(33,150,243,0.16)",
                bgcolor: selected ? "rgba(25,118,210,0.08)" : "rgba(255,255,255,0.82)",
                cursor: "pointer",
                color: "text.primary",
                font: "inherit",
              }}
            >
              <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
                <Box sx={{ color: selected ? "primary.main" : "text.secondary", display: "flex" }}>{template.icon}</Box>
                <Typography fontWeight={800}>{template.label}</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {template.note}
              </Typography>
            </Paper>
          );
        })}
      </Box>

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
        <Paper
          ref={leftBoxRef}
          elevation={6}
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 3,
            minWidth: { xs: "100%", md: 400 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(33,150,243,0.12)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: "linear-gradient(90deg, #1976d2, #00acc1, #66bb6a)",
            },
          }}
        >
          <PortfolioForm data={data} setData={setData} />

          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button fullWidth variant="contained" color="primary" onClick={() => handleSave()} disabled={isSaving || isPublishing}>
              {isSaving ? "Saving..." : "Save & Preview"}
            </Button>
            <Button fullWidth variant="outlined" color="success" onClick={() => handlePublish()} disabled={isSaving || isPublishing}>
              {isPublishing ? "Publishing..." : "Publish Online"}
            </Button>
          </Box>
        </Paper>

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
              Live Preview
            </Typography>
            <LivePreview data={data} />
          </Paper>
        )}
      </Box>
      </Container>
    </AnimatedBackdrop>
  );
}
