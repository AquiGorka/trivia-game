import React, { Component, Fragment, Children, cloneElement } from 'react';
import { RESULTS } from '../Results/Results';

const GAME = 'game';

class Store extends Component {
  componentDidMount() {
    const { flux, questions = [] } = this.props;
    if (questions.length) {
      flux({ questionSelected: questions[0] });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      questions = [],
      questionSelected,
      answers = [],
      flux,
      mode,
    } = this.props;
    // other routes
    if (mode !== GAME) {
      return;
    }
    // c'est fini
    if (answers.length === 10) {
      flux({ mode: RESULTS, questionSelected: null });
      return;
    }
    // start
    if (answers.length === 0 && !questionSelected) {
      flux({ questionSelected: questions[0] });
      return;
    }
    // loop
    if (
      questions.length &&
      answers.length &&
      (!prevProps.answers || answers.length !== prevProps.answers.length)
    ) {
      flux({ questionSelected: questions[answers.length] });
    }
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <Fragment>
        {Children.map(children, child =>
          cloneElement(child, { ...props, gameRestart: this.restart }),
        )}
      </Fragment>
    );
  }

  restart = () => {
    const { flux } = this.props;
    flux({ questions: [], answers: [], questionSelected: null, mode: null });
  };
}

const View = props => {
  const {
    mode,
    questionSelected,
    questions = [],
    answers = [],
    answersPost,
  } = props;

  // not this route
  if (mode !== GAME) {
    return null;
  }

  // waiting for question
  if (!questionSelected) {
    return null;
  }
  const { category, question } = questionSelected;

  return (
    <Fragment>
      <div>{category}</div>
      <button onClick={() => answersPost({ answer: 'false', question })}>
        False
      </button>
      <button onClick={() => answersPost({ answer: 'true', question })}>
        True
      </button>
      <div>
        {answers.length + 1} of {questions.length}
      </div>
      <div>{question}</div>
    </Fragment>
  );
};

export { GAME, Store, View };
