import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import { Dashboard } from './pages/Dashboard';
import AddClothes from './pages/AddClothes';
import MyClothes from './pages/MyClothes';
import Referral from './pages/Referral';
import MyOrders from './pages/MyOrders';
import { Tasks } from './pages/Tasks';
import AdminPanel from './pages/AdminPanel';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { LoyaltySettingsProvider } from './contexts/LoyaltySettingsContext';

const NotFound = () => <div className="text-center py-20 text-2xl font-bold">404 - Page Not Found</div>;

function App() {
  return (
    <AuthProvider>
      <LoyaltySettingsProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 py-8">
              <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/add-clothes" element={<ProtectedRoute><AddClothes /></ProtectedRoute>} />
                <Route path="/my-clothes" element={<ProtectedRoute><MyClothes /></ProtectedRoute>} />
                <Route path="/referral" element={<ProtectedRoute><Referral /></ProtectedRoute>} />
                <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPanel /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LoyaltySettingsProvider>
    </AuthProvider>
  );
}

export default App; 