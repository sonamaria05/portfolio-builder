import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getByUsername } from '../api';
import Navbar from '../components/Navbar';
import PortfolioPreview from '../components/PortfolioPreview';
import { Container, Paper } from '@mui/material';

export default function PortfolioPage(){
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(()=> {
    (async ()=> {
      const res = await getByUsername(username);
      if(res.portfolio) setPortfolio(res.portfolio);
      else setPortfolio(null);
    })();
  }, [username]);

  return (
    <>
      <Navbar />
      <Container sx={{mt:4}}>
        <Paper sx={{p:3}}>
          {portfolio ? <PortfolioPreview portfolio={portfolio} /> : <div>Not found</div>}
        </Paper>
      </Container>
    </>
  );
}
