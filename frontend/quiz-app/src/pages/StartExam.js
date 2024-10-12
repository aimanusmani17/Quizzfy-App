import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Add useParams to get quizId
import ExamStyles from "../styles/StartExam.module.css";

const StartExam = () => {
  const [quizzes, setQuizzes] = useState([]); // UseState for quizzes
  const [currentQuiz, setCurrentQuiz] = useState(); // UseState for currentQuiz
  const [attemptedAnswers, setAttemptedAnswers] = useState({}); // UseState for attemptedAnswers
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);
  const navigate = useNavigate();
  const { quizId } = useParams(); // Extract quizId from the URL

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    const userId = localStorage.getItem("userId");

    if (quizId) {
      axios
        .get(`https://quizzfy-app.onrender.com/exam/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCurrentQuiz(res.data.data); // using 'res' here
          console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [quizId]); // Add quizId as a dependency to ensure useEffect re-runs when quizId is available

  const handleAnswerChange = (questionNumber, answer) => {
    setAttemptedAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  const handleSubmitQuiz = () => {
    const token = localStorage.getItem("loginToken");

    axios
      .post(
        `http://localhost:3002/exam`,
        {
          quizId: currentQuiz._id,
          attemptedQuestion: attemptedAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { reportId } = res.data.data;
         navigate(`/detail-reports/${reportId}`, { state: { token } });

        // navigate(`/detail-reports`);

        console.log("Quiz submitted successfully:", res.data);
      })
      .catch((err) => {
        console.error("Error submitting quiz:", err);
      });
  };

  // Moved handleFavoriteQuestion outside handleSubmitQuiz
  const handleFavoriteQuestion = (response, question) => {
    if (response && question?._id) {
      const favQuestion = response;

      setFavoriteQuestions((prevFavorites) => [
        ...prevFavorites,
        { favQuestionId: favQuestion._id, questionId: question._id },
      ]);
    }
  };

  return (
    <>
    <div className={ExamStyles.main}>
      {currentQuiz && (
        <div className={ExamStyles.form}>
          <h2>{currentQuiz.name}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitQuiz();
            }}
          >
            {currentQuiz.questionList.map((question) => (
              <div key={question._id}>
                <p>
                  <strong>
                    {question.questionNumber}. {question.question}
                  </strong>
                </p>
                <ul>
                  {Object.entries(question.options).map(
                    ([optionKey, optionValue]) => (
                      <li key={optionKey}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${question.questionNumber}`}
                            value={optionKey}
                            onChange={(e) =>
                              handleAnswerChange(
                                question.questionNumber,
                                optionKey
                              )
                            }
                            required
                          />
                          {optionValue}
                        </label>
                      </li>
                    )
                  )}
                </ul>
                <button className={ExamStyles.btnFav} type="button" onClick={()=>handleFavoriteQuestion(currentQuiz, question)}>
                  {favoriteQuestions?.some(
                    (fav) => fav.questionId === question._id
                  )
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </div>
            ))}
            <button className={ExamStyles.btnSubmit}  type="submit"
            // onClick={()=> navigate("/reports")}
            >Submit Quiz</button>
          </form>
        </div>
      )}
      </div>
    </>
  );
};

export default StartExam;
