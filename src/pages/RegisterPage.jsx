import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Grid, Typography, Container, Box } from '@mui/material';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [selectedRole, setSelectedRole] = useState([]);
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();

        // Verifică dacă parola respectă cerințele
        if (!validatePassword(password)) {
            setPasswordError('Parola trebuie să conțină cel puțin 8 caractere, cel puțin o literă mare și cel puțin o cifră.');
            return;
        }

        const registrationData = {
            username,
            email,
            password,
            firstName,
            lastName,
            city,
            country,
            addressLine1,
            addressLine2,
            roles: selectedRole
        };

        // Implement API call to register user using registrationData
        try {
            // Send registrationData to the backend API
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Handle successful registration (e.g., redirect to login page)
                console.log('Registration successful:', responseData);
                navigate('/login');
            } else {
                // Handle registration errors (e.g., display error messages)
                console.error('Registration failed:', responseData.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    // Funcție pentru validarea parolei
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '64px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Registration
            </Typography>
            <form onSubmit={handleRegister}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError('');
                            }}
                            required
                            error={passwordError !== ''}
                            helperText={passwordError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Country"
                            variant="outlined"
                            fullWidth
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address Line 1"
                            variant="outlined"
                            fullWidth
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address Line 2"
                            variant="outlined"
                            fullWidth
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={selectedRole.includes('USER')} onChange={() => setSelectedRole(['USER'])} />}
                            label="User"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={selectedRole.includes('ADMIN')} onChange={() => setSelectedRole(['ADMIN'])} />}
                            label="Admin"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#ff9800', // Portocaliu
                                    '&:hover': {
                                        backgroundColor: '#fb8c00' // Portocaliu mai închis la hover
                                    },
                                    mt: 2
                                }}
                            >
                                Register
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default RegisterPage;
