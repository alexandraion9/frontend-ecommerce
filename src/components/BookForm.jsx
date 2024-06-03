import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

const BookForm = ({ buttonText, onSubmit }) => {
    const [bookData, setBookData] = useState({
        title: '',
        publicationDate: '',
        genre: '',
        edition: '',
        price: '',
        isbn: '',
        pages: '',
        description: '',
        author: {
            firstName: '',
            lastName: ''
        },
        publisher: {
            name: ''
        },
        inventory: {
            quantity: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedBookData = { ...bookData };

        // Dacă numele câmpului conține un punct, înseamnă că lucrăm cu un obiect nested
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            updatedBookData[parent][child] = value;
        } else {
            updatedBookData[name] = value;
        }

        setBookData(updatedBookData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(bookData);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                {buttonText} Book
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            name="title"
                            value={bookData.title}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Publication Date"
                            variant="outlined"
                            fullWidth
                            type="date"
                            name="publicationDate"
                            value={bookData.publicationDate}
                            onChange={handleChange}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Genre"
                            variant="outlined"
                            fullWidth
                            name="genre"
                            value={bookData.genre}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Edition"
                            variant="outlined"
                            fullWidth
                            type="number"
                            name="edition"
                            value={bookData.edition}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            type="number"
                            name="price"
                            value={bookData.price}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="ISBN"
                            variant="outlined"
                            fullWidth
                            name="isbn"
                            value={bookData.isbn}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Pages"
                            variant="outlined"
                            fullWidth
                            type="number"
                            name="pages"
                            value={bookData.pages}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            name="description"
                            value={bookData.description}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Author First Name"
                            variant="outlined"
                            fullWidth
                            name="author.firstName"
                            value={bookData.author.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Author Last Name"
                            variant="outlined"
                            fullWidth
                            name="author.lastName"
                            value={bookData.author.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Publisher Name"
                            variant="outlined"
                            fullWidth
                            name="publisher.name"
                            value={bookData.publisher.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            type="number"
                            name="inventory.quantity"
                            value={bookData.inventory.quantity}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {buttonText} Book
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default BookForm;
