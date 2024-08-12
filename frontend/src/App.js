import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import ConjugationTable from './components/conjugationTable/ConjugationTable';
import axios from 'axios';
import AddVocabEntries from './components/addVocabEntry/AddVocabEntries';
const baseURL = process.env.Backend_Base_Url;
console.log(process.env.Backend_Base_Url);
const axiosInstance = axios.create({
  baseURL: baseURL
});

function App() {

  const [word, setWord] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayEnglish, setDisplayEnglish] = useState(false);

  const nextWord = useCallback(() => {
    let randomIndex = Math.floor(Math.random() * word.length);
    console.log(randomIndex);
    setCurrentIndex(randomIndex);
  }, [word]);

  const previousWord = useCallback(() => {
    var previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setCurrentIndex(previousIndex);
    }
  }, [currentIndex]);

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
  }, [currentIndex, word]);

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
  }, [word, currentIndex, nextWord, previousWord]);

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

            <ul>
              {displayEnglish ? (word[currentIndex].english.map((item, index) => (
                <li key={index}>{item}</li>
              ))) : '-'}
            </ul>
            <h5>
              Sentence:
            </h5>
            <ul>
              {(word[currentIndex].exampleSpanish.map((item, index) => (
                <li key={index}>{item}</li>
              )))}
            </ul>
            <ul>
              {displayEnglish ? (word[currentIndex].exampleEnglish.map((item, index) => (
                <li key={index}>{item}</li>
              ))) : '-'}
            </ul>

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
