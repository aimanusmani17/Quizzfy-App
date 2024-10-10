import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import AttemptQuizStyles from '../styles/AttemptQuiz.module.css'; 

const AttemptQuiz = () => {
    const navigate = useNavigate();

    const goToExam = () => {
      navigate('/exam');
    };
  
    const goToTest = () => {
      navigate('/test');
    };
  
    const goToFavorites = () => {
      navigate('/favouriteQ');
    };
  return (
    <>
    <Navbar />
    <div className={AttemptQuizStyles.main}>
    <h2 className={AttemptQuizStyles.mainHeading}>Attempt Quiz</h2>
    <div className={AttemptQuizStyles.container}>
      
      <h3>Challenge Your Mind, Test Your Skills—Take the Quiz Now!</h3>

      <div className={AttemptQuizStyles.buttonContainer}>
        <p>Take the Exam</p>
        <button className={AttemptQuizStyles.atmbutton} onClick={goToExam}>
          Go to Exam
        </button>
      </div>

      <div className={AttemptQuizStyles.buttonContainer}>
        <p>Start Test</p>
        <button className={AttemptQuizStyles.atmbutton} onClick={goToTest}>
          Go to Test
        </button>
      </div>

      {/* <div className={AttemptQuizStyles.buttonContainer}>
        <p>View Favorite Questions</p>
        <button className={AttemptQuizStyles.atmbutton} onClick={goToFavorites}>
          Go to Favorites
        </button>
      </div> */}



    </div>
    </div>
    </>
  )
}

export default AttemptQuiz