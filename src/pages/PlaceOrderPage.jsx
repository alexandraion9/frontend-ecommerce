import React from 'react';
import { Container, Typography } from '@mui/material';
import OrderForm from "../components/OrderForm";

const PlaceOrderPage = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Place Your Order
            </Typography>
            <OrderForm />
        </Container>
    );
};

export default PlaceOrderPage;
