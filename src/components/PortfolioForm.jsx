import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Divider,
  Box,
  Grid,
  IconButton,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function PortfolioForm({ data, setData, onSave, onPublish }) {
  const theme = useTheme();

  const [form, setForm] = useState({
    name: data.name || "",
    title: data.title || "",
    about: data.about || "",
    skills: data.skills || [""],
    projects: data.projects || [{ title: "", desc: "" }],
    experience: data.experience || [{ company: "", role: "", duration: "" }],
    education: data.education || [{ institution: "", degree: "", year: "" }],
    template: data.template || "TemplateModern",
    font: data.font || "Poppins",
    theme: data.theme || "light",
  });

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setData(updated);
  };

  const handleArrayChange = (array, index, field, value) => {
    const updated = [...form[array]];
    if (typeof updated[index] === "object" && field) updated[index][field] = value;
    else updated[index] = value;
    const newForm = { ...form, [array]: updated };
    setForm(newForm);
    setData(newForm);
  };

  const handleAddItem = (array, template) => {
    const updated = { ...form, [array]: [...form[array], template] };
    setForm(updated);
    setData(updated);
  };

  const handleRemoveItem = (array, index) => {
    const updated = [...form[array]];
    updated.splice(index, 1);
    const newForm = { ...form, [array]: updated };
    setForm(newForm);
    setData(newForm);
  };

  const handleSubmit = () => {
    setData(form);
    onSave();
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🧩 Portfolio Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Basic Info */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            variant="outlined"
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Professional Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            variant="outlined"
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="About You"
            value={form.about}
            onChange={(e) => handleChange("about", e.target.value)}
            variant="outlined"
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
        </Grid>
      </Grid>

      {/* Font, Theme, Template */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {[
          {
            label: "Font Style",
            field: "font",
            options: ["Poppins", "Roboto", "Lora", "Montserrat"],
          },
          {
            label: "Theme",
            field: "theme",
            options: ["light", "dark"],
          },
          {
            label: "Template",
            field: "template",
            options: [
              "TemplateModern",
              "TemplateMinimal",
              "TemplateGradient",
              "TemplateClassic",
              "TemplateElegant",
              "TemplateBold",
            ],
          },
        ].map((select) => (
          <Grid item xs={12} sm={4} key={select.field}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                minHeight: "70px",
                "& .MuiInputLabel-root": {
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                },
                "& .MuiOutlinedInput-root": {
                  height: "56px",
                },
              }}
            >
              <InputLabel shrink>{select.label}</InputLabel>
              <Select
                value={form[select.field]}
                onChange={(e) => handleChange(select.field, e.target.value)}
                label={select.label}
                sx={{
                  height: "56px",
                  fontSize: "1rem",
                  bgcolor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                {select.options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt.replace("Template", "")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>

      {/* Dynamic sections */}
      {[
        { title: "💡 Skills", key: "skills", template: "" },
        { title: "🚀 Projects", key: "projects", template: { title: "", desc: "" } },
        {
          title: "🏢 Experience",
          key: "experience",
          template: { company: "", role: "", duration: "" },
        },
        {
          title: "🎓 Education",
          key: "education",
          template: { institution: "", degree: "", year: "" },
        },
      ].map((section, idx) => (
        <Box key={idx} sx={{ mt: 4 }}>
          <Typography variant="h6">{section.title}</Typography>

          {form[section.key].map((item, i) => (
            <Box key={i} sx={{ mt: 1 }}>
              {typeof item === "object" ? (
                <Grid container spacing={2} alignItems="center">
                  {Object.keys(item).map((field, j) => (
                    <Grid item xs={Object.keys(item).length === 2 ? 6 : 4} key={j}>
                      <TextField
                        fullWidth
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={item[field]}
                        onChange={(e) =>
                          handleArrayChange(section.key, i, field, e.target.value)
                        }
                        variant="outlined"
                        InputLabelProps={{
                          style: { color: theme.palette.text.secondary },
                        }}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(section.key, i)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ) : (
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <TextField
                    fullWidth
                    label={`Skill #${i + 1}`}
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(section.key, i, null, e.target.value)
                    }
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: theme.palette.text.secondary },
                    }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(section.key, i)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddCircle />}
            onClick={() => handleAddItem(section.key, section.template)}
            sx={{ mt: 1 }}
          >
            Add {section.key.charAt(0).toUpperCase() + section.key.slice(1)}
          </Button>
        </Box>
      ))}

      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button variant="contained" color="primary" sx={{ flex: 1 }} onClick={handleSubmit}>
          💾 Save
        </Button>
        <Button
          variant="outlined"
          color="success"
          sx={{ flex: 1 }}
          onClick={() => {
            setData(form);
            onPublish();
          }}
        >
          🌐 Publish
        </Button>
      </Box>
    </Paper>
  );
}
