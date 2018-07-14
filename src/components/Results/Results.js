import React, { Fragment } from 'react';
import './Results.css'

const RESULTS = 'results';

const View = props => {
  const { mode, answers = [], questions = [], gameRestart } = props;

  if (mode !== RESULTS) {
    return null;
  }

  return (
    <Fragment>
      <header>
        <h2>You scored</h2>
        <h3>
          {answers.reduce((p, c) => (c.correct ? p + 1 : p), 0)}/{
            questions.length
          }
        </h3>
      </header>
      <main className="Results">
        <ul>
          {answers.map(({ question, correct }, index) => {
            return (
              <li key={`results-${index}`}>
                <div>{correct ? '✅'  : '❌' }</div>
                <div>{question}</div>
              </li>
            );
          })}
        </ul>
      </main>
      <div className="Results__restart">
        <button onClick={gameRestart}>Play again?</button>
      </div>
    </Fragment>
  );
};

export { RESULTS, View };
