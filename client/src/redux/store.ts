import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../components/users/usersSlice';
import profileReducer from '../components/profile/profileSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    profile: profileReducer
  }
})

export default store