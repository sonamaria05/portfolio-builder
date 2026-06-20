import React, { useEffect, useState } from "react";
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

const emptyForm = {
  name: "",
  title: "",
  email: "",
  about: "",
  skills: [""],
  projects: [{ title: "", desc: "", link: "" }],
  experience: [{ company: "", role: "", duration: "" }],
  education: [{ institution: "", degree: "", year: "" }],
  template: "TemplateModern",
  font: "Poppins",
  theme: "light",
};

export default function PortfolioForm({ data, setData, onSave, onPublish }) {
  const theme = useTheme();
  const [form, setForm] = useState({ ...emptyForm, ...data });

  useEffect(() => {
    setForm({ ...emptyForm, ...data });
  }, [data]);

  const updateForm = (updated) => {
    setForm(updated);
    setData(updated);
  };

  const handleChange = (field, value) => {
    updateForm({ ...form, [field]: value });
  };

  const handleArrayChange = (array, index, field, value) => {
    const updated = [...form[array]];
    if (typeof updated[index] === "object" && field) updated[index][field] = value;
    else updated[index] = value;
    updateForm({ ...form, [array]: updated });
  };

  const handleAddItem = (array, template) => {
    updateForm({ ...form, [array]: [...form[array], template] });
  };

  const handleRemoveItem = (array, index) => {
    const updated = [...form[array]];
    updated.splice(index, 1);
    updateForm({ ...form, [array]: updated.length ? updated : [emptyForm[array][0]] });
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
        Portfolio Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Full Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Professional Title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="About You"
            value={form.about}
            onChange={(e) => handleChange("about", e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {[
          { label: "Font Style", field: "font", options: ["Poppins", "Roboto", "Lora", "Montserrat"] },
          { label: "Theme", field: "theme", options: ["light", "dark"] },
          {
            label: "Template",
            field: "template",
            options: ["TemplateModern", "TemplateMinimal", "TemplateGradient", "TemplateClassic", "TemplateElegant", "TemplateBold"],
          },
        ].map((select) => (
          <Grid item xs={12} sm={4} key={select.field}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{select.label}</InputLabel>
              <Select value={form[select.field]} onChange={(e) => handleChange(select.field, e.target.value)} label={select.label}>
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

      {[
        { title: "Skills", key: "skills", template: "" },
        { title: "Projects", key: "projects", template: { title: "", desc: "", link: "" } },
        { title: "Experience", key: "experience", template: { company: "", role: "", duration: "" } },
        { title: "Education", key: "education", template: { institution: "", degree: "", year: "" } },
      ].map((section) => (
        <Box key={section.key} sx={{ mt: 4 }}>
          <Typography variant="h6">{section.title}</Typography>

          {form[section.key].map((item, i) => (
            <Box key={i} sx={{ mt: 1 }}>
              {typeof item === "object" ? (
                <Grid container spacing={2} alignItems="center">
                  {Object.keys(item).map((field) => (
                    <Grid item xs={12} sm={field === "link" ? 12 : 4} key={field}>
                      <TextField
                        fullWidth
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={item[field]}
                        onChange={(e) => handleArrayChange(section.key, i, field, e.target.value)}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={1}>
                    <IconButton color="error" onClick={() => handleRemoveItem(section.key, i)} aria-label={`Remove ${section.title}`}>
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
                    onChange={(e) => handleArrayChange(section.key, i, null, e.target.value)}
                  />
                  <IconButton color="error" onClick={() => handleRemoveItem(section.key, i)} aria-label="Remove skill">
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))}
          <Button startIcon={<AddCircle />} onClick={() => handleAddItem(section.key, section.template)} sx={{ mt: 1 }}>
            Add {section.title}
          </Button>
        </Box>
      ))}

      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button variant="contained" color="primary" sx={{ flex: 1 }} onClick={() => onSave(form)}>
          Save
        </Button>
        <Button variant="outlined" color="success" sx={{ flex: 1 }} onClick={() => onPublish(form)}>
          Publish
        </Button>
      </Box>
    </Paper>
  );
}
