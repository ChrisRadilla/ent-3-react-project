import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationData from './components/LocationData';
import ResidentCard from './components/ResidentCard';

function App() {
  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1);
  const [location, getLocation, isLoading, hasError] = useFetch();
  const textInput = useRef();
  const [timeoutId, setTimeoutId] = useState(null); 
  const [showEmptySearchGif, setShowEmptySearchGif] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  useEffect(() => {
    document.title = 'Rick and Morty-CR';
  }, []);

  // Fetch location data based on ID
  const fetchLocation = (id) => {
    const url = `https://rickandmortyapi.com/api/location/${id}`;
    getLocation(url);
  };

  // Handle next page button click
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const nextId = inputValue ? parseInt(inputValue) + 1 : nextPage;
    setCurrentPage(nextPage);
    fetchLocation(nextId);
    scroll(0, 0);
    setInputValue(nextId.toString()); // Update input value with the next page number
  };
  // Handle back page button click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const prevId = inputValue ? parseInt(inputValue) - 1 : prevPage;
      setCurrentPage(prevPage);
      fetchLocation(prevId);
      scroll(0, 0); // Scroll to the top when navigating to the previous page
      setInputValue(prevId.toString()); // Update input value with the previous page number
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValueTrimmed = inputValue.trim(); 
    if (!inputValueTrimmed) {
      setShowEmptySearchGif(true);
      return;
    }
    fetchLocation(inputValueTrimmed.toLowerCase());
    setInputValue('');
    setShowEmptySearchGif(false);
  };

  useEffect(() => {
    if (inputValue) {
      const id = setTimeout(() => {
        fetchLocation(inputValue);
      }, 9000);
      setTimeoutId(id);
    }
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <>
      {isLoading ? (
        <h2 className='loading_gif'>Loading...</h2>
      ) : (
        <div className='app'>
          <img src="/assets/images/rickandmortyhero.png" alt="Rick and Morty Hero" />
          <form className='app_form' onSubmit={handleSubmit}>
            <h3>Search id's from 1-126</h3>
            <input placeholder='Type IDs here ' className='app_input' type='text' ref={textInput} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <button className='app_btn'> Search </button>
          </form>
          {/* Next and Back buttons */}
          <div className="navigation-buttons">
            <button className="Pre-Btn" onClick={handlePrevPage} disabled={currentPage === 1}>Back</button>
            <button className="Next-Btn" onClick={handleNextPage} disabled={currentPage === 126}>Next</button>
          </div>
         
          {showEmptySearchGif ? (
            <div className="empty-search-gif">
              <h5>  "Hey! you found me by typing nothing! now type an id" </h5>
              <img src="https://icegif.com/wp-content/uploads/2023/04/icegif-1311.gif" alt="Empty Search GIF" />
            </div>
          ) : (
            <>
              {hasError || inputValue==='0' ? (
                <div className="error-container">
                  <h4>🚫 "Hey! you must provide an id from 1 to 126, oh geez have you seen Rick?" ❌</h4>
                  <div className='incorrect_image'></div>
                </div>
              ) : (
                <div>
                  <LocationData location={location}/>
                  <div className='app_container'>
                    {location.residents.map(resident => (
                      <ResidentCard key={resident} url={resident} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
<div className="navigation-buttons">
            <button className="Pre-Btn bottom-Btn" onClick={handlePrevPage} disabled={currentPage === 1}>Back</button>
            <button className="Next-Btn bottom-Btn" onClick={handleNextPage} disabled={currentPage === 126}>Next</button>
          </div>
          <footer className="footer">
            Diseñado y desarrollado por Christopher. &copy; 2024 
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
