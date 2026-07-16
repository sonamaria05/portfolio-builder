import React, { useRef, useEffect } from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DownloadIcon from "@mui/icons-material/Download";

import TemplateModern from "./templates/TemplateModern";
import TemplateMinimal from "./templates/TemplateMinimal";
import TemplateGradient from "./templates/TemplateGradient";
import TemplateClassic from "./templates/TemplateClassic";
import TemplateElegant from "./templates/TemplateElegant";
import TemplateBold from "./templates/TemplateBold";
import TemplateExecutive from "./templates/TemplateExecutive";
import TemplateShowcase from "./templates/TemplateShowcase";
import TemplateTimeline from "./templates/TemplateTimeline";

export default function LivePreview({ data, showDownload = true }) {
  const previewRef = useRef();

  useEffect(() => {
    if (!data?.font) return undefined;

    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${data.font.replace(/\s+/g, "+")}:wght@400;600;700&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [data?.font]);

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.name || "portfolio"}.pdf`);
  };

  const renderTemplate = () => {
    switch (data.template) {
      case "TemplateMinimal":
        return <TemplateMinimal data={data} />;
      case "TemplateGradient":
        return <TemplateGradient data={data} />;
      case "TemplateClassic":
        return <TemplateClassic data={data} />;
      case "TemplateElegant":
        return <TemplateElegant data={data} />;
      case "TemplateBold":
        return <TemplateBold data={data} />;
      case "TemplateExecutive":
        return <TemplateExecutive data={data} />;
      case "TemplateShowcase":
        return <TemplateShowcase data={data} />;
      case "TemplateTimeline":
        return <TemplateTimeline data={data} />;
      default:
        return <TemplateModern data={data} />;
    }
  };

  if (!data || !data.name) {
    return (
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          mt: 8,
          textAlign: "center",
          width: "100%",
          p: 3,
          border: "2px dashed #ccc",
          borderRadius: 3,
        }}
      >
        Fill details and click Save & Preview to see your portfolio here.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Paper
        ref={previewRef}
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: 800,
          fontFamily: data.font || "Poppins",
          bgcolor: data.theme === "dark" ? "#121212" : "#f5f7fa",
          color: data.theme === "dark" ? "#fff" : "#000",
          boxShadow: 3,
          transition: "all 0.3s ease",
          border: "1px solid rgba(25,118,210,0.12)",
        }}
      >
        {renderTemplate()}
      </Paper>

      {showDownload && (
        <Button variant="contained" startIcon={<DownloadIcon />} color="secondary" onClick={handleDownloadPDF} sx={{ borderRadius: 2 }}>
          Download as PDF
        </Button>
      )}
    </Box>
  );
}
