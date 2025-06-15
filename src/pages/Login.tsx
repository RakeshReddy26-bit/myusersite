import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FormField } from '../components/common/FormField';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import PageLayout from '../components/layout/PageLayout';

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const from = location.state?.from?.pathname || '/tasks';

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
      toast({
        title: 'Success',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please check your credentials.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <PageLayout showNavbar={false}>
        <Box maxW="container.sm" mx="auto">
          <Stack spacing={8}>
            <Heading>Welcome Back</Heading>
            <Box w="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                  />
                  <FormField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                  />
                  <Button
                    type="submit"
                    colorScheme="brand"
                    isLoading={loading}
                    loadingText="Signing in..."
                  >
                    Sign In
                  </Button>
                </Stack>
              </form>
            </Box>
            <Text textAlign="center">
              Don't have an account?{' '}
              <Link to="/signup" color="brand.500">
                Sign up
              </Link>
            </Text>
          </Stack>
        </Box>
      </PageLayout>
    </ErrorBoundary>
  );
};

export default Login; 