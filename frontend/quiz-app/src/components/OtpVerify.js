

import React, { useState, useEffect } from "react";
import OtpStyles from "../styles/Otp.module.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const OtpVerify = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  const location = useLocation();
  const [token, setToken] = useState("");

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const [otpValues, setOtpValues] = useState(new Array(6).fill("")); // Array to store 6 digits of OTP
  const [valid, setValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Enable/Disable submit button based on OTP length
  useEffect(() => {
    // Check if the OTP has exactly 6 digits
    if (otpValues.every((val) => val !== "")) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [otpValues]);

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    // Ensure that the user cannot enter more than 1 digit per input field
    if (/^[0-9]?$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value; // Update the specific index in the array
      setOtpValues(newOtpValues);

      // Move focus to the next input field if a digit is entered
      if (value && event.target.nextSibling) {
        event.target.nextSibling.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpValues.join(""); // Combine OTP array values into a single string
    const isValid = { otp };

    axios
      .post(
        `https://quizzfy-app.onrender.com/auth/verify-registration-otp/${token}`,
        isValid
      )
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={OtpStyles.main}>
        <h1 className={OtpStyles.heading}>Verify OTP </h1>
        <div className={OtpStyles.formDiv}>
          <form className={OtpStyles.form} onSubmit={handleSubmit}>
            {submitted && valid && (
              <div className={OtpStyles.successMessage}>
                <div>You entered correct Otp!</div>
              </div>
            )}

            <h6>6 digit Otp has been sent on your email</h6>
            <label htmlFor="otp">Enter Otp: </label>
            <div className={OtpStyles.otpInput}>
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  className={OtpStyles.input}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleInputChange(e, index)} // Pass the index of the input field
                />
              ))}
            </div>
            {otpValues.some((val) => val === "") && (
              <span className={OtpStyles.errorMessage}>
                OTP must be exactly 6 digits
              </span>
            )}
            <br />
            <div className={OtpStyles.btn}>
              <button
                className={OtpStyles.btn}
                disabled={isDisabled}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <label className={OtpStyles.confirmLabel}>
              Already registered? Then {" "}
              <Link to="/login" className={OtpStyles.loginLink}>
                Login
              </Link>
            </label>
      </div>
    </>
  );
};

export default OtpVerify;
