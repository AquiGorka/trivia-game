import React from 'react';

const View = props => {
  const { mode } = props;

  if (mode) {
    return null;
  }

  return 'Welcome';
};

export { View };
