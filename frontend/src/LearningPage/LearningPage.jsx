import { useState ,useEffect,useContext} from 'react';
import Sidebar from './Sidebar';
import { LessonContent } from './LessonContent';
import QuizComponent from './QuizeComponent'; 
import {AuthContext} from "../authCheckfunction/AuthProvider"
import {useNavigate} from 'react-router-dom';

import App from '../LoadingSpinner';
const LearningPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('Introduction to Stock Market');

const navigate=useNavigate();

  const {isLoggedIn,loading}=useContext(AuthContext);
useEffect(()=>{
  if(!loading&&!isLoggedIn){
    navigate('/login');
  }
},[isLoggedIn,navigate,loading])

 if (loading) {
  return <App/>
}
  return (
    <div className="flex flex-col md:flex-row min-h-screen  mt-30  mb-10">
      <Sidebar selectedTopic={selectedTopic} onSelect={setSelectedTopic}  />
      <div className="flex-1 p-4">
        <LessonContent topic={selectedTopic} />
        <QuizComponent topic={selectedTopic} />
      </div>
    </div>

  );
};

export default LearningPage;
