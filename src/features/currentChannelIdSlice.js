import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    changeCurrentChannel(state, action) {
      return action.payload;
    },
  },
});

export default currentChannelIdSlice;
