import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddBookPage from "./adminPages/AddBookPage";
import UpdateBookPage from "./adminPages/UpdateBookPage";
import AdminPage from "./adminPages/AdminPage";
import BookList from "./components/BookList";
import DeleteBookPage from "./adminPages/DeleteBookPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrdersListPage from "./adminPages/OrderListPage";

const App = () => {
    const [selectedTab, setSelectedTab] = useState('home');

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
    <Router>
        <NavBar selectedTab={selectedTab} onChange={handleChange} />
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/books" element={<ProductsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path={"/books/view"} element={<BookList />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add-book" element={<AddBookPage />} />
            <Route path="/admin/delete-book/:id" element={<DeleteBookPage />} />
            <Route path="/admin/update-book/:id" element={<UpdateBookPage />} />
            <Route path="/create-order" element={<PlaceOrderPage />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
            <Route path="/orders" element={<OrdersListPage />} />
        </Routes>
    </Router>
    );
};

export default App;
