import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import multiplechoice from "../../Assets/img/multiplechoice.png";
import answer from "../../Assets/img/answer.jpeg";

const PlayInstructions = () => (
  <Fragment>
    <Helmet>
      <title>QuizVista - Instructions</title>
    </Helmet>
    <div className="flex flex-col items-center justify-center min-h-screen m-2 py-8 px-4 border border-gray-950 ">
      <h1 className="text-2xl font-bold mb-4">How to Play the Game</h1>
      <p className="mb-4">Ensure you read this guide from start to finish.</p>
      <ul className="list-disc list-inside space-y-4">
        <li>
          Participants will have 20 minutes to complete the quiz.
        </li>
        <li>
          The quiz consists of 20 questions.
        </li>
        <li>
          All questions will be multiple choice.
          <img className="w-96 mt-2" src={multiplechoice} alt="Multiple Choice Example" />
        </li>
        <li>
          Select the option which best answers the question by clicking (or selecting) it.
          <img className="w-96 mt-2" src={answer} alt="Answer Example" />
        </li>
        <li>
          Using a hint <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span> by clicking the icon will remove one wrong answer leaving two wrong answers and one correct answer. You can use as many hints as possible on a single question.
          
        </li>
      </ul>
      <div className="flex justify-between w-full mt-8">
        <Link className="text-blue-500" to="/">No, take me back</Link>
        <Link className="text-blue-500" to="/Play/quiz">Okay, let's begin!</Link>
      </div>
    </div>
  </Fragment>
);

export default PlayInstructions;
