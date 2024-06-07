/*
 * Configuration des routes de l'application.
 * Utilise React Router pour gérer la navigation entre les différentes vues.
 * Importe les composants nécessaires, y compris PrivateLayout pour le routage privé.
 * Utilise AuthContextProvider pour gérer l'authentification dans l'application.
 */

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateLayout from './components/PrivateLayout';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Books from './components/books/Books';
import BookDetail from './components/books/BookDetail';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import Loans from './components/loans/Loans';
import LoanDetail from './components/loans/LoanDetail';
import EditLoan from './components/loans/EditLoan';
import AddLoan from './components/loans/AddLoan';
import User from './components/User';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route element={<PrivateLayout />}> {/* Utilisez PrivateLayout comme wrapper */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/books/add" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/loans/:id" element={<LoanDetail />} />
            <Route path="/add-loan/:userId/:bookId" element={<AddLoan />} />
            <Route path="/edit-loan/:id" element={<EditLoan />} />
            <Route path="/users" element={<User />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile/:userId" element={<EditProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
