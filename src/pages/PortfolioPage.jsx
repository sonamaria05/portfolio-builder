import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";
import { getPublishedPortfolioApi } from "../api";
import LivePreview from "../components/LivePreview";

export default function PortfolioPage() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPublishedPortfolioApi(slug);
        setPortfolio(res.portfolio || null);
      } catch {
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Paper sx={{ p: 3 }}>
        {loading && <Typography>Loading portfolio...</Typography>}
        {!loading && portfolio && <LivePreview data={portfolio} showDownload={false} />}
        {!loading && !portfolio && <Typography>Portfolio not found.</Typography>}
      </Paper>
    </Container>
  );
}
