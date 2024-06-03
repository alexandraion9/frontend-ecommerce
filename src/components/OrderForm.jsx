import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
    const [deliveryAddress, setDeliveryAddress] = useState({
        deliveryAddressLine1: '',
        deliveryAddressLine2: '',
        deliveryCity: '',
        deliveryCountry: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const tokenParts = token.split('.');
            const encodedPayload = tokenParts[1];
            const decodedPayload = atob(encodedPayload);
            const payload = JSON.parse(decodedPayload);
            const username = payload.sub;

            const response = await fetch(`http://localhost:8080/api/orders?username=${username}&deliveryAddressLine1=${deliveryAddress.deliveryAddressLine1}&deliveryAddressLine2=${deliveryAddress.deliveryAddressLine2}&deliveryCity=${deliveryAddress.deliveryCity}&deliveryCountry=${deliveryAddress.deliveryCountry}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(deliveryAddress),
            });
            if (response.ok) {
                const order = await response.json();
                console.log('Order placed successfully');
                navigate(`/order-confirmation/${order.id}`);
            } else {
                console.error('Failed to place order:', response.statusText);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom align="center">
                Place Order
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="deliveryAddressLine1"
                            label="Address Line 1"
                            value={deliveryAddress.deliveryAddressLine1}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="deliveryAddressLine2"
                            label="Address Line 2"
                            value={deliveryAddress.deliveryAddressLine2}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="deliveryCity"
                            label="City"
                            value={deliveryAddress.deliveryCity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="deliveryCountry"
                            label="Country"
                            value={deliveryAddress.deliveryCountry}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#ff9800', // Portocaliu
                                '&:hover': {
                                    backgroundColor: '#fb8c00' // Portocaliu mai închis la hover
                                }
                            }}
                        >
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default OrderForm;
