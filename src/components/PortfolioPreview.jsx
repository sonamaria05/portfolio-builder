import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

function TemplateModern({p}){
  return (
    <Card sx={{minHeight:250}}>
      <CardContent>
        <Typography variant="h4" color="primary">{p.name||'Your Name'}</Typography>
        <Typography sx={{mb:1}}>{p.about||'About you...'}</Typography>
        <Stack direction="row" spacing={1} sx={{flexWrap:'wrap', mb:1}}>
          {(p.skills||[]).map((s,i)=><Chip key={i} label={s} />)}
        </Stack>
        <Typography variant="h6">Projects</Typography>
        <ul>{(p.projects||[]).map((pr,i)=><li key={i}>{pr.title}</li>)}</ul>
      </CardContent>
    </Card>
  );
}

function TemplateMinimal({p}){
  return (
    <div style={{padding:16}}>
      <h2>{p.name||'Your Name'}</h2>
      <p>{p.about||'About you...'}</p>
    </div>
  );
}

function TemplateClassic({p}){
  return (
    <div style={{padding:16, background:'#fff7e6'}}>
      <h3>{p.name||'Your Name'}</h3>
      <p>{p.about||'About you...'}</p>
    </div>
  );
}

export default function PortfolioPreview({ portfolio }){
  if(!portfolio) return <div>Live preview will appear here.</div>;
  if(portfolio.template === 'minimal') return <TemplateMinimal p={portfolio} />;
  if(portfolio.template === 'classic') return <TemplateClassic p={portfolio} />;
  return <TemplateModern p={portfolio} />;
}
