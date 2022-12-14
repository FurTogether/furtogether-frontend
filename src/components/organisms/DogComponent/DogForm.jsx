import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { CloseButton, Stack, Flex, Box } from '@chakra-ui/react';
import { Button, AppToast } from '../../atoms';
import { generateFields, formArray } from './formFunction';
import { useProfile } from '../../../hooks/use-profile';

// Takes in one entry from the dog array to generate one dog form
export default function DogForm({ dogProfile = null, cardHandler, index }) {
  const { updateDog, deleteDog, saveNewDog } = useProfile();

  // ?HANDLERS
  // Read only toggle for the form
  const [formReadOnly, setFormReadOnly] = useState(dogProfile ? true : false);
  function toggleReadOnly(formReset = null) {
    if (!formReadOnly && formReset) {
      formReset();
    }
    setFormReadOnly(!formReadOnly);
  }

  // Runs Save entry API for dog profile
  async function handleSave(values, actions) {
    try {
      const updatedDogProfile = {
        id: dogProfile?.id,
        ...values,
      };
      // Checking if this is a new form and change API call
      let success = false;
      if (updatedDogProfile.id) {
        success = await updateDog(updatedDogProfile, index);
      } else {
        success = await saveNewDog(updatedDogProfile, index);
      }
      // Respond with toast for feedback
      if (!success) {
        throw new Error(`Could not update ${dogProfile.dog}'s profile.`);
      }
      // Feedback Toast
      toggleReadOnly();
      feedBack.success(updatedDogProfile.dog);
    } catch (err) {
      // change form back to readOnly and update the card rendering
      feedBack.error(err);
    }
  }

  // Delete the dog card
  async function handleDelete() {
    try {
      const dogId = dogProfile?.id;
      const success = await deleteDog(dogId, index);
      if (!success) {
        throw new Error(`Could not delete ${dogProfile.dog}'s profile.`);
      }
      if (dogId) {
        feedBack.delete(dogProfile.dog);
      }
    } catch (err) {
      // change form back to readOnly and update the card rendering
      feedBack.error(err);
    }
  }

  // ?FORM ATTRIBUTE
  // Initalise the initial values for formik
  const initialValues = {};

  formArray.forEach(
    (x) => (initialValues[x.fieldName] = dogProfile ? dogProfile[x.fieldName] : '')
  );
  // Genertates and array of jsx for form fields
  const FormFields = generateFields(formArray, formReadOnly);

  return (
    <Flex w='80%' grow='1'>
      <Box flex='1'>
        <Formik initialValues={initialValues} onSubmit={handleSave}>
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Stack direction={'column'}>
                {/* each input field */}
                {FormFields}
                {formReadOnly ? (
                  <Button handleClick={toggleReadOnly} text='Edit' />
                ) : (
                  <Stack direction={'row'}>
                    <Button handleClick={props.submitForm} text='Save' bg='green' />
                    <Button handleClick={props.handleReset} text='Reset' bg='salmon' />
                    <Button handleClick={handleDelete} text='Delete' bg='red' />
                  </Stack>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <CloseButton size='md' onClick={dogProfile ? cardHandler : handleDelete} />
    </Flex>
  );
}

// TOAST MESSAGES
const feedBack = {
  success: (name) => {
    AppToast({
      title: 'Saved!',
      description: `${name}'s profile was updated.`,
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
  delete: (name) => {
    AppToast({
      title: 'Deleted!',
      description: `${name}'s profile was deleted.`,
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
    });
  },
};
