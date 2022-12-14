// import { ReactNode } from 'react';
import React, {useState} from 'react';
import logo from '../../../assets/logo.svg';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

// Auth
import { useAuth } from '../../../hooks/use-auth';
import { useAvatar } from '../../../hooks/use-navbar';

// Google Auth
import { googleLogout } from '../../../services/firebase.service';

// Edit here for the links
const Links = [
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Daily Walk',
    link: '/walk',
  },
  {
    name: 'My Info',
    link: '/profile',
  },
  {
    name: 'Routines',
    link: '/routines',
  },
  {
    name: 'Photo Album',
    link: '/profilerichie',
  },
];


const NavLink = ({ children, href, onClick }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
    onClick={onClick}
    color={useColorModeValue('teal.600', 'teal.400')}
    fontSize='1xl'
    fontWeight='bold'
  >
    {children}
  </Link>
);

function Navbar() {
  // Logout
  const { logout, isAuthenticated } = useAuth();
  console.log('isAuth: ', isAuthenticated);

  const { avatarUrl, retrieveAvatar } = useAvatar()

  const handleRetrieveAvatar = async () =>{
    const abcd = await retrieveAvatar()
  }

  if (avatarUrl == null) {
    handleRetrieveAvatar()
    console.log('yes')
  }


  const handleLogout = async () => {
    try {
      logout();
      googleLogout();
    } catch (error) {
      console.log(error);
    }
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('blue.100', 'gray.900')} px={4} w='100%' pos='relative'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Text as='b' color={useColorModeValue('teal.900', 'teal.100')} fontSize='4xl'>
              FurTogether
            </Text>
            {/* <Box>
              <img src={logo} width='40px' height='40px' alt='' />
            </Box> */}
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.link}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {false && (
                <>
                  <NavLink href={'/signin'}>Login / SignUp</NavLink>
                </>
              )}
              {avatarUrl && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'sm'}
                      src={
                        avatarUrl
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      {isAuthenticated ? (
                        <NavLink onClick={handleLogout}>Sign Out</NavLink>
                      ) : (
                        <NavLink href={'/signin'}>Login</NavLink>
                      )}
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} href={link.link}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}

export default Navbar;
