import React from 'react';
import { Input, Text, Box, Stack } from '@chakra-ui/react';


const MultipleFileUpload = ({handleChange}) => {


  return (
    <>
    {/* <input type= "file" id="multiple" name="multiple" accept="image/*" multiple onChange={handleChange}/> */}
    <Box
      borderColor="gray.300"
      borderStyle="solid"
      borderWidth= "2px"
      rounded="md"
      shadow="sm"
      role="group"
    >
      <Box position="relative" height="100%" width="100%" justifyContent="center" display="flex">
        <Box position="absolute" display="flex">
          <Text> Click to upload!</Text>
        </Box>
      </Box>
      <Input type="file" id="multiple" name="multiple" accept="image/*" multiple onChange={handleChange} aria-hidden="true" opacity="0">
      </Input>
    </Box>

    </>
  )
}

export default MultipleFileUpload