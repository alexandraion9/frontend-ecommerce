import React, { useState, useEffect } from 'react';
import { Box, IconButton, Button, CardActions, CardContent, Grid, Modal, Paper, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import SearchBar from "../components/SearchBar";


const ProductsPage = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/books/view', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error('Failed to fetch books:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleViewDetails = (book) => {
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };

    const handleAddToCart = async (bookId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await fetch(`http://localhost:8080/api/cart/add?bookId=${bookId}&quantity=1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                console.log('Book added to cart successfully');
                navigate('/cart');
            } else {
                console.error('Failed to add book to cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding book to cart:', error);
        }
    };

    const handleSearch = async (searchTerm, searchType) => {
        try {
            let searchEndpoint = "";
            switch (searchType) {
                case "title":
                    searchEndpoint = `http://localhost:8080/api/books/search/title?keyword=${searchTerm}`;
                    break;
                case "author":
                    searchEndpoint = `http://localhost:8080/api/books/search/author?keyword=${searchTerm}`;
                    break;
                case "genre":
                    searchEndpoint = `http://localhost:8080/api/books/search/genre?keyword=${searchTerm}`;
                    break;
                case "publisher":
                    searchEndpoint = `http://localhost:8080/api/books/search/publisher?keyword=${searchTerm}`;
                    break;
                default:
                    console.error("Invalid search type");
                    return;
            }

            const response = await fetch(searchEndpoint, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error('Failed to search books:', response.statusText);
            }
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };


    const handleSortByTitle = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/books/sort/title`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error('Failed to sort books by title:', response.statusText);
            }
        } catch (error) {
            console.error('Error sorting books by title:', error);
        }
    };

    const handleSortByPrice = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/books/sort/price`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error('Failed to sort books by price:', response.statusText);
            }
        } catch (error) {
            console.error('Error sorting books by price:', error);
        }
    };

    const handleSortByPages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/books/sort/pages`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error('Failed to sort books by pages:', response.statusText);
            }
        } catch (error) {
            console.error('Error sorting books by pages:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '1200px' }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Arial, sans-serif', color: '#333', marginTop: '2rem', marginBottom: '1rem' }}>
                Library
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Paper elevation={3} sx={{ padding: 2, width: '80%' }}>
                    <SearchBar onSearch={handleSearch} buttonColor="orange" />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleSortByTitle}
                            sx={{
                                color: 'orange',
                                borderColor: 'orange', '&:hover': {color: 'purple', borderColor: 'purple',},
                            }}
                        >
                            Sort By Title
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSortByPrice}
                            sx={{
                                color: 'orange',
                                borderColor: 'orange', '&:hover': {color: 'purple', borderColor: 'purple',},
                            }}
                        >
                            Sort By Price
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSortByPages}
                            sx={{
                                color: 'orange',
                                borderColor: 'orange', '&:hover': {color: 'purple', borderColor: 'purple',},
                            }}
                        >
                            Sort By Pages
                        </Button>

                    </Box>
                </Paper>
            </Box>
            <Grid container spacing={3}>
                {books.map(book => (
                    <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {book.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {book.author.firstName} {book.author.lastName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Publication Date: {book.publicationDate}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button size="small" color="primary" onClick={() => handleViewDetails(book)}>
                                    View Details
                                </Button>
                                <IconButton sx={{ color: 'black' }} onClick={() => handleAddToCart(book.id)}>
                                    <AddShoppingCartIcon />
                                </IconButton>
                            </CardActions>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Modal open={selectedBook !== null} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%' }}>
                    <Typography variant="h5" gutterBottom>
                        {selectedBook?.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {selectedBook?.author.firstName} {selectedBook?.author.lastName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Publication Date: {selectedBook?.publicationDate}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Genre: {selectedBook?.genre}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Edition: {selectedBook?.edition}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Price: {selectedBook?.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        ISBN: {selectedBook?.isbn}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Pages: {selectedBook?.pages}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Description: {selectedBook?.description}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Publisher: {selectedBook?.publisher.name}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ProductsPage;

