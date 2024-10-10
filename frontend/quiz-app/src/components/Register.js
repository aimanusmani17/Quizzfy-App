

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RegisterStyles from "../styles/Register.module.css";
import quizImage from "../assets/quizImg/quiz.jpg";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    const validationErrors = {};

    // Name validation
    if (values.name.length < 4) {
      formIsValid = false;
      validationErrors.name = 'Name must be at least 4 characters long.' ;
      // toast.error('Name must be at least 4 characters long.');
    }

    if (typeof values.name !== "undefined") {
      if (!values.name.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        validationErrors.name = "*Please enter alphabet characters only.";
       
      }

      if (values.name.charAt(0) === ' ') {
        formIsValid = false;
        validationErrors.name = "*Name cannot be empty.";
      
      }
    }

    // Email validation
    if (!values.email) {
      formIsValid = false;
      validationErrors.email = "Please enter your email address";
     
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      formIsValid = false;
      validationErrors.email = "Please enter a valid email address";
      
    }

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!values.password) {
      formIsValid = false;
      validationErrors.password = "Please enter a password";
     
    } else if (!passwordRegex.test(values.password)) {
      formIsValid = false;
      validationErrors.password = 'Password must be at least 8 characters long and contain at least one special character.';
      
    }

    // Confirm password validation
    if (!values.confirmPassword) {
      formIsValid = false;
      validationErrors.confirmPassword = "Please confirm your password";
     
    } else if (values.password !== values.confirmPassword) {
      formIsValid = false;
      validationErrors.confirmPassword = "Passwords do not match";

    }

    setErrors(validationErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setLoading(true);

      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      axios
        .post("https://quizzfy-app.onrender.com/auth", data)
        .then((res) => {
          localStorage.setItem('token', res.data.data.token);
          toast.success('Registration successful!');
          navigate("/otp");
        })
        .catch((err) => {

          if (err.response && err.response.status === 201) {
           
            toast.error('User already exists. Please try logging in.');
          } else {
            toast.error('Registration failed. Please try again.');
          }
        })
        .finally(() => {
          setLoading(false);  // Step 3: Hide loader after completion
        });
          
         
    } else {
      // toast.error('Please fix the errors before submitting.');
    }

   
  };

  return (
    <div className={RegisterStyles.main}>
      <h1 className={RegisterStyles.heading}>Quizzfy</h1>
      <div className={RegisterStyles.pageContent}>
        <div className={RegisterStyles.imageContainer}>
          <img src={quizImage} width={400} height={400} alt="Quiz" />
        </div>
        <div className={RegisterStyles.form}>
          <h1 className={RegisterStyles.headingTwo}>Register Here</h1>
          <form className={RegisterStyles.registerForm} onSubmit={handleSubmit}>
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

            <input
              className={RegisterStyles.formField}
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className={RegisterStyles.errorMessage}>
                {errors.email}
              </span>
            )}

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
                disabled={loading}
                type="submit"
              >
               
                {loading ? (
                  <div className={RegisterStyles.spinner}></div>  
                ) : (
                  "Register"
                )}
                
              </button>
              <br />
            </div>

            <label className={RegisterStyles.confirmLabel}>
              Already registered? Then {" "}
              <Link to="/login" className={RegisterStyles.loginLink}>
                Login
              </Link>
            </label>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
