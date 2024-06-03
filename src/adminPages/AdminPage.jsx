import {Link,useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import BookList from "../components/BookList";

const AdminPage = () => {

    const navigate = useNavigate();
    const goToOrdersList = () => {
        navigate('/orders');
    };

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor:'#ffffff', backdropFilter: 'blur(10px)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'black' }}>
                        Admin Dashboard
                    </Typography>
                    <Button component={Link} to="/admin/add-book" color="inherit" sx={{ color: 'black' }}>Add Book</Button>
                    <Button  sx={{ color: 'black' }} onClick={goToOrdersList}>
                        View Orders
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ marginBottom: '30px' }}></Box>
            <BookList />
        </div>
    );
};

export default AdminPage;
