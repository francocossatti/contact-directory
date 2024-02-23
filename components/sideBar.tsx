'use client';
import { AppBar, Autocomplete, Avatar, Box, CircularProgress, Container, CssBaseline, Divider, Drawer, IconButton, Input, List, ListItem, TextField, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React, { ChangeEvent, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import prisma from '@/app/libs/db'
import theme from '@/app/theme';
import { useRouter } from 'next/navigation';
import { getAllUsersData } from '@/prisma/getData';

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(7),
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(9),
  },
});

const openedMixin = (theme: any) => ({
  width: theme.spacing(40), // Assuming 1 spacing unit equals 1vw for the theme
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

interface User {
    id: number;
    username: string | null;
    createdAt: Date;
  }

export default function sideBar() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const router = useRouter()
    const { data: session, status } = useSession()

    const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };

      const handleSearch = (option: any) => {
    if (option.username !== session?.user?.name) {
        router.push(`/profile/${option.username}`);
    } else {
        router.push(`/profile`);
    }
};

      const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const userData = await getAllUsersData(e.target.value);

        setSearchResults(userData);
      };

      if (status === "authenticated") {
        return (
            <Container>
                <Box sx={{ display: 'flex'}}>
                    <CssBaseline />
                    <AppBar sx={{ zIndex: 2, height: '10vh'}} position="fixed">
                        <Toolbar>
                            <IconButton edge="start" onClick={handleDrawerOpen} sx={{ ...(open && { display: 'none' }) }}>
                                <MenuIcon />
                            </IconButton>
                            {!open && <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}} onClick={_event =>  window.location.href='/'}>
                            <img style={{ height: '10vh', objectFit: 'contain'}} alt="Logo." src="/logo.png" />
                            <Typography variant="body1" sx={{fontSize: '3vh'}}>Contact Directory</Typography>
                            </Box>}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        sx={{
                            zIndex: open ? 3 : 1,
                            ...(open && {
                                ...openedMixin(theme),
                                '& .MuiDrawer-paper': openedMixin(theme),
                            }),
                            ...(!open && {
                                ...closedMixin(theme),
                                '& .MuiDrawer-paper': closedMixin(theme),
                            })
                        }}
                        variant='permanent'
                        open={open}
                    >
                        <Box sx={{display: 'flex', height: '10vh', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                marginTop: '3vh',
                                gap: '1vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                height: '100%',
                            }}
                        >
                            <Avatar sx={{cursor: 'pointer'}} src={session.user.image} onClick={() => router.push('/profile')}/>
                            {open && <Typography variant="body1">{session.user.name}</Typography>}
                            <Divider sx={{ width: '100%' }} />
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <IconButton onClick={() => router.push('/dashboard')}>
                                    <DashboardIcon/>
                                    {open && <Typography variant="body2" sx={{marginLeft: '1vw'}}>Dashboard</Typography>}
                                </IconButton>
                                <IconButton onClick={() => setOpen(true)}>
                                    <PersonSearchIcon />
                                    {open && <Typography variant="body2" sx={{marginLeft: '1vw'}}>Search People</Typography>}
                                </IconButton>
                                {open && (
                                    <Autocomplete
                                        options={searchResults}
                                        getOptionLabel={(option) => option.username ? option.username : ''}
                                        renderInput={(params) => (
                                            <TextField {...params} onChange={handleChange} placeholder='Search...' variant='outlined' />
                                        )}
                                        onChange={(_, value) => {
                                            if (value) handleSearch(value);
                                        }}
                                    />
                                )}
                            </Box>
                            <Box sx={{ flexGrow: 1 }} /> {/* Espacio flexible para empujar el botón al fondo */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Box sx={{flexDirection: 'row'}}>
                                    <IconButton onClick={() => signOut()}>
                                        <ExitToAppIcon />
                                        {open && <Typography variant="body2" sx={{marginLeft: '1vw'}}>Sign Out</Typography>}
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Drawer>
                </Box>
            </Container>
        )
      }
}