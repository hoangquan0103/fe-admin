import {configureStore} from '@reduxjs/toolkit';
import { adminReducer } from '../store/Module.reducer';

export const store = configureStore({
    reducer: adminReducer,
})