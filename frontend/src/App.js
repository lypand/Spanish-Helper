import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import AddVocabEntries from './components/addVocabEntry/AddVocabEntries';
import VocabCard from './components/cards/VocabCard'
import WordSelection from './components/wordSelection/WordSelection'
import GlobalEventListener from './components/eventListeners/GlobalEventListener';
import Header from './components/header/Header'
import WordRepository from './components/externalRepository/WordRepository.jsx';

function App() {

  const [words, setWord] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayEnglish, setDisplayEnglish] = useState(false);
  const [allSentences, setAllSentences] = useState(false);
  const [wordsLoaded, setWordsLoaded] = useState(false);

  const handleNext = () => {
    var nextIndex = currentIndex + 1;
    if (nextIndex < words.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handleWordsLoaded = () => {
    setWordsLoaded(true);
  }

  const handlePrevious = () => {
    var previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setCurrentIndex(previousIndex);
    }
  };

  const handleSpeakWord = () => {
    if (words.length !== 0) {
      const utterance = new SpeechSynthesisUtterance(words[currentIndex].spanish);
      utterance.lang = 'es';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSetWords = (data) => {
    setWord(data);
  }

  const handleToggle = () => {
    setDisplayEnglish(previous => !previous);
  };

  const handleToggleAllSentences = () => {
    setAllSentences(previous => !previous);
  }

  const handleHideEnglish = () => {
    setDisplayEnglish(false);
  };

  useEffect(() => {
    if (words.length !== 0) {
      handleSpeakWord(words[currentIndex].spanish);
    }
  }, [currentIndex]);

  return (
    <div className='header'>
      <WordRepository onLoad={handleWordsLoaded} onSpeak={handleSpeakWord} onSetWords={handleSetWords}></WordRepository>
      <Header ontoggleAllSentences={handleToggleAllSentences} onHideEnglish={handleHideEnglish} ></Header>
      <div className="app">
        <h1>Spanish Helper</h1>
        <VocabCard wordInfo={words[currentIndex]} wordsLoaded={wordsLoaded} displayEnglish={displayEnglish} allSentences={allSentences}></VocabCard>
        <WordSelection onNext={handleNext} onToggle={handleToggle} onPrevious={handlePrevious}></WordSelection>
        <AddVocabEntries></AddVocabEntries>
        <GlobalEventListener onNext={handleNext} onToggle={handleToggle} onPrevious={handlePrevious}></GlobalEventListener>
      </div>
    </div>
  );
};

export default App;
