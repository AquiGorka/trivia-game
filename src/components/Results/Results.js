import React from 'react';

const RESULTS = 'results';

const View = props => {
  const { mode } = props;

  if (mode !== RESULTS) {
    return null;
  }

  return 'Results';
};

export { View };
