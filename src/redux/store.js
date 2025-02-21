import { configureStore } from '@reduxjs/toolkit';
import createModal from './slices/ModelsSlice';
const store = configureStore({
  reducer: { createModal },
});
export default store;
