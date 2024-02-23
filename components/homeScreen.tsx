"use client";
import { Box, Button, Container, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <Container>
      <Box sx={{ height: '70vh', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{ gap: '2vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography sx={{fontSize: {xs:'4vh' , sm: '6vh'}}}>Welcome to <b>Contact Directory</b></Typography>
        <Typography sx={{fontSize: {xs:'2vh' , sm: '4vh'}}}>Join our page today and start making meaningful connections effortlessly. The world is full of amazing people waiting to be discovered, and our directory is your key to finding them.</Typography>
        <Button sx={{fontSize: '2vh'}} variant="contained" onClick={() => router.push('/register')} color="success">Register</Button>
        </Box>
      </Box>
    </Container>
  )
}
