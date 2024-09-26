
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizStyles from "../styles/EditQuiz.module.css";
import Navbar from "../components/Navbar";
import axios from "axios";

const EditQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    _id: quizId,
    name: "",
    category: "",
    difficultyLevel: "",
    questionList: [{ questionNumber: 1, question: "", options: [] }],
    answers: {},
    allowedUser: [],
    passingPercentage: 0,
    isPublicQuiz: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("loginToken");

    axios
      .get(`http://localhost:3002/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedQuiz = response.data.data;
        
        setValues(fetchedQuiz);
      })
      .catch((error) => {
        console.error("Error fetching quiz details:", error);
      });
  }, [quizId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...values.questionList];
    updatedQuestions[index].question = e.target.value;
    setValues({ ...values, questionList: updatedQuestions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const updatedQuestions = [...values.questionList];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setValues({ ...values, questionList: updatedQuestions });
  };

  const handleAnswerChange = (questionNumber, e) => {
    const updatedAnswers = { ...values.answers, [questionNumber]: e.target.value };
    setValues({ ...values, answers: updatedAnswers });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...values.questionList];
    if (updatedQuestions[questionIndex].options.length < 4) {
      updatedQuestions[questionIndex].options.push("");
      setValues({ ...values, questionList: updatedQuestions });
    }
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...values.questionList];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setValues({ ...values, questionList: updatedQuestions });
  };

  const handleAddQues = () => {
    if (values.questionList.length < 10) {
      const newQuestion = { questionNumber: values.questionList.length + 1, question: "", options: [] };
      setValues({ ...values, questionList: [...values.questionList, newQuestion] });
    }
  };

  const handleUpdateQuiz = () => {
    const token = localStorage.getItem("loginToken");
    console.log(values);
    axios
      .put(`http://localhost:3002/quiz`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate(`/my-quizzes`);
      })
      .catch((error) => {
        console.error("Error updating quiz:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className={QuizStyles.editQuiz}>
        <h2 className={QuizStyles.heading}>Edit Quiz</h2>
        <div className={QuizStyles.container}>
          <label className={QuizStyles.label}>Quiz Name:</label>
          <input type="text" className={QuizStyles.quizName} name="name" value={values.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" className={QuizStyles.quizCategory} value={values.category} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="difficultyLevel">Level:</label>
          <select name="difficultyLevel" className={QuizStyles.quizDiffLevel} value={values.difficultyLevel} onChange={handleInputChange}>
            <option value="">Select Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="isPublicQuiz">Privacy: </label>
          <select name="isPublicQuiz" value={values.isPublicQuiz} className={QuizStyles.quizPrivacy} onChange={handleInputChange}>
            <option value="">Choose Option</option>
            <option value={false}>Private</option>
            <option value={true}>Public</option>
          </select>
        </div>
        <div>
          <label htmlFor="passingPercentage">Passing Percentage: </label>
          <input
            className={QuizStyles.formField}
            type="number"
            placeholder="Enter your passing percentage"
            name="passingPercentage"
            required
            value={values.passingPercentage}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {values.questionList.map((q, index) => (
            <div key={index} className={QuizStyles.questionCard}>
              <form>
                <div className={QuizStyles.questionaire}>
                  <div className={QuizStyles.inputField}>
                    <div>
                      <label>Question. {index + 1}</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        className={QuizStyles.quesField}
                        placeholder="Write your question here"
                        name="question"
                        required
                        value={q.question}
                        onChange={(e) => handleQuestionChange(e, index)}
                      />
                    </div>
                  </div>
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className={QuizStyles.options}>
                      <input
                        className={QuizStyles.options}
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        name="option"
                        value={opt.option}
                        onChange={(e) => handleOptionChange(e, index, oIndex)}
                      />
                      {q.options.length > 1 && (
                        <button
                          type="button"
                          className={QuizStyles.rmvBtn}
                          onClick={() => handleRemoveOption(index, oIndex)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {q.options.length < 4 && (
                    <button type="button" className={QuizStyles.addBtn} onClick={() => handleAddOption(index)}>
                      Add Option
                    </button>
                  )}
                </div>
                <label>Correct Answer:</label>
                <input
                  type="number"
                  value={values.answers[index + 1] || ""}
                  onChange={(e) => handleAnswerChange(index + 1, e)}
                  placeholder="Enter correct option number"
                  className={QuizStyles.correctAnswerInput}
                />
              </form>
            </div>
          ))}
          {values.questionList.length < 10 && (
            <div className={QuizStyles.addQdiv}>
              <button type="button" className={QuizStyles.addQue} onClick={handleAddQues}>
                Add Question
              </button>
            </div>
          )}
        </div>
        <button type="button" className={QuizStyles.btnCreate} onClick={handleUpdateQuiz}>
          Update Quiz
        </button>
      </div>
    </>
  );
};

export default EditQuiz;
