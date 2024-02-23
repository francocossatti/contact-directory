'use client'
import theme from '@/app/theme'
import { getUserInfo } from '@/prisma/getData'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'

export default function Profile({ user }: { user: { user: string } }) {
    const [profileInfo, setProfileInfo] = useState<{ createdAt: string | null, Image: string | null | undefined, username: string | null }>({ createdAt: null, Image: null, username: null });

    useEffect(() => {
        const fetchProfileInfo = async () => {
          let formattedUser = user.user.replace(/%20/g, ' ');
          const userInfo = await getUserInfo(formattedUser);
            if (userInfo && userInfo.createdAt) {
                const { createdAt, Image, username } = userInfo;
                setProfileInfo({ createdAt: new Date(createdAt).toLocaleDateString(), Image, username: username ?? null });
            }
        };
        fetchProfileInfo();
    }, [user]);

    const { createdAt, Image, username } = profileInfo;

    return (
      <>
      <Box sx={{ position: 'relative', width: `calc(100% - ${theme.spacing(7)})`, height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', ml: theme.spacing(7) }}>
        <Paper sx={{ width: '100%', height: '100%' }} elevation={0}>
        <Avatar src={Image || undefined} sx={{ position: 'absolute', top: '95%', left: '50%', transform: 'translate(-50%, -50%)', width: '20vh', height: '20vh', borderRadius: '50%' }} />
        </Paper>
      </Box>
      <Box sx={{ width: `calc(100% - ${theme.spacing(7)})`, flexDirection: 'column', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', ml: theme.spacing(7) }}>
      <Typography variant='h2'>{username}</Typography>
      <Typography>Account created: {createdAt}</Typography>
    </Box>
    </>
    );
}