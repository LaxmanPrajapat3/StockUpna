import { useState } from 'react';
import Sidebar from './Sidebar';
import { LessonContent } from './LessonContent';
import QuizComponent from './QuizeComponent'; 
import AuthCheck from '../authCheckfunction/AuthCheck';
const LearningPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('Introduction to Stock Market');

  return (
<AuthCheck>
    <div className="flex flex-col md:flex-row min-h-screen  mt-30  mb-10">
      <Sidebar selectedTopic={selectedTopic} onSelect={setSelectedTopic}  />
      <div className="flex-1 p-4">
        <LessonContent topic={selectedTopic} />
        <QuizComponent topic={selectedTopic} />
      </div>
    </div>
</AuthCheck>  
  );
};

export default LearningPage;
