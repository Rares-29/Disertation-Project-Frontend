import {React, useContext, useState, useEffect} from 'react';
import { UserContext } from '../components/UserContext';
import studentApi from '../api/studentApi';
import TeacherDashboard from "../components/Teacher/TeacherDashboard";
import StudentDashboard from "../components/Student/StudentDashboard";

const Home = () => {

  const {user, setUser} = useContext(UserContext);


  console.log(user);
  return (
    <div>
      {user.role === 'STUD' && (
        <div>
        <StudentDashboard/>
        </div>
      )}
      {user.role === 'TEACHER' && (
        <div>
        <TeacherDashboard/>
        </div>
      )}
    </div>
  );
};

export default Home;