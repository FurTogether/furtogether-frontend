import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { ArrowRightIcon, ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons'

function ModalSize({isOpen, onOpen, onClose, image, index, handleLeft, handleRight}) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = useState('3xl')
  const [leftClick, setLeftClick] = useState(true)


  // const handleSizeClick = (newSize) => {
  //   setSize(newSize)
  //   onOpen()
  // }
  
  // const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        size= {size}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Picture {index+1}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                 <ArrowLeftIcon onClick={leftClick ? ()=> handleLeft() : null}/>
                </Box>
                <Box>
                  <ArrowRightIcon onClick={()=> handleRight()}/>
                </Box>
              </Box>
            <Image src={image}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalSize