// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { GreyFont } from '../../theme';
// // import { Avatar, Box, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// // const user
// // console.log('aaa - oustide function');

// const Profile = () => {
//   // console.log('aaa - iside function');
//   const [info, setInfo] = useState(null);

//   // useEffect(() => {
//   //   findInfo();
//   // }, []);

//   // const findInfo = async () => {
//   //   try {
//   //     const curr_user = await axios.get(
//   //       process.env.REACT_APP_API_URL + "/user/profile"
//   //     );
//   //     const user = curr_user.data;
//   //     console.log("user in profile is", user);
//   //     setInfo(user);
//   //   } catch (e) {
//   //     console.log(e);
//   //   }
//   // };

//   const navigate = useNavigate();
//   return (
//     <Box
//       display='flex'
//       flexDirection={'column'}
//       maxWidth={600}
//       // alignItems="left"
//       justifyContent={'left'}
//       margin='auto'
//       marginTop={10}
//       padding={3}
//     >
//       <Avatar
//         variant='circular'
//         sx={{ width: 156, height: 156, marginBottom: 8 }}
//         src='https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png'
//       />
//       <Box display='flex' flexDirection={'row'} ml={2} mt={3}>
//         <Box width={100}>
//           {' '}
//           <Typography>Name: </Typography>
//         </Box>
//         <GreyFont ml={10}>
//           {info?.name.charAt(0).toUpperCase() + info?.givenname.slice(1)}
//           {'Regina'}
//         </GreyFont>
//       </Box>

//       <Box display='flex' flexDirection={'row'} ml={2} mt={3}>
//         <Box width={100}>
//           {' '}
//           <Typography>Email: </Typography>
//         </Box>
//         <GreyFont ml={10}>
//           {info?.email}
//           {'lalala@gmail.com'}
//         </GreyFont>
//       </Box>

//       <Box display='flex' flexDirection={'row'} ml={2} mt={3}>
//         <Box width={100}>
//           {' '}
//           <Typography>Gender: </Typography>
//         </Box>
//         <GreyFont ml={10}>
//           {info?.unit}
//           {'Female'}
//         </GreyFont>
//       </Box>
//       <Box display='flex' flexDirection={'row'} ml={2} mt={3}>
//         <Box width={100}>
//           <Typography>Phone: </Typography>
//         </Box>
//         <GreyFont ml={10}>
//           {/* {info?.phone.charAt(0).toUpperCase() + info?.phone.slice(1)} */}
//           {'12345678'}
//         </GreyFont>
//       </Box>
//       <Box display='flex' flexDirection={'row'} ml={2} mt={3}>
//         <Box width={100}>
//           {' '}
//           <Typography>Address: </Typography>
//         </Box>
//         <GreyFont ml={10}>
//           {/* {info?.address.charAt(0).toUpperCase() + info?.address.slice(1)} */}
//           {'happy town hero land'}
//         </GreyFont>
//       </Box>
//       <Box display='flex' flexDirection={'row'} ml={2} mt={3}>
//         <Box width={100}>
//           {' '}
//           <Typography>Postal: </Typography>
//         </Box>
//         <GreyFont ml={10}>
//           {/* {info?.address.charAt(0).toUpperCase() + info?.address.slice(1)} */}
//           {'123456'}
//         </GreyFont>
//       </Box>
//       <Box
//         maxWidth={400}
//         alignItems='center'
//         justifyContent={'center'}
//         margin='auto'
//         marginTop={6}
//         padding={3}
//       >
//         <Button
//           // type="submit"
//           onClick={() => navigate('/editProfile')}
//           sx={{ marginTop: 3, borderRadius: 3 }}
//           variant='contained'
//           // color="warning"
//           style={{
//             backgroundColor: '#3dccc7',
//           }}
//         >
//           {'Edit Profile'}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Profile;
