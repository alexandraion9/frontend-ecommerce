import React from 'react';
import {NavLink} from 'react-router-dom';
import {AppBar, Toolbar, Box, Button, Stack} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const NavBar = ({ selectedTab, onChange }) => {

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ffecb3' }}>
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <Stack direction="row" spacing={1}>
                    <Button variant="text" size="medium"
                            startIcon={<HomeIcon/>}
                            component={NavLink} to={"/"} sx={{ color: '#000000' }}>
                        Home
                    </Button>
                    <Button variant="text" size="medium"
                            startIcon={<MenuBookIcon/>}
                            component={NavLink} to={"/books"} sx={{ color: '#000000' }}>
                        Products
                    </Button>
                    <Button variant="text" size="medium"
                            startIcon={<AccountBoxIcon/>}
                            component={NavLink} to={"/profile"} sx={{ color: '#000000' }}>
                        Profile
                    </Button>
                    </Stack>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Stack direction="row" spacing={2}>
                    <Button variant="text" size="medium"
                            startIcon={<LoginIcon />}
                            component={NavLink} to="/login" sx={{ color: '#000000' }}>
                        Login
                    </Button>
                    <Button variant="text" size="medium"
                            startIcon={<HowToRegIcon />}
                            component={NavLink} to="/register" sx={{ color: '#000000' }}>
                        Register
                    </Button>
                    <Button variant="text" size="medium"
                            startIcon={<ShoppingCartIcon />}
                            component={NavLink} to="/cart" sx={{ color: '#000000' }}>
                        Cart
                    </Button>
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
