import React, {useState} from 'react'
import { Image, Box, Flex, SimpleGrid, scaleFadeConfig } from '@chakra-ui/react'
import { ModalSize } from '../../molecules'
import { useDisclosure } from '@chakra-ui/react'

const ImageViewer = ({imageArray}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imageIndex, setImageIndex] = useState(0)
  const [imageActual, setImageActual] = useState(null)

  const handleOpenModal= (event, index) => {
    console.log('image clicking lol')
    console.log(event.target)
    console.log(index)
    setImageIndex(index)
    setImageActual(imageArray[index])
    onOpen()
  }

  const handleLeft = () => {
    const indexLeft = imageIndex - 1

    if (indexLeft >= 0) {
      setImageIndex(indexLeft)
      setImageActual(imageArray[indexLeft])
    }

  }

  const handleRight = () => {
    const indexRight = imageIndex + 1
    if (indexRight < imageArray.length){
      setImageIndex(indexRight)
      setImageActual(imageArray[indexRight])
    }
  }
  // p='2' mt="1" border='1px' bg='white' boxSize= "150px"
  return (
    <>
    <SimpleGrid minChildWidth='120px' spacing='10px'>
    {imageArray.map((image, index)=> (
      <Box key={index} onClick={(event)=> handleOpenModal(event, index)}>
      <Image key={index} p='2' mt="1" border='1px' bg='white' boxSize= "150px" src={image} _hover={{transform: 'scale(1.2)'}}/>
      </Box>
    ))
    }
    </SimpleGrid>
    <ModalSize isOpen={isOpen} onOpen={onOpen} onClose={onClose} image={imageActual} index={imageIndex} handleLeft={handleLeft} handleRight={handleRight}/>
    </>
  )
}

export default ImageViewer