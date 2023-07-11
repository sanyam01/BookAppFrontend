import { configureStore } from '@reduxjs/toolkit';
import { bookSliceReducer } from './bookSlice';
import { useDispatch } from 'react-redux';

const bookStore = configureStore({
    reducer: bookSliceReducer.reducer,
});
export type AppDispatch = typeof bookStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export default bookStore;