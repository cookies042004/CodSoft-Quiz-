import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <Helmet><title>QuizVista - Home</title></Helmet>
    <div className="bg-[url('./Assets/img/bg-img.jpg')] bg-cover bg-center flex flex-col justify-center items-center h-screen">
      <section className="max-w-xl w-full p-8 rounded-md text-center md:ml-auto">
        <h1 className="text-5xl font-bold mb-8">Welcome to QuizVista</h1>
        <p className="text-xl mb-8">Create your own quizzes or take quizzes created by others!</p>

        {/* Create Quiz button */}
        <div className="mb-8">
          <Link 
            to="/create-quiz" 
            className="text-2xl text-white bg-green-600 p-3 rounded-3xl cursor-pointer inline-block w-full max-w-sm shadow-md transition duration-300 ease-in-out transform hover:bg-green-700 hover:scale-105"
          >
            Create Quiz
          </Link>
        </div>

        {/* Take Quiz button */}
        <div className="mb-8">
          <Link 
            to="/Play/instructions" 
            className="text-2xl text-white bg-blue-600 p-3 rounded-3xl cursor-pointer inline-block w-full max-w-sm shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          >
            Take a Quiz
          </Link>
        </div>

        {/* Login and Signup buttons */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Link 
            to="/login" 
            className="text-2xl text-white rounded-3xl bg-red-600 p-3 inline-block w-full md:w-44 text-center shadow-md transition duration-300 ease-in-out transform hover:bg-red-700 hover:scale-105"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="text-2xl text-white rounded-3xl bg-blue-600 p-3 inline-block w-full md:w-44 text-center shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          >
            Signup
          </Link>
        </div>
      </section>
    </div>
  </>
);

export default Home;
