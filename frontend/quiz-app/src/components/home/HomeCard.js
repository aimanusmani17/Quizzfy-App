import React, { useState, useEffect } from "react";
import HomeStyles from "../../styles/Home.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const HomeCard = (props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("https://localhost:3002/")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
    
      <div className={HomeStyles.cards}>
        <h1 className={HomeStyles.headingTwo}>{props.title}</h1>
        <p className="text-center">{props.description}</p>
        <button className={HomeStyles.buttonCard} onClick={props.onClick}>
          {props.btnTitle}
        </button>
      </div>
    </>
  );
};

export default HomeCard;