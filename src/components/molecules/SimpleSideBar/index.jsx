import React from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { ChakraCheckBox } from '../../molecules'

const SimpleSideBar = ({eventHandler, data}) => {

  return (
    <>
    <Flex flexDirection={'column'} >
      <Accordion defaultIndex={[]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Dog
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChakraCheckBox eventHandler={eventHandler} data={data} direction={'column'}/>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      
    </Flex>
    </>
  )
}

export default SimpleSideBar