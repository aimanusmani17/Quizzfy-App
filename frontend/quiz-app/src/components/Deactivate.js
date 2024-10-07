import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Styles from '../styles/Deactivate.module.css';
import Navbar from '../components/Navbar'

const Deactivate = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const sendOTPHandler = () => {
        axios
          .patch(
            'https://quizzfy-app.onrender.com/user/deactivate',
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
              },
            }
          )
          .then((response) => {
            setMessage(response.data.message);
            // Navigate to the OTP verification page after OTP is sent
            setTimeout(() => {
              navigate('/verify-deactivate');
            }, 2000); 
          })
          .catch((error) => {
            setMessage(error.response?.data?.message || 'An error occurred');
          });
      };
      

  return (
    <>
    <Navbar/>
     <div className={Styles.container}>
      <h2>Deactivate Account</h2>
      <p>Get OTP for account deactivation.</p>
      {message && <p>{message}</p>}
      <button 
        className={Styles.deactivateBtn} 
        onClick={sendOTPHandler} 
        
      >
        Get OTP
       
      </button>
    </div></>
  )
}

export default Deactivate;