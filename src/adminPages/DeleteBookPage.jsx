import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const DeleteBookPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDeleteBook = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log('No token found.');
                return;
            }

            console.log('Deleting book with id:', id);

            await fetch(`http://localhost:8080/api/books/${id}`, {
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log('Book successfully deleted.');

            navigate('/admin');

        } catch (error) {
            console.error('Delete book error:', error);
        }
    };

    const handleCancelDelete = () => {
        navigate('/admin');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Are you sure you want to delete this book?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button onClick={handleDeleteBook} variant="contained" color="error">
                        Delete
                    </Button>
                    <Button onClick={handleCancelDelete} variant="contained" color="primary">
                        No
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DeleteBookPage;
