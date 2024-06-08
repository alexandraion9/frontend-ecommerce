import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Card, CardContent, CardActions, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { green, brown } from '@mui/material/colors';

const emptyCartImage = require('../images/EmptyCart.gif');

const CartPage = () => {

    const [cartItems, setCartItems] = useState([]);

    console.log('Cart Items:', cartItems);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
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

            const response = await fetch(`http://localhost:8080/api/cart/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    console.log(data);
                    const cartItemsArray = Object.keys(data).map(key => ({ bookId: key, ...data[key] }));
                    setCartItems(cartItemsArray);
                } else {
                    console.error('Cart items not found in response data');
                }
            } else {
                console.error('Failed to fetch cart items:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };


    const handleUpdateQuantity = async (bookId, newQuantity) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await fetch(`http://localhost:8080/api/cart/update/${bookId}?newQuantity=${newQuantity}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log('Item quantity updated successfully');
                await fetchCartItems();
            } else {
                console.error('Failed to update item quantity:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const handleRemoveItem = async (bookId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await fetch(`http://localhost:8080/api/cart/remove/${bookId}?quantity=${quantity}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log('Item removed from cart successfully');
                fetchCartItems();
            } else {
                console.error('Failed to remove item from cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">
                <ShoppingCartIcon style={{ color: green[500], fontSize: 40, marginRight: '10px' }} />
                Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Box textAlign="center">
                    <img src={emptyCartImage} alt="Empty Cart" />
                    <Typography variant="h5" gutterBottom style={{ marginTop: '20px', color: green[500], fontWeight: 'bold' }}>
                        YOUR CART IS EMPTY
                    </Typography>
                    <Typography variant="h5" gutterBottom style={{ marginTop: '20px', color: brown[500] }}>
                        Go ahead and explore top products.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {cartItems.map(item => (
                        <Grid item xs={12} key={item.bookId}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        Quantity: {item.quantity}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton onClick={() => handleUpdateQuantity(item.bookId, item.quantity + 1)}
                                                color="primary">
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleUpdateQuantity(item.bookId, item.quantity - 1)}
                                                color="primary">
                                        <RemoveIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleRemoveItem(item.bookId, item.quantity)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            {cartItems.length > 0 && (
                <Box textAlign="center" mt={4}>
                    <Link to="/create-order">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#ff9800',
                                '&:hover': {
                                    backgroundColor: '#fb8c00'
                                },
                            }}
                        >
                            Finalizează Comanda
                        </Button>
                    </Link>
                </Box>
            )}
        </div>
    );
};

export default CartPage;
