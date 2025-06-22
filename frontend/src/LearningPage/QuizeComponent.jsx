import React, { useState } from 'react';
import { quizData } from './LessonContent'; // or wherever it's exported from


const QuizComponent = ({ topic }) => {
  const questions = quizData[topic] || [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Handle case when topic has no questions
  if (!questions || questions.length === 0) {
    return (
      <div className="mt-6 p-4 text-gray-500 bg-yellow-50 border border-yellow-200 rounded">
        No quiz available for this topic.
      </div>
    );
  }

  const currentQuestion = questions[current];

  const handleSelect = (option) => {
    if (!isSubmitted) setSelected(option);
  };

  const handleSubmit = () => {
    if (selected !== '') {
      setIsSubmitted(true);
    }
  };

  const handleNext = () => {
    setSelected('');
    setIsSubmitted(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setCurrent(0); // or you could show "quiz complete" message
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4">Quiz: {topic}</h2>
      <p className="mb-2 font-medium">{currentQuestion.question}</p>
      <ul className="space-y-2">
        {currentQuestion.options.map((option, i) => {
          const isCorrect = option === currentQuestion.answer;
          const isSelected = option === selected;
          const highlightClass =
            isSubmitted && isSelected
              ? isCorrect
                ? 'bg-green-100 border-green-500'
                : 'bg-red-100 border-red-500'
              : isSelected
              ? 'bg-blue-100 border-blue-500'
              : 'hover:bg-gray-100';

          return (
            <li
              key={i}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer border p-2 rounded ${highlightClass}`}
            >
              {option}
            </li>
          );
        })}
      </ul>

      {!isSubmitted ? (
        <button
          className={`mt-4 px-4 py-2 rounded text-white ${
            selected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!selected}
        >
          Submit
        </button>
      ) : (
        <div className="mt-4">
          <p
            className={`font-medium mb-2 ${
              selected === currentQuestion.answer ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {selected === currentQuestion.answer ? '✅ Correct!' : '❌ Incorrect!'} The correct answer is:{' '}
            <b>{currentQuestion.answer}</b>
          </p>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={handleNext}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
