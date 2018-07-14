import React from 'react';
import { GAME } from '../Game/Game';

const View = props => {
  const { mode, flux, questionsLoading, questionsError } = props;

  if (mode) {
    return null;
  }

  return (
    <div>
      <h2>Welcome to the Trivia Challenge</h2>
      <div>You will be presented with 10 True or False questions</div>
      <div>Can you score 100%?</div>
      <button disabled={!!questionsError || questionsLoading} onClick={() => flux({ mode: GAME })}>Begin</button>
      {questionsLoading && <div>Loading questions</div>}
      {questionsError}
    </div>
  );
};

export { View };
