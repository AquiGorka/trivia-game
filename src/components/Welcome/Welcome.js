import React, { Fragment } from 'react';
import { GAME } from '../Game/Game';
import './Welcome.css';

const View = props => {
  const { mode, flux, questionsLoading, questionsError } = props;

  if (mode) {
    return null;
  }

  return (
    <Fragment>
      <header>
        <h2>Welcome to the Trivia Challenge!</h2>
      </header>
      <main className="Welcome">
        <div className="Welcome__body">
          <h3>You will be presented with 10 True or False questions</h3>
          <div>Can you score 100%?</div>
        </div>
        <div className="Welcome__footer">
          {questionsLoading && (
            <div className="Welcome__loading">Loading questions...</div>
          )}
          {!!questionsError && (
            <div className="Welcome__error">{questionsError}</div>
          )}
          {!questionsError &&
            !questionsLoading && (
              <button
                disabled={!!questionsError || questionsLoading}
                onClick={() => flux({ mode: GAME })}
              >
                Begin
              </button>
            )}
        </div>
      </main>
    </Fragment>
  );
};

export { View };
