import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, deleteCourse } from '../Slices/CourseSlice'; 
import { Link } from 'react-router-dom';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses); 

  useEffect(() => {
    const loadCourses = async () => {
      await dispatch(fetchCourses()); 
    };

    loadCourses();
  }, [dispatch]);

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await dispatch(deleteCourse(courseId)); 
    }
  };

  return (
    <div className="container mt-5">
      <h2>Course List</h2>
      {status === 'loading' && <p>Loading courses...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {status === 'succeeded' && (
        <table className="table">
          <thead>
            <tr>
              <th scope="">#</th>
              <th scope="">Title</th>
              <th scope="">Image</th>
              <th scope="">Description</th>
              <th scope="">Author</th>
              <th scope="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id}>
                <th scope="row">{index + 1}</th>
                <td>{course.title}</td>
                <td> <img src={course.image} alt={course.name} style={{ width: '50px', height: 'auto' }} /></td>
                <td>{course.description.slice(0.20)}</td>
                <td>{course.author}</td>
                <td>
                  <Link to={`/courses/${course.id}`} className="btn btn-info btn-sm me-2">
                    View Details
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(course.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseList;
