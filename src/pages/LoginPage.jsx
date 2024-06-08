import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            username,
            password,
        };

        try {
            // Implement API call to authenticate user using loginData
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const responseData = await response.json();

            if (response.ok) {
                localStorage.setItem('token', responseData.accessToken);
                console.log('Token JWT:', responseData.accessToken);
                console.log('Username:', responseData.username);

                // Decizia bazată pe roluri
                if (responseData.roles.includes('ROLE_ADMIN')) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setError(responseData.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <Container component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Box sx={{ width: '400px', p: 4, border: '1px solid #ccc', borderRadius: '8px', marginTop: '64px' }}>
                <Typography component="h1" variant="h5" sx={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    Sign in
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Box textAlign="center">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#ff9800',
                                '&:hover': {
                                    backgroundColor: '#fb8c00'
                                },
                                mt: 2
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
