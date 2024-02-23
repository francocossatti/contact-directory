'use client';
import theme from '@/app/theme';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function DashboardHome() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: theme.spacing(7), alignItems: 'center', height: '100vh' }}>
                    <Typography variant='h1' sx={{ fontSize: 'calc(4vw + 4vh)' }}>Welcome to Dashboard, {session.user.name}</Typography>
                </Box>
            </Container>
          )
        }
    }
