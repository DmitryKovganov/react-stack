import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
  } from '@reduxjs/toolkit';
import { loginRequest } from "../../auth/authConfig";
import { callMsGraph } from '../../auth/graph';

  const profileAdapter = createEntityAdapter();
  
  const initialState = profileAdapter.getInitialState({
    status: 'init',
    data: null
  });
  
  export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (msal: any) => {
    const { instance, accounts } = msal;
    const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
    });

    const result = await callMsGraph(response.accessToken);
    return result;
  });
  
  const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
      builder
        .addCase(fetchProfile.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
          state.data = action.payload;
          state.status = 'idle';
        });
    }
  });

  export default profileSlice.reducer;