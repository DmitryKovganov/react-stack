import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
  } from '@reduxjs/toolkit';
import axios from 'axios';
  
  const usersAdapter = createEntityAdapter();
  
  const initialState = usersAdapter.getInitialState({
    status: 'idle'
  });
  
  export const fetchUsers = createAsyncThunk('users/fetchusers', async () => {
    const response = await axios.get('/api/users');
    return response.data;
  });
  
  export const saveNewUser = createAsyncThunk('users/saveNewuser', async (user: any) => {
    const response = await axios.post('/api/user', user)
    return response.data;
  });
  
  const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
      builder
        .addCase(fetchUsers.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          usersAdapter.setAll(state, action.payload);
          state.status = 'idle';
        })
        .addCase(saveNewUser.fulfilled, usersAdapter.addOne);
    }
  });

  export default usersSlice.reducer;