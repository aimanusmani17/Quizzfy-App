
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import LoginStyles from "../styles/Login.module.css";
import quizImage from "../assets/quizImg/quizlogin.png";
import axios from "axios";
import { BlinkBlur} from "react-loading-indicators";

const Login = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(""); // To display any errors

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Check if both email and password are filled
    const isValid = values.email && values.password;
    setValid(isValid);

    if (isValid) {
      setLoading(true);

      const data = {
        email: values.email,
        password: values.password,
      };

      // Make API call to login
      axios
        .post("https://quizzfy-app.onrender.com/auth/login", data)
        .then((res) => {
          console.log(res.data.data.token);
          localStorage.setItem('loginToken',res.data.data.token )
          // Navigate to the home page on successful login
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          setError("Invalid email or password"); // Set error message
        })
        .finally(() => {
          setLoading(false);  // Step 3: Hide loader after completion
        });
    } else {
      setError("Please fill in both email and password fields");
    }
    
  };

  return (
    <>
      <div className={LoginStyles.main}>
        <h1 className={LoginStyles.heading}>Quizzfy</h1>
        <div className={LoginStyles.pageContent}>
          <div className={LoginStyles.imageContainer}>
            <img src={quizImage} width={400} height={400} alt="Quiz" />
          </div>
          <div className={LoginStyles.form}>
            <h1 className={LoginStyles.headingTwo}>Login Here</h1>
            <form className={LoginStyles.LoginForm} onSubmit={handleSubmit}>
              {/* <label htmlFor="email">Email: </label> */}
              <input
                className={LoginStyles.formField}
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                name="email"
                value={values.email}
                onChange={handleInputChange}
              />
              {submitted && !values.email && (
                <span className={LoginStyles.error}>Please enter your email address</span>
              )}

              {/* <label htmlFor="password">Password: </label> */}
              <input
                className={LoginStyles.formField}
                type="password"
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
              />
              {submitted && !values.password && (
                <span className={LoginStyles.error}>Please enter your password</span>
              )}

              {error && <span className={LoginStyles.error}>{error}</span>}
              <div className={LoginStyles.btnContainer}>
                <button className={LoginStyles.Regbutton} type="submit">
               
              {loading ? (
                <BlinkBlur className={LoginStyles.loadingBar} color="#4931cc" size="small" text="loading" textColor="" />
              ) : (
                "Login"                
              )}
              
                
                </button>
                <br />
                <label className={LoginStyles.confirmLabel}>
              Not Registered? Then {" "}
              <Link to="/" className={LoginStyles.loginLink}>
                Register
              </Link>
            </label>
            <br />
                {/* <button className={LoginStyles.Regbutton} onClick={() => navigate("/")}>
                  Register
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
