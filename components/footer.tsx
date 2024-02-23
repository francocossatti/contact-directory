"use client";
import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import theme from '@/app/theme';

export default function Footer() {
  return (
    <Box sx={{ width: '100vw', minHeight: '7vh', position: 'absolute', bottom: 0, alignItems: 'center', boxShadow: '3', backgroundColor: theme.palette.background.default}} >
          <Container maxWidth={false} disableGutters={true}>
        <Grid container alignItems="center" sx={{display: 'flex', height: '7vh', alignItems: 'center'}}>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ marginLeft: '2vw', fontSize: '2vh' }}>
              © 2024 Franco Cossatti
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
          <IconButton color="inherit" onClick={event => window.location.href='https://github.com/francocossatti'}>
            <GitHubIcon sx={{fontSize: '4vh'}}/>
          </IconButton>
            <IconButton color="inherit" onClick={event =>  window.location.href='https://www.linkedin.com/in/franco-cossatti/'}>
              <LinkedInIcon sx={{fontSize: '4vh'}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};