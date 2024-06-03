import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
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

                const response = await fetch(`http://localhost:8080/api/orders/${id}?username=${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const order = await response.json();
                    console.log('Order details:', order);
                    console.log(order)
                    setOrderDetails(order);
                } else {
                    console.error('Failed to fetch order details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [id]);

    return (
        <Container>
            {orderDetails ? (
                <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Order Details
                    </Typography>
                    <Typography variant="h6">
                        <strong>Order ID:</strong> {orderDetails.id}
                    </Typography>
                    <Typography variant="h6">
                        <strong>Total Price:</strong> ${orderDetails.totalPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="h6">
                        <strong>Estimated Delivery Date:</strong> {orderDetails.estimatedDeliveryDate}
                    </Typography>
                    <Typography variant="h6">
                        <strong>Delivery Address:</strong> {orderDetails.deliveryAddressLine1}, {orderDetails.deliveryAddressLine2 && `${orderDetails.deliveryAddressLine2},`} {orderDetails.deliveryCity}, {orderDetails.deliveryCountry}
                    </Typography>
                    <Typography variant="h6">
                        <strong>Order Status:</strong> {orderDetails.state}
                    </Typography>
                    <Typography variant="h5" sx={{ marginTop: 2 }}>
                        Order Items
                    </Typography>
                    <List>
                        {orderDetails.orderItems.map(item => (
                            <ListItem key={item.id} sx={{ borderBottom: '1px solid #ddd' }}>
                                <ListItemText
                                    primary={item.book.title}
                                    secondary={`Amount: $${item.amount.toFixed(2)}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            )}
        </Container>
    );
};

export default OrderDetailsPage;
