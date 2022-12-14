import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../../atoms';
import { UserInput, PasswordInput } from '../../molecules';
import {
  Flex,
  Stack,
  Box,
  useColorModeValue,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUpdateLogger from '../../../hooks/useUpdateLogger';
import { useAuth } from '../../../hooks/use-auth';

// Google Auth
import { auth, signInWithGoogle } from '../../../services/firebase.service';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';

const Login = ({ handleToggle }) => {
  const { signIn, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Google Auth
  const [user, loading, error] = useAuthState(auth);

  const googleSignIn = async (email, password) => {
    try {
      await signIn(email, password);
      navigate('/profile');
    } catch (error) {
      console.log(error);

      // const googleUser = await axios
      //   .post('https://furtogether.fly.dev/sign-up', {
      //     name: user.displayName,
      //     email: user.email,
      //     password: user.uid,
      //     gender: 'NULL',
      //   })
      //   .then((response) => {
      //     signIn(response.email, response.password);
      //   })
      //   .then(() => {
      //     navigate('/profile');
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // console.log(googleUser);
      return;
    }
  };

  useEffect(() => {
    if (loading) {
      console.log('Loading...');
      return;
    }

    if (error) {
      console.log(error);
      return;
    }

    if (!user) {
      console.log('No user...', user);
      return;
    } else {
      googleSignIn(user.email, user.uid);
      console.log('Google Sign In...', user.email, user.uid);
    }
  }, [user, loading]);

  const from = location.state?.from?.pathname || '/profile';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordchange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      navigate(from, { replace: false });
    } catch (err) {
      alert(err.params);
    }
  };

  if (isAuthenticated) {
    console.log('isAuthenticated: ', isAuthenticated);
    navigate(from, { replace: true });
  }

  const loginInputs = [
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      onChange: [handleEmailChange],
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter password',
      onChange: [handlePasswordchange],
    },
  ];

  useUpdateLogger({ email, password });

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Welcome back
            </Text>
          </Stack>

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <UserInput
                type={loginInputs[0].type}
                name={loginInputs[0].name}
                placeholder={loginInputs[0].placeholder}
                label={loginInputs[0].label}
                onChange={loginInputs[0].onChange[0]}
              />
              <PasswordInput
                type={loginInputs[1].type}
                name={loginInputs[1].name}
                placeholder={loginInputs[1].placeholder}
                label={loginInputs[1].label}
                onChange={loginInputs[1].onChange[0]}
              />
            </Stack>

            <Stack spacing={10} pt={2}>
              <Button
                handleClick={handleSignIn}
                text='Login'
                size='md'
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
              />
            </Stack>

            <Stack spacing={10} pt={2}>
              <Button
                handleClick={signInWithGoogle}
                leftIcon={<FcGoogle />}
                variant={'outline'}
                text='Continue with Google'
                size='md'
                bg={'yellow.500'}
                color={'white'}
                _hover={{ bg: 'yellow.600' }}
              />
            </Stack>

            <Stack pt={5}>
              <Text align={'center'}>
                Dont have an account? Register{' '}
                <button
                  style={{ border: 'none', background: 'none', padding: '0' }}
                  onClick={handleToggle}
                >
                  here
                </button>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
