import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  courses: [],
  comments: {},
  status: 'idle', 
  error: null,
};

// Fetch courses (GET)
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get('/api/courses');
  return response.data;
});

// Add course (POST)
export const addCourse = createAsyncThunk('courses/addCourse', async (newCourse) => {
  const response = await axios.post('/api/courses', newCourse);
  return response.data;
});

// Delete course (DELETE)
export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  await axios.delete(`/api/courses/${courseId}`);
  return courseId; // On retourne l'ID pour le supprimer de la liste
});

// Update course (PUT)
export const updateCourse = createAsyncThunk('courses/updateCourse', async ({ id, updatedCourse }) => {
  const response = await axios.put(`/api/courses/${id}`, updatedCourse);
  return response.data;
});

// Add comment (POST)
export const addComment = createAsyncThunk('courses/addComment', async ({ courseId, comment }) => {
  const response = await axios.post(`/api/courses/${courseId}/comments`, comment);
  return { courseId, comment: response.data };
});

// Slice pour les courses
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch courses
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
      })
      // Add course
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      // Delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course.id !== action.payload);
      })
      // Update course
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { courseId, comment } = action.payload;
        if (!state.comments[courseId]) {
          state.comments[courseId] = [];
        }
        state.comments[courseId].push(comment);
      });
  },
});

export default coursesSlice.reducer;
