import React, { useState } from 'react';
import axios from 'axios';
import Styles from'../styles/Verify.module.css'; 
import Navbar from '../components/Navbar';

const VerifyDeactivate = () => {
    const [otp, setOTP] = useState('');
    const [message, setMessage] = useState('');

    const verifyOTPHandler = () => {
        axios
          .post(
            'http://localhost:3002/user/deactivate/verify-deactivate-account-otp',
            { otp },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((response) => {
            setMessage(response.data.message);
          })
          .catch((error) => {
            setMessage(error.response?.data?.message || 'An error occurred');
          });
      };
      
  
  return (
    <>
    <Navbar />
    <div className={Styles.verifyContainer}>
      <h2 className={Styles.verifyHeading}>Verify OTP to Deactivate Account</h2>
      <p className={Styles.verifyPara}>Enter the OTP sent to your email to deactivate your account.</p>
      <input 
        type="text" 
        value={otp} 
        onChange={(e) => setOTP(e.target.value)} 
        placeholder="Enter OTP" 
        className={Styles.verifyInput}
      />
      {message && <p className="error-message">{message}</p>}
      <button onClick={verifyOTPHandler}
        className={Styles.verifyButton}
        
      
    //    disabled={loading}
    >Submit
        {/* {loading ? 'Verifying OTP...' : 'Verify OTP'} */}
      </button>
    </div>
    </>
  )
}

export default VerifyDeactivate