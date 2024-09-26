
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import ReportStyles from "../styles/DetailReport.module.css";

const DetailReports = () => {
  const { reportId } = useParams(); // Get the reportId from the URL
  const { state } = useLocation(); // Get the token from state
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = () => {
      const token = state?.token || localStorage.getItem("loginToken"); // Fallback to localStorage if token not in state

      if (!token) {
        console.error('Token is missing');
        navigate('/login'); // Redirect to login if token is missing
        return;
      }

      axios.get(`http://localhost:3002/report/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReport(response.data.data); // Set report data to state
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
      });
    };

    fetchReport();
  }, [reportId, state, navigate]);

  const handleViewAllReports = () => {
    navigate('/all-reports');
  };

  return (
    <>
      <Navbar />
      <div className={ReportStyles.reportContainer}>
        {report ? (
          <div>
            <h1 className={ReportStyles.heading}>Report Details</h1>
            <p className={ReportStyles.para}><strong>Score:</strong> {report.score}</p>
            <p className={ReportStyles.para}><strong>Total Questions:</strong> {report.total}</p>
            <p className={ReportStyles.para}><strong>Percentage:</strong> {report.percentage}%</p>
            <p className={ReportStyles.para}><strong>Passing Percentage:</strong> {report.passingPercentage}%</p>
            <p className={ReportStyles.para}><strong>Result:</strong> {report.resultStatus}</p>
            <button className={ReportStyles.viewReportBtn} onClick={handleViewAllReports}>View All Reports</button>
          </div>
        ) : (
          <p>Loading report...</p>
        )}
      </div>
    </>
  );
};

export default DetailReports;

