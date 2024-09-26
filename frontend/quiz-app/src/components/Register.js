
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterStyles from "../styles/Register.module.css";
import quizImage from "../assets/quizImg/quiz.jpg";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Enable/Disable submit button based on form completion
  useEffect(() => {
    const allFieldsFilled =
      values.name &&
      values.email &&
      values.password &&
      values.confirmPassword &&
      values.password === values.confirmPassword;

    setIsDisabled(!allFieldsFilled);
  }, [values]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Name validation
    if (!values.name) {
      formIsValid = false;
      newErrors.name = "Please enter your name";
    }

    // Email validation
    if (!values.email) {
      formIsValid = false;
      newErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      formIsValid = false;
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!values.password) {
      formIsValid = false;
      newErrors.password = "Please enter a password";
    } else if (values.password.length < 6) {
      formIsValid = false;
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Confirm Password validation
    if (!values.confirmPassword) {
      formIsValid = false;
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      formIsValid = false;
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      axios
        .post("http://localhost:3002/auth", data)
        .then((res) => {
          localStorage.setItem('token',res.data.data.token )
          console.log(res.data.data.token);
          navigate("/otp");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={RegisterStyles.main}>
      <h1 className={RegisterStyles.heading}>Quizzify</h1>
      <div className={RegisterStyles.pageContent}>
        <div className={RegisterStyles.imageContainer}>
          <img src={quizImage} width={400} height={400} alt="Quiz" />
        </div>
        <div className={RegisterStyles.form}>
          <h1 className={RegisterStyles.headingTwo}>Register Here</h1>
          <form className={RegisterStyles.registerForm} onSubmit={handleSubmit}>
            {submitted && (
              <div className={RegisterStyles.successMessage}>
                <h3>Welcome {values.name}</h3>
              </div>
            )}

            <label htmlFor="name">Name:</label>
            <input
              className={RegisterStyles.formField}
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <span className={RegisterStyles.errorMessage}>{errors.name}</span>
            )}

            <label htmlFor="email">Email:</label>
            <input
              className={RegisterStyles.formField}
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className={RegisterStyles.errorMessage}>{errors.email}</span>
            )}

            <label htmlFor="password">Password:</label>
            <input
              className={RegisterStyles.formField}
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className={RegisterStyles.errorMessage}>
                {errors.password}
              </span>
            )}

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              className={RegisterStyles.formField}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <span className={RegisterStyles.errorMessage}>
                {errors.confirmPassword}
              </span>
            )}

            <br />
            <div className={RegisterStyles.btnContainer}>
              <button
                className={RegisterStyles.Regbutton}
                disabled={isDisabled}
                type="submit"
              >
                Submit
              </button>
              <br />
              <button
                className={RegisterStyles.Regbutton}
                type="button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
            <label>Already registered? Then Login</label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
