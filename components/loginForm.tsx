'use client';
import { Box, Button, Container, FormControl, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FcGoogle } from "react-icons/fc";
import MailIcon from '@mui/icons-material/Mail';
import { useForm } from 'react-hook-form';
import { signIn} from 'next-auth/react'
import React from "react";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import theme from "@/app/theme";

export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState("")
    const { register, handleSubmit, formState:{errors} } = useForm()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
      };
      const onSubmit = handleSubmit(async (data) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        if(res?.error){
            setError(res.error)
        } else {
            router.push('/dashboard')
        }
      })

      return (
            <Container sx={{minHeight: 'calc(100vh - (10vh + 7vh))', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>            
            <form onSubmit={onSubmit}>
                <Paper sx={{display: 'flex', height: '70svh', width: '80vw', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h4" sx={{fontSize: '5vh'}}>Login</Typography>

                    <FormControl variant="filled" sx={{marginBottom: '2vh', marginTop: '2vh'}}>
                        <InputLabel sx={{fontSize: '2.5vh'}} htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            autoComplete="off"
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email format'
                                }
                            })}
                            sx={{ width: {xs: '65vw', md: '50vw', lg: '19vw'}, height: '9vh'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Icon>
                                        <MailIcon/>
                                    </Icon>
                                </InputAdornment>
                            }
                        />
                        </FormControl>
                        {errors.email && typeof errors.email.message === 'string' && (
                        <Typography variant="body2" sx={{marginBottom: '2vh'}} color="error">
                            {errors.email.message}
                        </Typography>
                        )}

                    {/* Password */}
                    <FormControl variant="filled" sx={{marginBottom: '2vh'}}>
                        <InputLabel sx={{fontSize: '2.5vh'}} htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {required: true})}
                            sx={{width: {xs: '65vw', md: '50vw', lg: '19vw'}, height: '9vh'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {errors.password && <Typography variant="body2" sx={{marginBottom: '2vh'}} color="error">Password is required</Typography>}
                    
                    {error && (
                        <Box sx={{ width: '20vw', height: '5vh', textAlign: 'center', borderRadius: '5px', marginBottom: '2vh', backgroundColor: 'red', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant="body2">{error}</Typography>
                        </Box>
                    )}
                    
                    <Box sx={{flexDirection: 'row', marginTop: '2vh', marginBottom: '2vh'}}>
                        <Button variant="contained" type="submit" sx={{backgroundColor: theme.palette.background.default, color: '#fff', '&:hover': {backgroundColor: '#242020'}, fontSize: '2vh', marginRight: '1vw'}}>Login</Button>
                        <Button variant="contained" startIcon={<FcGoogle />} sx={{ backgroundColor: theme.palette.background.default, color: '#fff', '&:hover': {backgroundColor: '#242020'}}} onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>Sign in with Google</Button>                    
                    </Box>
                    <Typography>Don't have an account? <Button sx={{fontSize: '2vh'}} onClick={() => router.push('/register')}>Register</Button></Typography>
                </Paper>
            </form>
        </Container>
      )
    }