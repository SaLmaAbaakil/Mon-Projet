import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { courseId } = useParams();
  
  const courses = useSelector(state => state.courses.courses);
  const comments = useSelector(state => state.courses.comments);

  const course = courses.find(course => course.id === parseInt(courseId));

  if (!course) {
    return <div>Course not found!</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{course.name}</h2>
      <img src={course.image} alt={course.name} className="img-fluid mb-3" />
      <p>{course.description}</p>
      
      <h4>Comments</h4>
      {comments[courseId] && comments[courseId].length > 0 ? (
        <ul className="list-group">
          {comments[courseId].map(comment => (
            <li key={comment.id} className="list-group-item">
              {comment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CourseDetails;
