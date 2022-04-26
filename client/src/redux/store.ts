import { configureStore } from '@reduxjs/toolkit';

import todosReducer from '../components/users/usersSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer
  }
})

export default store