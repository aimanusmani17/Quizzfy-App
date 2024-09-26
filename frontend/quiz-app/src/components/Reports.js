import React, { useEffect, useState } from "react";
import ReportStyles from "../styles/Reports.module.css";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const Reports = () => {
  const { reportId } = useParams();
  const [reports, setReports] = useState([]); // Added useState import
  const [errorMessage, setErrorMessage] = useState(""); // Added useState import

  useEffect(() => {
    const token = localStorage.getItem("loginToken"); // Get token from localStorage

    if (token) {
      axios
        .get(`http://localhost:3002/report`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
        })
        .then((response) => {
          setReports(response.data.data); // Set the reports data
        })
        .catch((error) => {
          setErrorMessage("Error fetching reports"); // Handle errors
          console.error(error);
        });
    } else {
      setErrorMessage("User not authenticated"); // Handle missing token
    }
  }, [reportId]);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  // if (reports.length === 0) {
  //   return <div className="loading">Loading...</div>;
  // }

  return (
    <>
      <Navbar />
      <div className={ReportStyles.main}>
        <h1 className={ReportStyles.reportTitle}>All Reports</h1>
        <div className={ReportStyles.reportContainer}>
          {reports.map((report, index) => (
            <div key={report._id} className={ReportStyles.reportCard}>
              <h2>Report {index + 1}</h2>
              <p>
                Score: {report.score}/{report.total}
              </p>
              <p>Percentage: {report.percentage}%</p>
              <p>Result: {report.result}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reports;
