import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExamStyles from "../styles/Exam.module.css";

const Test = () => {
  const [quizzes, setQuizzes] = useState([]); // Added useState for quizzes
  const [currentQuiz, setCurrentQuiz] = useState(); // Added useState for currentQuiz
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    const fetchQuiz=localStorage.getItem("loginToken")

    // Assuming 'userId' is stored somewhere in localStorage or retrieved from the backend
    const userId = localStorage.getItem("userId");

    axios
      .get("https://quizzfy-app.onrender.com/quiz/allpublishedquiz/exam", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
       
        const availableQuizzes = res.data.data;
        setQuizzes(availableQuizzes);
        console.log(availableQuizzes);
      })
      .catch((err) => console.log(err));
  }, []);





  return (
    <>
     <>
      <Navbar />
      <div className={ExamStyles.examMain}>
      <h1 className={ExamStyles.heading}>Available Test Quizzes</h1>
  <div className={ExamStyles.examContainer}>
   
    <table className={ExamStyles.table}>
      <thead>
        <tr>
          <th>Quiz Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {quizzes.length=== 0 ? (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>No quiz found </td>
            </tr>
            ) : (
        
        quizzes.map((quiz) => (
          <tr key={quiz._id}>
            <td>{quiz.name}</td>
            <td>
              <button
                className={ExamStyles.btn}
                onClick={() => navigate(`/start-test/${quiz._id}`)}
              >
                Start Test Quiz
              </button>
            </td>
          </tr>
        ))
      )}
      </tbody>
    </table>
  </div>
</div>

    </>
  
    </>
  )
}

export default Test