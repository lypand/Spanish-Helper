import React, { useEffect, useState, useCallback } from 'react';
import ConjugationTable from '../conjugationTable/ConjugationTable';
import AddVocabEntries from '../addVocabEntry/AddVocabEntries';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';

function VocabCard({ wordInfo, wordsLoaded, displayEnglish, allSentences }) {

  return (
    <div>
      <div className='vocab'>
        {wordsLoaded && (
          <div>
            <Card>
              <Card.Header>{wordInfo.spanish}</Card.Header>

              <ul>
                {displayEnglish ? (wordInfo.english.map((item, index) => (
                  <li key={index}>{item}</li>
                ))) : '-'}
              </ul>
              <h5>
                Sentence:
              </h5>
              {allSentences ? (
                <div>
                  <ul>
                    {(wordInfo.exampleSpanish.map((item, index) => (
                      <li key={index}>{item}</li>
                    )))}
                  </ul>
                  <ul>
                    {displayEnglish ? (wordInfo.exampleEnglish.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))) : '-'}
                  </ul>
                </div>
              ) :
                <div>
                  <Card.Text>
                    {wordInfo.exampleSpanish[0]}
                  </Card.Text>
                  <Card.Text>
                    {wordInfo.exampleEnglish[0]}
                  </Card.Text>
                </div>}
              <div className="conjugation-table-wrapper">
                {wordsLoaded && (
                  <ConjugationTable word={wordInfo.spanish}></ConjugationTable>
                )}
              </div>
            </Card>
          </div>

        )}
      </div>
    </div>
  );
};

export default VocabCard;
