import { Box, Flex, Button, Heading, Spacer, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="white" px={4} shadow="sm">
      <Flex h={16} alignItems="center" maxW="container.xl" mx="auto">
        <Heading size="md" as={Link} to="/">
          Task Manager
        </Heading>
        <Spacer />
        {user ? (
          <Flex alignItems="center" gap={4}>
            <Button as={Link} to="/tasks" variant="ghost">
              Tasks
            </Button>
            <Button as={Link} to="/profile" variant="ghost">
              Profile
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </Flex>
        ) : (
          <Flex gap={4}>
            <Button as={Link} to="/login" variant="ghost">
              Login
            </Button>
            <Button as={Link} to="/signup" colorScheme="blue">
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar; 