'use client';
import theme from '@/app/theme';
import { Avatar, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { getUserInfo } from '../prisma/getData';
import React, { useState, useEffect } from 'react';

export default function OwnProfile() {
  const { data: session, status } = useSession();
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  useEffect(() => {
  const fetchCreatedAt = async () => {
    if (session?.user.name) {
      const { createdAt } = await getUserInfo(session.user.name);
      if (createdAt) {
        setCreatedAt(new Date(createdAt).toLocaleDateString());
      }
    }
  };
  fetchCreatedAt();
}, [session?.user.name]);

  if (status === "authenticated") {
    return (
      <>
        <Box sx={{ position: 'relative', width: `calc(100% - ${theme.spacing(7)})`, height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', ml: theme.spacing(7) }}>
          <Paper sx={{ width: '100%', height: '100%' }} elevation={0}>
            <Avatar src={session.user.image} sx={{ position: 'absolute', top: '95%', left: '50%', transform: 'translate(-50%, -50%)', width: '20vh', height: '20vh', borderRadius: '50%' }} />
          </Paper>
        </Box>
        <Box sx={{ width: `calc(100% - ${theme.spacing(7)})`, flexDirection: 'column', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', ml: theme.spacing(7) }}>
          <Typography variant='h2'>{session.user.name}</Typography>
          <Typography>Account created: {createdAt}</Typography>
        </Box>
      </>
    );
  }
  return null;
}

