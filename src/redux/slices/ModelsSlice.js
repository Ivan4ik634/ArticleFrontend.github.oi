import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  title: '',
  OnSubmit: false,
  openModal: false,
};
const createModal = createSlice({
  name: 'createModal',
  initialState,
  reducers: {
    UpdateTitle: (state, action) => {
      state.title = action.payload;
    },
    UpdateOnSubmit: (state, action) => {
      state.OnSubmit = action.payload;
    },
    openModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
});
export const { UpdateOnSubmit, UpdateTitle, openModal } = createModal.actions;
export default createModal.reducer;
