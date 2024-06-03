import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';

const AddBookPage = () => {
    const navigate = useNavigate();

    const handleAddBook = async (bookData) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const response = await fetch('http://localhost:8080/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookData),
            });

            if (response.ok) {
                // Handle successful book addition
                console.log('Book added successfully');
                navigate('/admin');
            } else {

                const responseData = await response.json();
                console.error('Add book error:', responseData.error);
            }

        } catch (error) {
            console.error('Add book error:', error);
        }
    };

    return <BookForm buttonText="Add" onSubmit={handleAddBook} />;
};

export default AddBookPage;
