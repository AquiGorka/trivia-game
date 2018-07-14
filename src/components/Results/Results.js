import React, { Fragment } from 'react';

const RESULTS = 'results';

const View = props => {
  const { mode, answers = [], questions = [], gameRestart } = props;

  if (mode !== RESULTS) {
    return null;
  }

  return (
    <Fragment>
      <div>You scored</div>
      <div>
        {answers.reduce((p, c) => (c.correct ? p + 1 : p), 0)}/{
          questions.length
        }
      </div>
      <ul>
        {answers.map(({ question, correct }, index) => {
          return (
            <li key={`results-${index}`}>
              <div>{correct ? 'Bien' : 'Mal'}</div>
              <div>{question}</div>
            </li>
          );
        })}
      </ul>
      <button onClick={gameRestart}>Play again?</button>
    </Fragment>
  );
};

export { RESULTS, View };
