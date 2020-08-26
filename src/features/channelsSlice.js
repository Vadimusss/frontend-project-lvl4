import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    receivingNewChannel(state, action) {
      const channel = action.payload;
      state.push(channel);
    },
    receivingRemoveChannel(state, action) {
      const id = action.payload;
      return state.filter((channel) => channel.id !== id);
    },
    receivingRenameChannel(state, action) {
      const { id, attributes } = action.payload;
      const { name } = attributes;
      const renamedСhannel = state.find((channel) => channel.id === id);
      renamedСhannel.name = name;
    },
  },
});

export default channelsSlice;
