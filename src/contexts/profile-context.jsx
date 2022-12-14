/* eslint-disable react/react-in-jsx-scope */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { profileApi } from '../api/profile-api';
import { routineApi } from '../api/routine-api';

// single source of truth,
const ActionType = {
  INITIALIZE: 'INITIALIZE',
  UPDATEDOG: 'UPDATEDOG',
  DELETEDOG: 'DELETEDOG',
  UPDATEUSER: 'UPDATEUSER',
  ADDDOG: 'ADDDOG',
  SAVENEWDOG: 'SAVENEWDOG',
  ADDROUTINE: 'ADDROUTINE',
  SAVENEWROUTINE: 'SAVENEWROUTINE',
  UPDATEROUTINE: 'UPDATEROUTINE',
  DELETEROUTINE: 'DELETEROUTINE',
};

const initialState = {
  isInitialized: false,
  user: null,
  dogs: null,
  routines: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isInitialized, dogs, user, routines } = action.payload;

    return {
      ...state,
      isInitialized: true,
      user,
      dogs,
      routines,
    };
  },

  UPDATEDOG: (state, action) => {
    const { updatedDog, index } = action.payload;
    let newDogs = state.dogs;
    newDogs[index] = updatedDog;
    return {
      ...state,
      dogs: newDogs,
    };
  },

  DELETEDOG: (state, action) => {
    const { index } = action.payload;
    let updatedDogs = state.dogs;
    updatedDogs.splice(index, 1);
    console.log(index, 'removed', { updatedDogs });
    return {
      ...state,
      dogs: updatedDogs,
    };
  },

  UPDATEUSER: (state, action) => {
    const { updatedUserProfile } = action.payload;
    return {
      ...state,
      user: updatedUserProfile,
    };
  },
  ADDDOG: (state, action) => {
    const { emptyDog } = action.payload;
    const updatedDogs = state.dogs;
    updatedDogs.push(emptyDog);
    return {
      ...state,
      dogs: updatedDogs,
    };
  },
  SAVENEWDOG: (state, action) => {
    const { savedDog, index } = action.payload;
    const updatedDogs = state.dogs;
    updatedDogs[index] = savedDog;
    return {
      ...state,
      dogs: updatedDogs,
    };
  },
  // ROUTINES
  ADDROUTINE: (state, action) => {
    const { emptyRoutine } = action.payload;
    const updatedRoutines = state.routines;
    updatedRoutines.push(emptyRoutine);
    return {
      ...state,
      routines: updatedRoutines,
    };
  },
  SAVENEWROUTINE: (state, action) => {
    const { savedRoutine, index } = action.payload;
    const updatedRoutines = state.routines;
    updatedRoutines[index] = savedRoutine;
    return {
      ...state,
      routines: updatedRoutines,
    };
  },
  UPDATEROUTINE: (state, action) => {
    const { updatedRoutine, index } = action.payload;
    let updatedRoutines = state.routines;
    updatedRoutines[index] = updatedRoutine;
    return {
      ...state,
      routines: updatedRoutines,
    };
  },

  DELETEROUTINE: (state, action) => {
    const { index } = action.payload;
    let updatedRoutines = state.routines;
    updatedRoutines.splice(index, 1);
    return {
      ...state,
      routines: updatedRoutines,
    };
  },
};

// if action.type exists, then call the handler function with the same name, else just return the current state
// we get the action.type from dispatch functions (see below)
const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const ProfileContext = createContext({
  ...initialState,
  updateDog: () => Promise.resolve(),
  deleteDog: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
  addDog: () => Promise.resolve(),
  saveNewDog: () => Promise.resolve(),
  addRoutine: () => Promise.resolve(),
  saveNewRoutine: () => Promise.resolve(),
  updateRoutine: () => Promise.resolve(),
  deleteRoutine: () => Promise.resolve(),
});

export const ProfileProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const { success, data } = await profileApi.getUserProfile();
        const routineData = await routineApi.getRoutines();
        if (success) {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isInitialized: true,
              user: data.userProfile,
              dogs: data.userProfile.dogs,
              routines: routineData.data.userRoutines,
            },
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isInitialized: false,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    initialize();
  }, []);

  const updateDog = async (updatedDogProfile, index) => {
    try {
      const { success, data } = await profileApi.updateDogProfile(updatedDogProfile);
      if (success) {
        dispatch({
          type: ActionType.UPDATEDOG,
          payload: {
            index,
            updatedDog: updatedDogProfile,
          },
        });
        return success;
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const deleteDog = async (dogId, index) => {
    try {
      let success = false;
      // If this was a previous saved entry with assigned dogId run the API to delete from DB
      if (dogId) {
        const response = await profileApi.deleteDog({ dogId });
        success = response.success;
      }
      // On successful API call or if the profile is an unsaved profile
      // Update the context to remove the card
      if (success || !dogId) {
        success = true;
        dispatch({
          type: ActionType.DELETEDOG,
          payload: {
            index,
          },
        });
        return success;
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const updateUser = async (updatedUserProfile) => {
    try {
      const { success, data } = await profileApi.updateUserProfile(updatedUserProfile);
      if (success) {
        dispatch({
          type: ActionType.UPDATEUSER,
          payload: {
            updatedUserProfile,
          },
        });
      } else {
        throw new Error('Update user failed.');
      }
      return success;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const addDog = (emptyDog) => {
    dispatch({
      type: ActionType.ADDDOG,
      payload: {
        emptyDog,
      },
    });
  };

  const saveNewDog = async (dogProfile, index) => {
    try {
      const { success, data } = await profileApi.saveNewDog(dogProfile);
      console.log('dog', data);
      if (success) {
        dispatch({
          type: ActionType.SAVENEWDOG,
          payload: {
            index,
            savedDog: data.newDog,
          },
        });
        return success;
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // ROUTINES RELATED CONTEXT
  const addRoutine = (emptyRoutine) => {
    dispatch({
      type: ActionType.ADDROUTINE,
      payload: {
        emptyRoutine,
      },
    });
  };

  const saveNewRoutine = async (newRoutine, index) => {
    try {
      const { success, data } = await routineApi.saveNewRoutine(newRoutine);
      if (success) {
        dispatch({
          type: ActionType.SAVENEWROUTINE,
          payload: {
            index,
            savedRoutine: data.newRoutine,
          },
        });
        return success;
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const updateRoutine = async (updatedRoutine, index) => {
    try {
      const { success, data } = await routineApi.updateRoutine(updatedRoutine);
      if (success) {
        dispatch({
          type: ActionType.UPDATEROUTINE,
          payload: {
            index,
            updatedRoutine,
          },
        });
        return success;
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const deleteRoutine = async (routineId, index) => {
    try {
      let success = false;
      // If this was a previous saved entry with assigned routinId run the API to delete from DB
      if (routineId) {
        const response = await routineApi.deleteRoutine(routineId);
        success = response.success;
      }
      // On successful API call or if the profile is an unsaved profile
      // Update the context to remove the card
      if (success || !routineId) {
        success = true;
        dispatch({
          type: ActionType.DELETEROUTINE,
          payload: {
            index,
          },
        });
        return success;
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        deleteDog,
        updateDog,
        updateUser,
        addDog,
        saveNewDog,
        addRoutine,
        updateRoutine,
        deleteRoutine,
        saveNewRoutine,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

ProfileContext.propTypes = {
  children: PropTypes.node.isRequired,
};
