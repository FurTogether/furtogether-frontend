import React from 'react';
import { Center, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useProfile } from '../../../hooks/use-profile';
import { generateEmptyForm } from './formFunction';

export default function AddDogCard() {
  const { addDog } = useProfile();
  // ?HANDLER
  function cardHandler() {
    addDog(null);
  }
  return (
    <Center py={6} onClick={cardHandler} w='80%'>
      <Stack
        borderWidth='1px'
        borderRadius='lg'
        w={{ sm: '100%', md: '540px' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.600')}
        height={{ sm: '476px', md: '10rem' }}
        boxShadow={'2xl'}
        padding={4}
        flex={1}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <AddIcon size={'xl'} mb={4} pos={'relative'} />

        <Heading fontSize={'2xl'} fontFamily={'body'}>
          Add Dog
        </Heading>
      </Stack>
    </Center>
  );
}
