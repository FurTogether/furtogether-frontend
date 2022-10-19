import React from 'react'
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'

const ChakraCheckBox = ({eventHandler, data}) => {

  return (
    <>
      <CheckboxGroup colorScheme='green' defaultValue={[]} onChange={eventHandler}>
        <Stack spacing={[1,5]} direction={['column','row']}>
          {data.map((row) => (
           <Checkbox key={row['id']} value={row['id']}>{row['dog']} - {row['breed']}</Checkbox>
          ))}
          {/* <Checkbox value="Others"> Others </Checkbox> */}
        </Stack>
      </CheckboxGroup>
    </>
  )
}

export default ChakraCheckBox