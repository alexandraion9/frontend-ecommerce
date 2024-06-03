import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Card, CardContent, CardActions, Button, Modal, Box, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const BookList = ({handleDeleteBook}) => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

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


    return (
        <Container maxWidth="lg" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
                Book List
            </Typography>
            <Grid container spacing={3}>
                {books.map(book => (
                    <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Card sx={{ flexGrow: 1 }}>
                                <CardContent>
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
                                <CardActions sx={{ marginTop: 'auto' }}>
                                    <Button size="small"
                                            color="primary"
                                            onClick={() => handleViewDetails(book)}>
                                        View Details
                                    </Button>
                                    <Button
                                        size="small"
                                        color="info"
                                        component={Link}
                                        to={`/admin/update-book/${book.id}`}
                                    >
                                        <EditIcon />
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        component={Link}
                                        to={`/admin/delete-book/${book.id}`}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </CardActions>
                            </Card>
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
        </Container>
    );
};

export default BookList;
