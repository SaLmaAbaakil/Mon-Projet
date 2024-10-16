import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './App/Slices/store';
import CourseForm from './App/Composants/CourseForm'; 
import CourseList from './App/Composants/CourseList';
import CourseDetails from './App/Composants/CourseDetails'; 
import Login from './App/Composants/Login'; 
import Navbar from './App/Composants/Navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<CourseList />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/new" element={<CourseForm />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
