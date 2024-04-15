import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    document.title = 'Rick and Morty-CR';
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValueTrimmed = inputValue.trim(); 
    if (!inputValueTrimmed) {
     
      setShowEmptySearchGif(true);
      return;
    }
    const url = `https://rickandmortyapi.com/api/location/${inputValueTrimmed.toLowerCase()}`;
    getInputLocation(url);
    setInputValue('');
  }

  const getInputLocation = (url) => {
    getLocation(url);
    clearTimeout(timeoutId); 
  }

  useEffect(() => {
    if (inputValue) {
      const id = setTimeout(() => {
        getInputLocation(`https://rickandmortyapi.com/api/location/${inputValue}`);
      }, 9000);
      setTimeoutId(id); // Save the timeout id in state
    }
    return () => clearTimeout(timeoutId); // Cleanup function
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
          {showEmptySearchGif && (
            <div className="empty-search-gif">
              <h5>  "Hey! you found me by typing nothing! now type an id" </h5>
              <img src="https://icegif.com/wp-content/uploads/2023/04/icegif-1311.gif" alt="Empty Search GIF" />
            </div>
          )}
          <footer className="footer">
      Diseñado y desarrollado por Christopher. &copy; 2024 
</footer>
      </div>
      )}
    </>
  );
}

export default App;
