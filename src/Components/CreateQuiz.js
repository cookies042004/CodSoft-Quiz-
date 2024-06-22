// src/components/CreateQuiz.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();

    const newQuiz = {
      title: quizTitle,
      questions,
    };

    try {
      const response = await fetch('http://localhost:5000/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuiz),
      });

      if (response.ok) {
        toast.success('Quiz created successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        // Clear form fields after successful quiz creation
        setQuizTitle('');
        setQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
      } else {
        toast.error('Failed to create quiz. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleClearForm = () => {
    setQuizTitle('');
    setQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
  };

  return (
    <>
      <Helmet><title>QuizVista - Create Quiz</title></Helmet>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Create Quiz</h2>
          <form onSubmit={handleCreateQuiz}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quizTitle">
                Quiz Title
              </label>
              <input
                type="text"
                id="quizTitle"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Question {questionIndex + 1}
                </label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
                  placeholder={`Question ${questionIndex + 1}`}
                  required
                />
                {question.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
                    placeholder={`Option ${optionIndex + 1}`}
                    required
                  />
                ))}
                <input
                  type="text"
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(questionIndex, 'answer', e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Correct Answer"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Create Quiz
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
