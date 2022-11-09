import React, { useEffect, useState } from 'react'
import { supabase } from '../../../services/supabaseClient'
import { Box, Flex, useColorModeValue, Stack, HStack, Stat, StatLabel, StatNumber, StatHelpText, Avatar as ProfilePicture } from '@chakra-ui/react'
import { MultipleFileUpload } from '../../atoms'
import { ImageViewer, ChakraCheckBox, SimpleSideBar, ModalSize } from '../../molecules'
import { Avatar } from '../../organisms'
import { photoAlbumAPI } from '../../../api/photoalbum-api' 
import { AppToast } from '../../atoms'
import { useAvatar } from '../../../hooks/use-navbar'

const MultiplePhotoUpload = ({ size, data }) => {
  const [arrayOfUrl, setArrayOfUrl] = useState([])
  const [animalUrl, setAnimalUrl] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dogUpload, setDogUpload] = useState("")
  const [filter, setFilter] = useState([])


  useEffect(() => {
    const fetchImage = async () => {
      const getPhotoAlbum = await photoAlbumAPI.retrievePhotoAlbum({filter})
      const data = getPhotoAlbum['data']
      
      const urlContainer = []
      for (const index in data) {
        const object = data[index]
        const url = object['url']
        urlContainer.push(url)  
      }
      
      setArrayOfUrl(urlContainer)
      downloadImage(urlContainer)
      console.log('Fetching multiple image')
    }

    fetchImage()
    
  }, [uploading])
  
  const onUpload = (url) => {
    downloadImage(url)
  }

  const downloadImage = async (patharray) => {
    try {
      const arrayUpload = []
      // console.log('this is the path')
      // console.log(patharray)
      for (const index in patharray) {
        const path = patharray[index]
        const { data, error } = await supabase.storage
          .from('animalphotos')
          .download(path)
        if (error) {
          throw error
        }
      const url = URL.createObjectURL(data)
      arrayUpload.push(url)
      // console.log(url)
      // console.log(animalUrl)
      }
    setAnimalUrl(arrayUpload)

    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadImages = async (event) => {
    console.log('Uploading Images....')
    try {
    
    const curFiles = event.target.files
    const listOfFileName = []
    // console.log(curFiles)
    for (const [key, file] of Object.entries(curFiles)) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // save filepath to database here.
      console.log(filePath)

      let { error: uploadError } = await supabase.storage
        .from('animalphotos')
        .upload(filePath, file)
      listOfFileName.push(filePath)
      console.log('Successful upload')
      
      if (uploadError) {
        throw uploadError
      }
    }
    //

    const response = await photoAlbumAPI.uploadPhotoAlbum({listOfFileName,dogUpload})
    console.log(response)
    feedBack.success()

    setUploading(!uploading)
    
    } catch (error) {
      console.error(error)
      feedBack.error(error)
    }
  }

  const eventHandler= (event) => {
    console.log('Dog button clicked')
    console.log(event)
    setDogUpload(event)
  }

  const eventHandlerFilter = async (event) => {
    console.log('hehe')
    console.log(event)
    setFilter(event)

    const listOfDog = event
    setUploading(!uploading)
    // const filterResponse = await photoAlbumAPI.retrievePhotoAlbum({listOfDog})
    // console.log(filterResponse)
  }


  const { avatarUrl, retrieveAvatar } = useAvatar()

  const handleRetrieveAvatar = async () =>{
    const abcd = await retrieveAvatar()
  }

  if (avatarUrl == null) {
    handleRetrieveAvatar()
    console.log('yes')
  }


  return (
    <Flex direction='column'>
      <HStack bg={useColorModeValue('cyan.500', 'teal.800')} p='2' mt='2' align={'center'} justify={'space-around'}> 
        <Box m={'5px'}>
          <ProfilePicture size={'2xl'} src={avatarUrl}/>
        </Box>
        <HStack>
          <Box>
           <Stat px='6' py='2' border={'1px solid'} borderColor={useColorModeValue('gray.500', 'gray.500')}>
              {/* <StatLabel> Photos </StatLabel> */}
              <StatNumber> {arrayOfUrl.length} </StatNumber>
              <StatHelpText> Photos</StatHelpText>
           </Stat>
          </Box>
          <Box>
              <Stat px='6' py='2' border={'1px solid'} borderColor={useColorModeValue('gray.500', 'gray.500')}>
              {/* <StatLabel> Photos </StatLabel> */}
              <StatNumber> {data.length} </StatNumber>
              <StatHelpText> {data.length> 1 ? 'Dogs' : 'Dog'} </StatHelpText>
           </Stat>
          </Box>
        </HStack>
        <Stack>
          <Box>
            <ChakraCheckBox eventHandler ={eventHandler} data={data}/>
          </Box>
          <Box>
            <MultipleFileUpload handleChange={uploadImages}/>
          </Box>
        </Stack>
      </HStack>
      <HStack spacing={1} display='flex' alignItems={'start'}>
        <Box width="20%" height="100%" mt={'4px'}>
          <SimpleSideBar eventHandler={eventHandlerFilter} data={data}/>
        </Box>
        <Box width="80%">
          <Box border={'0px solid'} mt={'2px'} mr={'5px'}>
            {arrayOfUrl ? <ImageViewer imageArray={animalUrl ? animalUrl : `https://via.placeholder.com/150`}/> : null}
          </Box>
          <ModalSize/>
        </Box>
      </HStack>
    </Flex>
  )
}

export default MultiplePhotoUpload

// TOAST MESSAGES
const feedBack = {
  success: () => {
    AppToast({
      title: 'Saved!',
      description: `Your photos were updated.`,
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
    });
  },
  error: (err) => {
    AppToast({
      title: 'Try again!',
      description: err.message,
      status: 'error',
      position: 'bottom-right',
      duration: 5000,
    });
  },
};