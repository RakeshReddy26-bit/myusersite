import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { Tasks } from './pages/Tasks';
import Navbar from './components/Navbar';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { LoyaltySettingsProvider } from './contexts/LoyaltySettingsContext';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <LoyaltySettingsProvider>
          <Router>
            <Box minH="100vh" bg="gray.50">
              <Navbar />
              <Box as="main" py={8}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tasks"
                    element={
                      <ProtectedRoute>
                        <Tasks />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/" element={<Navigate to="/tasks" replace />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </LoyaltySettingsProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App; 