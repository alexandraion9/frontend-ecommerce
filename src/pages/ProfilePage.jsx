import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';

const ProfilePage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserOrders = async () => {
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

                const response = await fetch(`http://localhost:8080/api/orders/user?username=${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const orders = await response.json();
                    setOrders(orders);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch user orders:', response.statusText);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching user orders:', error);
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []);

    return (
        <Container>
            <Box mt={4} textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Profile Page
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Your Orders
                </Typography>
            </Box>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <List>
                    {orders.map(order => (
                        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }} key={order.id}>
                            <Typography variant="h5" gutterBottom>
                                Order ID: {order.id}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Status:</strong> {order.state}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Estimated Delivery Date:</strong> {order.estimatedDeliveryDate}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Delivery Address:</strong> {order.deliveryAddressLine1}, {order.deliveryAddressLine2 && `${order.deliveryAddressLine2},`} {order.deliveryCity}, {order.deliveryCountry}
                            </Typography>
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                Order Items
                            </Typography>
                            <List>
                                {order.orderItems.map(item => (
                                    <ListItem key={item.id} sx={{ borderBottom: '1px solid #ddd' }}>
                                        <ListItemText
                                            primary={item.book.title}
                                            secondary={`Amount: $${item.amount.toFixed(2)}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default ProfilePage;
