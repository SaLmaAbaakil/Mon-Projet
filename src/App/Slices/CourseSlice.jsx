import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get('http://localhost:5000/courses');
  return response.data;
});

const initialState = {
  courses: [],
  comments: {}, 
  status: 'idle', 
  error: null,
};

// Add course (POST)
export const addCourse = createAsyncThunk('courses/addCourse', async (newCourse) => {
  const response = await axios.post('http://localhost:5000/courses', newCourse); 
  return response.data;
});

// Delete course (DELETE)
export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  await axios.delete(`http://localhost:5000/courses/${courseId}`); 
  return courseId; 
});


const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {

    addComment: (state, action) => {
      const { courseId, comment } = action.payload;
      if (!state.comments[courseId]) {
        state.comments[courseId] = []; 
      }
      state.comments[courseId].push(comment); 
    },

    deleteComment: (state, action) => {
      const { courseId, commentId } = action.payload;
      if (state.comments[courseId]) {
        const index = state.comments[courseId].findIndex(comment => comment.id === commentId);
        if (index !== -1) {
          state.comments[courseId].splice(index, 1); 
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload; 
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      });
  },
});

export const { addComment, deleteComment } = coursesSlice.actions; 
export default coursesSlice.reducer; 