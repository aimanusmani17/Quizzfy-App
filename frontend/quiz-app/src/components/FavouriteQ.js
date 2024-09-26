import React ,  { useState, useEffect }from 'react';
import axios from 'axios';


const FavouriteQ = () => {
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFavoriteQuestions = () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage('Authentication token is missing. Please log in again.');
        return;
      }
  
      axios
        .get('http://localhost:3002/favquestion', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Extract and set favorite questions
          setFavoriteQuestions(response.data.data.favQues);
        })
        .catch((error) => {
          setErrorMessage(error.response?.data?.message || 'Error fetching favorite questions');
        });
    };
  
    fetchFavoriteQuestions();
  }, []);
  




  return (
    <div>FavouriteQ</div>
  )
}

export default FavouriteQ