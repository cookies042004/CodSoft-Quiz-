import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questions from "./question.json";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate(); // Use useNavigate hook here

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(5); // Initialize hintsLeft
  const [timeLeft, setTimeLeft] = useState(1200); // Initialize timeLeft in seconds (20 minutes)
  const [quizEnded, setQuizEnded] = useState(false); // Initialize quizEnded state
  const [quizQuit, setQuizQuit] = useState(false); // Initialize quizQuit state

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);

    // Clean up the timer when the component unmounts or when timeLeft reaches 0
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Set the document title or any other side effects here
    document.title = `Question ${currentQuestionIndex + 1}`;
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft === 0 || currentQuestionIndex === questions.length) {
      setQuizEnded(true);
    }
  }, [timeLeft, currentQuestionIndex]);

  useEffect(() => {
    if (quizEnded || quizQuit) {
      document.title = "QuizVista - Result";
    }
  }, [quizEnded, quizQuit]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (answer) => {
    setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
    handleNextQuestion();
  };

  const useHint = () => {
    if (hintsLeft > 0) {
      // Display toast with the correct answer as hint
      toast.info(`Hint: The correct answer is "${currentQuestion.answer}"`, {
        position: "top-right",
        autoClose: 5000, // Close the toast after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setHintsLeft(hintsLeft - 1);
    }
  };

  // Convert timeLeft from seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleQuit = () => {
    const userConfirmed = window.confirm("Are you sure you want to quit the quiz?");
    if (userConfirmed) {
      toast.info("You have quit the quiz.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setQuizQuit(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setNumberOfAnsweredQuestions(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setHintsLeft(5);
    setTimeLeft(1200);
    setQuizEnded(false);
    setQuizQuit(false);
  };

  const goHome = () => {
    navigate('/'); // Navigate to home page  
    toast.info('Navigating to home page...', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const correctPercentage = ((correctAnswers / questions.length) * 100).toFixed(2);

  return (
    <Fragment>
      <Helmet>
        <title>QuizVista - Quiz Page</title>
      </Helmet>
      <ToastContainer />
      <div className="m-4 sm:m-8 md:m-16 lg:m-32 border-l-4 border-blue-600 bg-slate-50 p-4 sm:p-5 rounded shadow-lg">
        {quizEnded || quizQuit ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Ended</h2>
            <p className="text-xl">Your Score: {score}</p>
            <p className="text-lg">Correct Answers: {correctAnswers}</p>
            <p className="text-lg">Wrong Answers: {wrongAnswers}</p>
            <p className="text-lg">Total Questions Answered: {numberOfAnsweredQuestions}</p>
            <p className="text-lg">Correct Percentage: {correctPercentage}%</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={restartQuiz}
                className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600"
              >
                Play Again
              </button>
              <button
                onClick={goHome}
                className="bg-green-500 text-white px-4 py-2 m-2 rounded hover:bg-green-600"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : currentQuestion ? (
          <>
            <div className="flex justify-end mb-4">
              <p className="text-base sm:text-lg md:text-xl text-gray-700">
                <span
                  className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon cursor-pointer"
                  onClick={useHint}
                ></span>
                {hintsLeft} hints left
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm sm:text-lg text-gray-700">
                <span>{currentQuestionIndex + 1} of {questions.length}</span>
              </p>
              <p className="text-sm sm:text-lg text-gray-700 flex items-center">
                <span className="mdi mdi-clock-outline mr-2"></span>
                {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
              </p>
            </div>
            <h5 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h5>
            <div className="flex flex-wrap justify-between mb-6">
              {["optionA", "optionB", "optionC", "optionD"].map((optionKey) => (
                <p
                  key={optionKey}
                  onClick={() => handleAnswer(currentQuestion[optionKey])}
                  className="flex-1 p-2 m-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-100 text-center"
                >
                  {currentQuestion[optionKey]}
                </p>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded ${
                  currentQuestionIndex === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded ${
                  currentQuestionIndex === questions.length - 1
                    ? "bg-blue-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
              <button
                onClick={handleQuit}
                className="bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-red-600"
              >
                Quit
              </button>
            </div>
            <div className="mt-4">
              <p>Score: {score}</p>
              <p>Correct Answers: {correctAnswers}</p>
              <p>Wrong Answers: {wrongAnswers}</p>
              <p>Answered Questions: {numberOfAnsweredQuestions}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Fragment>
  );
};

export default Test;