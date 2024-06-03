import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('title');

    const handleSearch = () => {
        onSearch(searchTerm, searchType);
    };

    return (
        <Box mt={3} mb={3}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                    <Select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="author">Author</MenuItem>
                        <MenuItem value="genre">Genre</MenuItem>
                        <MenuItem value="publisher">Publisher</MenuItem>
                    </Select>
                </Grid>
                <Grid item>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ color: 'white', bgcolor: 'orange' }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>

                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchBar;
