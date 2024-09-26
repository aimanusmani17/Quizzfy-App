import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import CreateQuiz from "./components/CreateQuiz";
import OtpVerify from "./components/OtpVerify";
import React, { useState, useEffect } from "react";
// import QuizList from "./components/QuizList";
import Reports from "./components/Reports";
import Navbar from "./components/Navbar";
import MyQuizzes from "./components/MyQuizzes";
import EditQuiz from "./components/EditQuiz";
import AttemptQuiz from "./pages/AttemptQuiz";
import DetailReports from "./pages/DetailReports"
import Exam from "./components/Exam";
import Profile from "./components/Profile";

import Test from "./components/Test";
import FavouriteQ from "./components/FavouriteQ";
import StartExam from "./pages/StartExam";
import StartTest from "./pages/StartTest";
import DeactivateAccount from "./components/Deactivate"
import VerifyDeactivate from "./pages/VerifyDeactivate"



function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#2b71a4";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  const handleLogin = () => {
    // Call this function when login is successful
    setShowNavbar(true);
  };
 

  const [token, setToken] = useState("");
  console.log(token);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/create-quiz",
      element: <CreateQuiz />,
    },
    {
      path: "/otp",
      element: <OtpVerify />,
    },
    
    {
      path: "/all-reports",
      element: <Reports />,
    },
    {
      path: "/detail-reports/:reportId",
      element: <DetailReports />,
    },

    {
      path: "/my-quizzes",
      element: <MyQuizzes />,
    },
    {
      path: "/edit-quiz/:quizId",
      element: <EditQuiz />,
    },
    {
      path: "/exam",
      element: <Exam />,
    },
    {
      path: "test",
      element: <Test />,
    },
    {
      path: "/favouriteQ",
      element: <FavouriteQ />,
    },
    {
      path: "/attemptQuiz",
      element: <AttemptQuiz />,
    },
    {
      path: "/start-exam/:quizId",
      element: <StartExam />,
    },
    {
      path: "/start-test/:quizId",
      element: <StartTest />,
    },
    {
      path: "/deactivate-account",
      element: <DeactivateAccount />,
    },
    {
      path: "/verify-deactivate",
      element: <VerifyDeactivate />,
    },
  ]);
  return (
    <>
     {/* <Navbar/> */}
    
      <RouterProvider
       router={router} />
     
      
    </>
  );
}

export default App;