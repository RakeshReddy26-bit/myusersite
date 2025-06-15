import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Text,
  Avatar,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';

export default function Profile() {
  const { user, firebaseUser } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const toast = useToast();

  const handleUpdateProfile = async () => {
    if (!firebaseUser) return;
    try {
      await updateProfile(firebaseUser, {
        displayName,
        photoURL,
      });
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW="container.md">
      <Stack spacing={8}>
        <Box textAlign="center">
          <Heading size="lg">Profile</Heading>
          <Text mt={2} color="gray.600">
            Manage your account settings and preferences
          </Text>
        </Box>

        <Box
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Avatar
                size="2xl"
                name={displayName || user?.email || ''}
                src={photoURL}
                mb={4}
              />
              <Text fontSize="xl" fontWeight="bold">
                {displayName || user?.email}
              </Text>
              <Text color="gray.500">{user?.email}</Text>
            </Box>

            <Divider />

            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Display Name</FormLabel>
                <Input
                  value={displayName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Profile Picture URL</FormLabel>
                <Input
                  value={photoURL}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhotoURL(e.target.value)}
                  placeholder="Enter profile picture URL"
                />
              </FormControl>

              <Button
                colorScheme="brand"
                onClick={handleUpdateProfile}
                mt={4}
              >
                Update Profile
              </Button>
            </Stack>
          </VStack>
        </Box>

        <Box
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <Heading size="md">Account Information</Heading>
            <HStack justify="space-between">
              <Text>Email</Text>
              <Text fontWeight="bold">{user?.email}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Email Verified</Text>
              <Text fontWeight="bold">
                {firebaseUser?.emailVerified ? 'Yes' : 'No'}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Account Created</Text>
              <Text fontWeight="bold">
                {firebaseUser?.metadata.creationTime
                  ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString()
                  : 'N/A'}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
} 