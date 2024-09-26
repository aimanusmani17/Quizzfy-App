import React from 'react';
import NavStyles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import  LogoutImage  from "../assets/quizImg/logout-icon.png";
import ProfileImage from "../assets/quizImg/profile.jpg";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
      };
      // const handleProfile =() => {
      //   localStorage.removeItem('token'); 
      //   localStorage.removeItem('user'); 
    
      
      //   navigate('/profile');

      // }
      const handleLogout = () => {
        
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); 
    
      
        navigate('/login');
      };
      
  return (
    <>
    <div className={NavStyles.navbar}>
          <span  className={NavStyles.heading}>Quizzfy</span>


          <div className={NavStyles.navLinks}>
            <span onClick={() => handleNavigation('/home')} className={NavStyles.navLink}>Home</span>
            <span onClick={() => handleNavigation('/create-quiz')} className={NavStyles.navLink}>Create Quiz</span>
            <span onClick={() => handleNavigation('/my-quizzes')} className={NavStyles.navLink}>My Quizzes</span>
            <span onClick={() => handleNavigation('/all-reports')} className={NavStyles.navLink}>Quiz Report</span>
            <span onClick={() => handleNavigation('/attemptQuiz')} className={NavStyles.navLink}>Attempt Quiz</span>
          </div>
          <img src={ProfileImage} alt="Profile" title="Profile"
          onClick={() => navigate('/profile')} className={NavStyles.ProfileBtn} />
          <img src={LogoutImage} alt="Logout" title="Logout"
          onClick={handleLogout} className={NavStyles.logoutBtn} />
        </div>

    </>
  )
};

export default Navbar;
