// import React from 'react';
// import NavStyles from "../styles/Navbar.module.css";
// import { useNavigate } from "react-router-dom";
// import  LogoutImage  from "../assets/quizImg/logout-icon.png";
// import ProfileImage from "../assets/quizImg/profile.jpg";

// export const Navbar = () => {
//     const navigate = useNavigate();

//     const handleNavigation = (path) => {
//         navigate(path);
//       };
    
//       const handleLogout = () => {
        
//         localStorage.removeItem('token'); 
//         localStorage.removeItem('user'); 
    
      
//         navigate('/login');
//       };
      
//   return (
//     <>
//     <div className={NavStyles.navbar}>
//           <span  className={NavStyles.heading}>Quizzfy</span>


//           <div className={NavStyles.navLinks}>
//             <span onClick={() => handleNavigation('/home')} className={NavStyles.navLink}> <i className="fas fa-home"></i>Home</span>
//             <span onClick={() => handleNavigation('/create-quiz')} className={NavStyles.navLink}>  <i className="fas fa-plus-circle"></i> Create Quiz</span>
//             <span onClick={() => handleNavigation('/my-quizzes')} className={NavStyles.navLink}><i className="fas fa-list"></i>My Quizzes</span>
//             <span onClick={() => handleNavigation('/all-reports')} className={NavStyles.navLink}> <i class="fas fa-file-alt"></i>
//             Quiz Report</span>
//             <span onClick={() => handleNavigation('/attemptQuiz')} className={NavStyles.navLink}> <i className="fas fa-play-circle"></i>Attempt Quiz</span>
//           </div>
//           <img src={ProfileImage} alt="Profile" title="Profile"
//           onClick={() => navigate('/profile')} className={NavStyles.ProfileBtn} />
//           <img src={LogoutImage} alt="Logout" title="Logout"
//           onClick={handleLogout} className={NavStyles.logoutBtn} />
//         </div>

//     </>
//   )
// };

// export default Navbar;

import React, { useState } from 'react';
import NavStyles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import LogoutImage from "../assets/quizImg/logout-icon.png";
import ProfileImage from "../assets/quizImg/profile.jpg";

export const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false); // Close menu when navigating
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); 
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
        <div className={NavStyles.navbar}>
            <span className={NavStyles.heading}>Quizzfy</span>

            {/* Hamburger Menu Toggle for Mobile */}
            <span className={NavStyles.menuToggle} onClick={toggleMenu}>
                ☰
            </span>

            <div className={`${NavStyles.navLinks} ${menuOpen ? NavStyles.show : ''}`}>
                <span onClick={() => handleNavigation('/home')} className={NavStyles.navLink}>
                    <i className="fas fa-home"></i> Home
                </span>
                <span onClick={() => handleNavigation('/create-quiz')} className={NavStyles.navLink}>
                    <i className="fas fa-plus-circle"></i> Create Quiz
                </span>
                <span onClick={() => handleNavigation('/my-quizzes')} className={NavStyles.navLink}>
                    <i className="fas fa-list"></i> My Quizzes
                </span>
                <span onClick={() => handleNavigation('/all-reports')} className={NavStyles.navLink}>
                    <i className="fas fa-file-alt"></i> Quiz Report
                </span>
                <span onClick={() => handleNavigation('/attemptQuiz')} className={NavStyles.navLink}>
                    <i className="fas fa-play-circle"></i> Attempt Quiz
                </span>
            </div>

            <img src={ProfileImage} alt="Profile" title="Profile"
            onClick={() => navigate('/profile')} className={NavStyles.ProfileBtn} />
            <img src={LogoutImage} alt="Logout" title="Logout"
            onClick={handleLogout} className={NavStyles.logoutBtn} />
        </div>
        </>
    );
};

export default Navbar;
