import React from 'react';
import { Container, Typography, Grid, Box, Button, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

const bestSellingBooks = [
    { title: "And Then There Were None", author: "Agatha Christie", img: "https://iv1.lisimg.com/image/8564214/740full-and-then-there-were-none-cover.jpg" },
    { title: "A Tale of Two Cities", author: "Charles Dickens", img: "https://static.destekdukkan.com/files/urun_urunler/img/16/a-tale-of-two-cities-kapak.jpg" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", img: "https://th.bing.com/th/id/OIP.fNNxy3AtzAciZYHs4swuOAAAAA?rs=1&pid=ImgDetMain" },
    { title: "The Da Vinci Code", author: "Dan Brown", img: "https://www.critiqueflix.com/wp-content/uploads/2023/07/The-Da-Vinci-Code-Book-Summary.webp" },
    { title: "The Bridges of Madison County", author: "Robert James Waller", img: "https://th.bing.com/th/id/R.68a1ddc077be41b60185445eb43d4de3?rik=shzu9d%2bAi51WHQ&pid=ImgRaw&r=0" },
    { title: "Lolita", author: "Vladimir Nabokov", img: "https://i.pinimg.com/originals/ff/eb/0e/ffeb0ebfa72c8746286d9c57a1e6aba9.jpg" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", img: "https://i1.wp.com/bookstoker.com/wp-content/uploads/2019/03/The-Catcher-in-the-Rye-by-J.D.-Salinger.jpeg?fit=1089%2C1600&ssl=1" },
    { title: "She: A History of Adventure", author: "H. Rider Haggard", img: "https://th.bing.com/th/id/OIP.5cdrns_Wd5MuIKJHTBLOZQAAAA?rs=1&pid=ImgDetMain" }
];

const LandingPage = () => (
    <div>
        <Container maxWidth="lg" sx={{ mt: 4, pb: 8, fontFamily: 'Lora, serif' }}>
            {/* Hero Section */}
            <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Lora, serif', color: '#3f51b5' }}>
                    Descoperă Universul Cărților
                </Typography>
                <Typography variant="h6" paragraph sx={{ color: '#555' }}>
                    Explorează o varietate de cărți din toate genurile și lasă-te captivat de poveștile lor.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={NavLink}
                    to="/books"
                    sx={{ fontWeight: 'bold' }}
                >
                    Vezi Produsele
                </Button>
            </Box>

            {/* Cărți Cele Mai Bine Vândute */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Lora, serif', color: '#3f51b5' }}>
                    Cele Mai Bine Vândute Cărți
                </Typography>
                <Grid container spacing={4}>
                    {bestSellingBooks.map((book, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', '&:hover': { boxShadow: 6 } }}>
                                <img src={book.img} alt={book.title} style={{ width: '100%', height: 'auto' }} />
                                <Box p={2}>
                                    <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>{book.title}</Typography>
                                    <Typography variant="body2" align="center" sx={{ color: '#777' }}>{book.author}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    </div>
);

export default LandingPage;
