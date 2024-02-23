'use client';
import { Box, Button, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useSession } from "next-auth/react";

export default function navbar() {
  const { data: session, status } = useSession()

  return (
    <AppBar sx={{position: 'relative', height: '10vh'}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}} onClick={_event =>  window.location.href='/'}>
              <img style={{height: '10vh'}} alt="Your logo." src="logo.png"/>
              <Typography variant="body1" sx={{fontSize: '3vh'}}>Contact Directory</Typography>
            </Box>
            {status === "authenticated" && (
              <Button 
                sx={{fontSize: '2vh'}} 
                variant="outlined" 
                color="inherit" 
                onClick={_event =>  window.location.href='/dashboard'}
              >
                Dashboard
              </Button>
            )}
              {status == "unauthenticated" && (
                <Button 
                  sx={{fontSize: '2vh'}} 
                  variant="outlined" 
                  color="inherit" 
                  onClick={_event =>  window.location.href='/login'}
                >
                  Login
                </Button>
              )}
        </Toolbar>
    </AppBar>
  )
}
