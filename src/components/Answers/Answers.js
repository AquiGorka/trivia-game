import React, { Component, Fragment, Children, cloneElement } from 'react';

class Store extends Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <Fragment>
        {Children.map(children, child =>
          cloneElement(child, { ...props, answersPost: this.post }),
        )}
      </Fragment>
    );
  }

  post = ({ answer, question }) => {
    const { flux, answers=[], questions } = this.props;
    const newAnswer = questions.reduce((p, c) => {
      if (c.question === question) {
        p = { question, correct: c.correct_answer.toLowerCase() === answer };
      }
      return p;
    }, {});
    flux({ answers: [...answers, newAnswer] });
  };
}

export { Store };
