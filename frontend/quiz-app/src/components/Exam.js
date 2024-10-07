
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExamStyles from "../styles/Exam.module.css";

const Exam = () => {
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
        // const availableQuizzes = res.data.data.filter(
          // (quiz) => quiz.createdBy !== userId
        // ); // Corrected 'res' usage
        const availableQuizzes = res.data.data;
        setQuizzes(availableQuizzes);
        console.log(availableQuizzes);
      })
      .catch((err) => console.log(err));
  }, []);

 
  

  return (
    <>
      <Navbar />
      <div className={ExamStyles.examContainer}>
        <h1 className={ExamStyles.heading}>Available Quizzes</h1>
        <table className={ExamStyles.table}>
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td>{quiz.name}</td>
                <td>
                  <button
                    className={ExamStyles.btn}
                    onClick={() =>  navigate(`/start-exam/${quiz._id}`)}
                  >
                    Start Exam Quiz
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}  

export default Exam;

