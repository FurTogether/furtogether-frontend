import React, { useEffect, useState } from 'react';
import { Flex, Stack, Box, useColorModeValue, Heading, Text, Tabs } from '@chakra-ui/react'
import { MultiplePhotoUpload } from '../../organisms';
import { MultipleFileUpload } from '../../atoms'


const PhotoAlbum = ({data}) => {
console.log('**')
console.log(data)
return (
  <>
  
  <Flex minH={'100vh'} align={'stretch'} justify={'flex-start'} bg={useColorModeValue('teal.100', 'teal.600')} direction={'column'}>
    
    <MultiplePhotoUpload data={data}/>
  </Flex>

  </>
)

}

export default PhotoAlbum