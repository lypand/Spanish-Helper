import './App.css';
import React, { useEffect, useState } from 'react';
import ConjugationTable from './components/conjugationTable/ConjugationTable';
import axios from 'axios';
import AddVocabEntries from './components/addVocabEntry/AddVocabEntries';
const SpanishVerbs = require('spanish-verbs');
const baseURL = 'http://localhost:3001/api';
const axiosInstance = axios.create({
  baseURL: baseURL
});

function App() {

  const [word, setWord] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayEnglish, setDisplayEnglish] = useState(false);

  const nextWord = () => {
    var nextIndex = currentIndex + 1;
    if (nextIndex < word.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const previousWord = () => {
    var previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setCurrentIndex(previousIndex);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch data from the '/translations' endpoint
      const response = await axiosInstance.get('/vocab_entries');
      setWord(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'es';
    window.speechSynthesis.speak(utterance);
  };

  const toggleEnglish = () => {
    setDisplayEnglish(previous => !previous);
  };

  const hideEnglish = () => {
    setDisplayEnglish(false);
  };

  useEffect(() => {
    if (word.length !== 0) {
      speakWord(word[currentIndex].spanish);
    }
  }, [currentIndex]);

  const wordsLoaded = word.length > 0;

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event);
      if (event.code === 'ArrowRight') {
        hideEnglish();
        nextWord();
      }
      if (event.code === 'ArrowLeft') {
        hideEnglish();
        previousWord();
      }
      if (event.code === 'Space') {
        toggleEnglish();
      }
      if (event.code === 'ArrowUp') {
        toggleEnglish();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [word, currentIndex]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Spanish Helper</h1>
      <div className='vocab'>
        {wordsLoaded && (
          <div>
            <p onClick={() => speakWord(word[currentIndex].spanish)}>
              {word[currentIndex].spanish}</p>

            <p>{displayEnglish ? (word[currentIndex].english) : '-'}</p>
          </div>

        )}
        <div className="buttons">
          <button onClick={nextWord}>Next Word</button>
          <button onClick={toggleEnglish}>Show English</button>
        </div>
      </div>
      <div className="conjugation-table-wrapper">
        {wordsLoaded && (
          <ConjugationTable word={word[currentIndex].spanish}></ConjugationTable>
        )}
      </div>
      <AddVocabEntries></AddVocabEntries>
    </div>
  );
};

export default App;
