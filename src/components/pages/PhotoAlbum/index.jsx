import React, { useEffect, useState } from 'react';
import { Flex, Stack, Box, useColorModeValue, Heading, Text, Tabs } from '@chakra-ui/react'
import { supabase } from '../../../supabaseClient'


const PhotoAlbum = ({ url, size, onUpload }) => {

const [avatarUrl, setAvatarUrl] = useState(null)
const [uploading, setUploading] = useState(false)

const downloadImage = async (path) => {
  try{
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path)
    
    if (error){
      throw error
    }
    const url = URL.createObjectURL(data)
    setAvatarUrl(url)
    console.log('swee')

  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async (event) => {
  try {
    setUploading(true)
    
    if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
    
    const file = event.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    let { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    onUpload(filePath)
    
  } catch (error) {
    alert(error.message)
  } finally {
      setUploading(false)
  }
}


return (
  <>
  
  <Flex minH={'100vh'} align={'stretch'} justify={'flex-start'} bg={useColorModeValue('teal.100', 'teal.600')} direction={'column'}>
    <Box rounded={'lg'} bg={useColorModeValue('cyan.500', 'teal.800')} boxShadow={'lg'} p={8}>
      <p> Placeholder for multer upload and picture display </p>
      
    </Box>
  </Flex>
  <div style={{ width: size }} aria-live="polite">
      <img
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? 'Avatar' : 'No image'}
        className="avatar image"
        style={{ height: size, width: size }}
      />
      {uploading ? (
        'Uploading...'
      ) : (
        <>
          <label className="button primary block" htmlFor="single">
            Upload an avatar
          </label>
          <div className="visually-hidden">
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </div>
        </>
      )}
    </div>
  </>
)

}

export default PhotoAlbum