'use client';
import { Box, Button, Container, FormControl, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FcGoogle } from "react-icons/fc";
import MailIcon from '@mui/icons-material/Mail';
import { useForm } from 'react-hook-form';
import React from "react";
import { useRouter } from "next/navigation";
import theme from "@/app/theme";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
    const { register, handleSubmit, formState:{errors} } = useForm();
    const router = useRouter()

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const onSubmit = handleSubmit(async (data) => {

        if (data.password != data.confirmPassword) {
            return alert('Las contraseñas no son iguales.')
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(
                {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(res.ok){
            router.push('/login')
        }
    });

    return (
        <Container sx={{minHeight: 'calc(100vh - (10vh + 7vh))', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <form onSubmit={onSubmit}>
                <Paper sx={{display: 'flex', height: '70svh', width: '80vw', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h4">Register</Typography>
                    
                    <FormControl variant="filled" sx={{marginBottom: '2vh', marginTop: '2vh'}}>
                        <InputLabel sx={{fontSize: '2.5vh'}} htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            id="username"
                            autoComplete="off"
                            {...register('username', {required: true})}
                            sx={{width: {xs: '65vw', md: '50vw', lg: '19vw'}, height: '9vh'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Icon>
                                        <AccountCircleIcon/>
                                    </Icon>
                                </InputAdornment>
                            }
                        />
                        {errors.username && <Typography variant="body2" color="error">Username is required</Typography>}
                    </FormControl>

                    <FormControl variant="filled" sx={{marginBottom: '2vh'}}>
                        <InputLabel sx={{fontSize: '2.5vh'}} htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            autoComplete="off"
                            {...register('email', {required: true})}
                            sx={{width: {xs: '65vw', md: '50vw', lg: '19vw'}, height: '9vh'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Icon>
                                        <MailIcon/>
                                    </Icon>
                                </InputAdornment>
                            }
                        />
                        {errors.email && <Typography variant="body2" color="error">Email is required</Typography>}
                    </FormControl>
                    
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
                        {errors.password && <Typography variant="body2" color="error">Password is required</Typography>}
                    </FormControl>
                    
                    {/* Confirm Password */}
                    <FormControl variant="filled" sx={{marginBottom: '2vh'}}>
                        <InputLabel sx={{fontSize: '2.5vh'}} htmlFor="confirmPassword">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            {...register('confirmPassword', {required: true})}
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
                        {errors.confirmPassword && <Typography variant="body2" color="error">Confirm password is required</Typography>}
                    </FormControl>
                    
                    <Box sx={{flexDirection: 'row'}}>
                        <Button variant="contained" type="submit" sx={{backgroundColor: theme.palette.background.default, color: '#fff', '&:hover': {backgroundColor: '#242020'}, fontSize: '2vh', marginRight: '2vh'}}>Register</Button>
                        <Button variant="contained" startIcon={<FcGoogle />} sx={{ backgroundColor: theme.palette.background.default, color: '#fff', '&:hover': {backgroundColor: '#242020'}}} onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>Sign in with Google</Button>
                    </Box> 
                </Paper>
            </form>
        </Container>
    )
}
