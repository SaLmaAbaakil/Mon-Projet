import { configureStore } from '@reduxjs/toolkit';
import coursesSlice from './CourseSlice'


export const store = configureStore({
    reducer: {
      courses:coursesSlice,
    },
  });
  
  export default store;