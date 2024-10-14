import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // Assuming Navbar is imported correctly
import ProfileStyles from "../styles/Profile.module.css"; // Ensure correct import of CSS

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserInfo = () => {
      const token = localStorage.getItem("loginToken");
      if (!token) {
        console.log("Authentication token is missing");
        return;
      }

      axios
        .get("https://quizzfy-app.onrender.com/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.status === "success") {
            setUserInfo(response.data.data);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchUserInfo();
  }, []);



const handleChangePassword = (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      console.log('New password and confirm password do not match');
      return;
    }
  
    const token = localStorage.getItem('loginToken');
    if (!token) {
      console.log('Authentication token is missing. Please log in again.');
      return;
    }
  
    axios
      .put(
        'https://quizzfy-app.onrender.com/auth/user/changepassword',
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response?.data?.message || 'Error changing password');
      });
  };
  

  const goToDeactivate = () => {
    navigate("/deactivate-account");
  };

  return (
    <>
      <Navbar />
      <div className={ProfileStyles.profileMain}>

      <h1 className={ProfileStyles.heading}>My Profile</h1>
      <div className={ProfileStyles.container}>
        

        {userInfo ? (
          <div className={ProfileStyles.userInfo}>
            <p><strong>ID:</strong> {userInfo._id}</p>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}

        <h2>Change Password</h2>
        <form 
        onSubmit={handleChangePassword} 
        className={ProfileStyles.form}>
          <div className={ProfileStyles.formgroup}>
            <label htmlFor="currentPassword">Current Password : </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className={ProfileStyles.formgroup}>
            <label htmlFor="newPassword">New Password : </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={ProfileStyles.formgroup}>
            <label htmlFor="confirmPassword">Confirm New Password : </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={ProfileStyles.submitBtn}>
            Change Password
          </button>
        </form>

        <div className={ProfileStyles.deactivation}>
          <button onClick={goToDeactivate} className={ProfileStyles.deactivateBtn}>
            Deactivate Account
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;
