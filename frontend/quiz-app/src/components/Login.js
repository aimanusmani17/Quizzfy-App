// import React, { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import LoginStyles from "../styles/Login.module.css";
// import quizImage from "../assets/quizImg/quizlogin.webp";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();

//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const data = {
//     email: values.email,
//     password: values.password
//   }

//   axios
//   .post("http://localhost:3002/auth/login", data)
//   .then((res) => {
//     console.log(res.data.data.token);
//     navigate("/home");
//   })
//   .catch((err) => console.log(err));


  
//   const [submitted, setSubmitted] = useState(false);
//   const [valid, setValid] = useState(false);

//   const handleInputChange = (event) => {
//     // event.preventDefault();
//     const { name, value } = event.target;
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const isValid = values.email && values.password && setValid(isValid);
//     setSubmitted(true);

//     if (isValid) {
//       // Optional: Navigate if form is valid
//       navigate("/create-quiz");
//     }
//   }

//   return (
//     <>
//       <div className={LoginStyles.main}>
//         <h1 className={LoginStyles.heading}>Login</h1>
//         <div className={LoginStyles.pageContent}>
//           <div className={LoginStyles.imageContainer}>
//             <img src={quizImage} width={400} height={400} alt="Quiz" />
//           </div>
//           <div className={LoginStyles.form}>
//             <h1 className={LoginStyles.headingTwo}>Login Here</h1>
//             <form className={LoginStyles.LoginForm} onSubmit={handleSubmit}>
//               <label htmlFor="name">Email: </label>
//               <input
//                 className={LoginStyles.formField}
//                 type="text"
//                 placeholder="Enter email id"
//                 autoComplete="off"
//                 name="email"
//                 value={values.email}
//                 onChange={handleInputChange}
//               />
//               {submitted && !values.email && (
//                 <span id="name-error">Please enter your email address</span>
//               )}

//               <label htmlFor="name">Password: </label>
//               <input
//                 className={LoginStyles.formField}
//                 type="password"
//                 placeholder="Enter your password"
//                 name="password"
//                 value={values.password}
//                 onChange={handleInputChange}
//               />
//               {submitted && !values.email && (
//                 <span id="name-error">Please enter your password</span>
//               )}
//             </form>

//             <div className={LoginStyles.btnContainer}>
//               <button className={LoginStyles.Regbutton }onClick={() => navigate("/home")}>Login</button>
//               <button className={LoginStyles.Regbutton }onClick={() => navigate("/")}>Register</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )

// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginStyles from "../styles/Login.module.css";
import quizImage from "../assets/quizImg/quizlogin.webp";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

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
      const data = {
        email: values.email,
        password: values.password,
      };

      // Make API call to login
      axios
        .post("http://localhost:3002/auth/login", data)
        .then((res) => {
          console.log(res.data.data.token);
          localStorage.setItem('loginToken',res.data.data.token )
          // Navigate to the home page on successful login
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          setError("Invalid email or password"); // Set error message
        });
    } else {
      setError("Please fill in both email and password fields");
    }
  };

  return (
    <>
      <div className={LoginStyles.main}>
        <h1 className={LoginStyles.heading}>Login</h1>
        <div className={LoginStyles.pageContent}>
          <div className={LoginStyles.imageContainer}>
            <img src={quizImage} width={400} height={400} alt="Quiz" />
          </div>
          <div className={LoginStyles.form}>
            <h1 className={LoginStyles.headingTwo}>Login Here</h1>
            <form className={LoginStyles.LoginForm} onSubmit={handleSubmit}>
              <label htmlFor="email">Email: </label>
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

              <label htmlFor="password">Password: </label>
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
                  Login
                </button>
                <button className={LoginStyles.Regbutton} onClick={() => navigate("/")}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
