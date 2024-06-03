import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, Container, Typography, CircularProgress, Box } from '@mui/material';
import {useNavigate} from "react-router-dom";

const OrdersListPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found in localStorage');
                    navigate('/login');
                    return;
                }

                const response = await fetch('http://localhost:8080/api/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders:', response.statusText);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const getStatusOptions = (currentStatus) => {
        switch (currentStatus) {
            case 'PENDING':
                return ['PROCESSING', 'CANCELLED'];
            case 'PROCESSING':
                return ['SHIPPED', 'CANCELLED'];
            case 'SHIPPED':
                return ['DELIVERED'];
            default:
                return [];
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                navigate('/login');
                return;
            }

            const response = await fetch(`http://localhost:8080/api/orders/${id}/status?status=${newStatus}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === id ? { ...order, state: newStatus } : order
                    )
                );
                console.log(`Order ${id} status updated to ${newStatus}`);
            } else {
                console.error('Failed to update order status:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <Container>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                    <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Orders List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Total Price</TableCell>
                                    <TableCell>Change Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.user.username}</TableCell>
                                        <TableCell>{order.state}</TableCell>
                                        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <FormControl fullWidth>
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    value={order.state}
                                                    label="Status"
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    {getStatusOptions(order.state).map((status) => (
                                                        <MenuItem key={status} value={status}>{status}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
        </Container>
    );
};

export default OrdersListPage;
