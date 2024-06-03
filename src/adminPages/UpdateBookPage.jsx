import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Grid, Box } from '@mui/material';

const UpdateBookPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/books/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBook(data);
                } else {
                    console.error('Failed to fetch book details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();

    }, [id]);

    const handleUpdateBook = async () => {
        try {

            const token = localStorage.getItem('token');

            if (!token) {
                console.log('No token found.');
                return;
            }
            await fetch(`http://localhost:8080/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(book),
            });
            navigate('/admin');
        } catch (error) {
            console.error('Update book error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    return (
        <div>
            {book && (
                <div>
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="h4">Book Details</Typography>
                    </Box>
                    <Box sx={{ width: '50%', margin: '0 auto', mt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={book.title}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Author First Name"
                                name="author.firstName"
                                value={book.author.firstName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Author Last Name"
                                name="author.lastName"
                                value={book.author.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Publication Date"
                                type="date"
                                name="publicationDate"
                                value={book.publicationDate}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Genre"
                                name="genre"
                                value={book.genre}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Edition"
                                type="number"
                                name="edition"
                                value={book.edition}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                type="number"
                                value={book.price}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ISBN"
                                name="isbn"
                                value={book.isbn}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Pages"
                                type="number"
                                name="pages"
                                value={book.pages}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={book.description}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Publisher Name"
                                name="publisherName"
                                value={book.publisher.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleUpdateBook}>
                                Update
                            </Button>
                        </Box>
                    </Box>
                </div>
            )}
        </div>
    );
};

export default UpdateBookPage;
