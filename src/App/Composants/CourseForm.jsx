import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../Slices/CourseSlice'; 
import { useNavigate } from 'react-router-dom'; 

const CourseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    author: '',
    duration: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!courseData.title || !courseData.description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await dispatch(addCourse(courseData)).unwrap(); 
      navigate('/courses'); 
    } catch (err) {
      setError('Failed to add course: ' + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Course</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="instructor" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="instructor"
            name="instructor"
            value={courseData.author}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration (hours)</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>
    </div>
  );
};

export default CourseForm;