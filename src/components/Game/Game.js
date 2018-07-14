import React from 'react';

const GAME = 'game';

const View = props => {
  const { mode } = props;

  if (mode !== GAME) {
    return null;
  }

  return 'GAME';
};

export { View };
