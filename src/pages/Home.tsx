import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Container,
  useColorModeValue,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaTasks, FaChartLine, FaUsers } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ElementType;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack
      align={'center'}
      textAlign={'center'}
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      rounded={'xl'}
      boxShadow={'lg'}
    >
      <Icon as={icon} w={10} h={10} color="brand.500" />
      <Text fontWeight={600}>{title}</Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </Stack>
  );
};

export default function Home() {
  const { user } = useAuth();

  return (
    <Container maxW={'7xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Manage your tasks with <br />
          <Text as={'span'} color={'brand.500'}>
            TaskMaster
          </Text>
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} maxW={'3xl'}>
          A powerful task management platform that helps you organize, track, and
          collaborate on tasks efficiently. Boost your productivity and achieve
          your goals with our intuitive interface.
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
        >
          {!user && (
            <Button
              as={RouterLink}
              to="/login"
              colorScheme={'brand'}
              bg={'brand.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'brand.600',
              }}
            >
              Get Started
            </Button>
          )}
          {user && (
            <Button
              as={RouterLink}
              to="/tasks"
              colorScheme={'brand'}
              bg={'brand.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'brand.600',
              }}
            >
              View Tasks
            </Button>
          )}
        </Stack>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={10}>
        <Feature
          icon={FaTasks}
          title={'Task Management'}
          text={'Organize and track your tasks with our intuitive interface.'}
        />
        <Feature
          icon={FaChartLine}
          title={'Progress Tracking'}
          text={'Monitor your progress and stay on top of your goals.'}
        />
        <Feature
          icon={FaUsers}
          title={'Team Collaboration'}
          text={'Work together seamlessly with real-time updates.'}
        />
      </SimpleGrid>
    </Container>
  );
} 