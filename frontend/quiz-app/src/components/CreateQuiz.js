import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizStyles from "../styles/CreateQuiz.module.css";
import Navbar from "../components/Navbar";
import axios from "axios";

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    category: "",
    difficultyLevel: "",
    questionList: [{ questionNumber: 1, question: "", options: {} }],
    answers: {},
    // privacy: "",
    allowedUser: [],
    passingPercentage: 0,
    // attemptsAllowedPerUser: 0,
    isPublicQuiz: true,
    // isPublished: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [quesList, setQuesList] = useState([
    { question: "", options: [{ option: "" }] },
  ]);

  const handleAddQues = () => {
    setQuesList([...quesList, { question: "", options: [{ option: "" }] }]);
  };

  const handleRemoveQues = (index) => {
    const qList = [...quesList];
    qList.splice(index, 1);
    setQuesList(qList);
  };

  const handleAnswerChange = (questionNumber, e) => {
    const { value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [questionNumber]: Number(value),
      },
    }));
  };

  const handleOptionChange = (e, qIndex, oIndex) => {
    const { value } = e.target;
    const updatedQuesList = [...quesList];
    updatedQuesList[qIndex].options[oIndex].option = value;
    setQuesList(updatedQuesList);
  };

  const handleAddOption = (qIndex) => {
    const updatedQuesList = [...quesList];
    if (updatedQuesList[qIndex].options.length < 4) {
      updatedQuesList[qIndex].options.push({ option: "" });
      setQuesList(updatedQuesList);
    }
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const updatedQuesList = [...quesList];
    updatedQuesList[qIndex].options.splice(oIndex, 1);
    setQuesList(updatedQuesList);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleQuestionChange = (e, index) => {
    const { value } = e.target;
    const updatedQuesList = [...quesList];
    updatedQuesList[index].questionNumber = index + 1;
    updatedQuesList[index].question = value;
    setQuesList(updatedQuesList);
  };

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    console.log(quesList);

    setSubmitted(true);

    setValid(true);

    const requestBody = {
      name: values.name || "", // Ensure it's a non-empty string
      category: values.category || "", // Ensure it's a non-empty string
      difficultyLevel: values.difficultyLevel || "", // Ensure it's a non-empty string
      questionList: quesList.length ? quesList : [], // Ensure it's a non-empty array
      passingPercentage: values.passingPercentage || 0, // Ensure it's a number
      isPublicQuiz:
        values.isPublicQuiz !== undefined ? values.isPublicQuiz : true,
      answers: Object.keys(values.answers).length ? values.answers : {}, // Ensure it's a non-empty object
    };

    console.log(requestBody); // Debugging the final request body

    const token = localStorage.getItem("loginToken");

    axios
      .post(`https://quizzfy-app.onrender.com/quiz/`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/my-quizzes')
      })
      .catch((err) => console.log(err));
  };

  const { questionList, answers, ...restOfQuiz } = values;

  return (
    <>
      <Navbar />
      <div className={QuizStyles.main}>
        <h1 className={QuizStyles.heading}>Create Quiz</h1>

        <div className={QuizStyles.pageContent}>
          <div className={QuizStyles.pageHeader}>
            <div className={QuizStyles.formCard}>
              <form className={QuizStyles.quizForm}>
                <div className={QuizStyles.quizName}>
                <label htmlFor="name" className={QuizStyles.quesLabel}>Quiz Name: </label>
                <input
                  className={QuizStyles.formField}
                  type="text"
                  placeholder="Enter quiz name"
                  name="name"
                  required
                  value={values.name}
                  onChange={handleInputChange}
                />
                {submitted && !values.name && (
                  <span id="name-error">Please enter quiz name</span>
                )}
                </div>
                <div className={QuizStyles.selectContainer}>
                <div className={QuizStyles.selectOption}>
                <label htmlFor="category">Category: </label>
                <select
                  name="category"
                  value={values.category}
                  onChange={handleInputChange}
                  className={QuizStyles.formField}
                >
                  <option value="">Choose Option</option>
                  <option value="exam">Exam</option>
                  <option value="test">Test</option>
                </select>
                {submitted && !values.category && (
                  <span id="category-error">Please enter quiz category</span>
                )}
                </div>
                <div className={QuizStyles.selectOption}>
                <label htmlFor="difficultyLevel">Level: </label>
                <select
                  name="difficultyLevel"
                  value={values.difficultyLevel}
                  onChange={handleInputChange}
                  className={QuizStyles.formField}
                >
                  <option value="">Choose Option</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Difficult</option>
                </select>
                {submitted && !values.difficultyLevel && (
                  <span id="difficultyLevel-error">
                    Enter quiz difficultyLevel:
                  </span>
                )}
                </div>

                <div className={QuizStyles.selectOption}>
                <label htmlFor="isPublicQuiz">Privacy: </label>
                <select
                  name="isPublicQuiz"
                  value={values.isPublicQuiz}
                  onChange={handleInputChange}
                  className={QuizStyles.formField}
                >
                  <option value="">Choose Option</option>
                  <option value={false}>Private</option>
                  <option value={true}>Public</option>
                </select>
                {submitted && !values.privacy && (
                  <span id="privacy-error">Enter quiz privacy:</span>
                )}
                </div>
                <div className={QuizStyles.selectOption}>
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
                {submitted && !values.passingPercentage && (
                  <span id="passingPercentage-error">
                    Enter the passing percentage:
                  </span>
                )}
                </div>
                </div>

              

              </form>
            </div>

          

            {quesList.map((q, index) => (
              <div key={index} className={QuizStyles.questionCard}>
                <form>
                  <div className={QuizStyles.questionaire}>
                    <div className={QuizStyles.inputField}>
                      <div>
                        <label>Question. {index + 1}</label>
                      </div>

                      <div className={QuizStyles.quesField}>
                        <input
                          type="text"
                          placeholder="Write your question here"
                          name="question"
                          className={QuizStyles.quesFieldInput}
                          required
                          value={q.question}
                          onChange={(e) => handleQuestionChange(e, index)}
                        />
                      </div>
                    </div>
                    {/* Render Options */}
                    {q.options.map((opt, oIndex) => (
                      <div key={oIndex} className={QuizStyles.optionsContainer}>
                        <input
                          className={QuizStyles.options}
                          type="text"
                          placeholder={`Option ${oIndex + 1}`}
                          name="option"
                          value={opt.option}
                          onChange={(e) => handleOptionChange(e, index, oIndex)}
                        />

                        {q.options.length !== 1 && (
                          <button
                            type="button"
                            className={QuizStyles.rmvBtn}
                            onClick={() => handleRemoveOption(index, oIndex)}
                          > <i class="fas fa-trash-alt"></i>
                            

                            
                          </button>
                        )}
                      </div>
                    ))}
                    {q.options.length < 4 && (
                      <button
                        type="button"
                        className={QuizStyles.addBtn}
                        onClick={() => handleAddOption(index)}
                      >
                        Add Option
                      </button>
                    )}
                  </div>
                  <div className={QuizStyles.correctAnswerContainer}>
                    <span className={QuizStyles.correctAnswerLabel}>
                      Correct Answer:
                    </span>
                    <input
                      type="number"
                      value={values.answers[index + 1] || ""}
                      onChange={(e) => handleAnswerChange(index + 1, e)}
                      placeholder="Enter correct option number"
                      className={QuizStyles.correctAnswerInput}
                    />
                  </div>
                  <div className={QuizStyles.btnRemoveContainer}>
                    <button
                      type="button"
                      className={QuizStyles.rmvQuesBtn}
                      onClick={() => handleRemoveQues(index)}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            ))}
            <div className={QuizStyles.addQdiv}>
              {quesList.length < 10 && (
                <button
                  type="button"
                  className={QuizStyles.addQue}
                  onClick={handleAddQues}
                >
                  Add Question
                </button>
              )}
            </div>
            <button
              type="submit"
              className={QuizStyles.btnCreate}
              onClick={handleCreateQuiz}
            >
              Create <br></br>Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
