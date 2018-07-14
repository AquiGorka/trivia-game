import React, { Component, Fragment, Children, cloneElement } from 'react';
import { RESULTS } from '../Results/Results';
import './Game.css'

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
    if (answers.length === questions.length) {
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
      <header>
        <h2>{category}</h2>
      </header>
      <main className="Game">
        <div className="Game__body">
        <div className="Game__card">{question}</div>
        <div className="Game__current">
          {answers.length + 1} of {questions.length}
        </div>
        </div>
        <div className="Game__footer">
          <button onClick={() => answersPost({ answer: 'false', question })}>
            False
          </button>
          <button onClick={() => answersPost({ answer: 'true', question })}>
            True
          </button>
        </div>
      </main>
    </Fragment>
  );
};

export { GAME, Store, View };
