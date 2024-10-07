import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import QuizStyles from "../styles/MyQuizzes.module.css";

const MyQuizzes = () => {
  const navigate = useNavigate();

  const [myQuizzes, setMyQuizzes] = useState([]);

  useEffect(() => {
    
    axios
      .get(`http://localhost:3002/quiz`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      })

      .then((res) => {
        const myQuiz = res.data.data;
        setMyQuizzes(myQuiz);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteQuiz = (quizId) => {
    // const quizId = localStorage.getItem("loginToken");

    axios
      .delete(`http://localhost:3002/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      })

      .then((res) => {
        setMyQuizzes(myQuizzes.filter((quiz) => quiz._id !== quizId));
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handlePublishQuiz = (quizId) => {
    //  const quizId = localStorage.getItem("quizId");
console.log(quizId);
    axios
      .patch(
        "http://localhost:3002/quiz/publish",
        { quizId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      )

      .then((res) => {
        setMyQuizzes(
          myQuizzes.map((quiz) =>
            quiz._id === quizId ? { ...quiz, isPublished: true } : quiz
          )
        );
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleEditQuiz = (quizId) => {
    navigate(`/edit-quiz/${quizId}`);
  };

  return (
    <>
      <Navbar />

      <div className={QuizStyles.myQuiz}>
        <h2>My Quizzes</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myQuizzes.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No quiz found
                </td>
              </tr>
            ) : (
              myQuizzes.map((quiz) => (
                <tr key={quiz._id}>
                  <td>{quiz.name}</td>
                  <td>{quiz.category}</td>
                  <td>
                    <div className={QuizStyles.buttonGroup}>
                      {!quiz.isPublished ? (
                        <>
                          <button
                            className={QuizStyles.editbutton}
                            onClick={() => handleEditQuiz(quiz._id)}
                          >
                            Edit
                          </button>
                          <button
                            className={QuizStyles.deletebutton}
                            onClick={() => handleDeleteQuiz(quiz._id)}
                          >
                            Delete
                          </button>
                          <button
                            className={QuizStyles.publishBtn}
                            onClick={() => handlePublishQuiz(quiz._id)}
                          >
                            Publish
                          </button>
                        </>
                      ) : (
                        <>
                          {/* <span>(Published)</span> */}
                          <button
                            className={QuizStyles.editBtn}
                            disabled
                          >
                            Edit
                          </button>
                          <button
                            className={QuizStyles.deleteBtn}
                            disabled
                          >
                            Delete
                          </button>
                          <button
                            className={QuizStyles.publishBtn}
                            disabled
                          >
                            Publish
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyQuizzes;
