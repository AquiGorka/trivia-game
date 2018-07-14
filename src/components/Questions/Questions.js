import React, { Component, Fragment, Children, cloneElement } from 'react';
import Entities from 'html-entities';

const entities = new Entities.AllHtmlEntities();

class Store extends Component {
  componentDidMount() {
    this.get();
  }

  componentDidUpdate(prevProps) {
    const { questions, questionsLoading, questionsError } = this.props;
    if (
      prevProps.questions &&
      questions.length === 0 &&
      !questionsLoading &&
      !questionsError
    ) {
      this.get();
    }
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <Fragment>
        {Children.map(children, child => cloneElement(child, { ...props }))}
      </Fragment>
    );
  }

  get = async () => {
    const { flux } = this.props;
    flux({ questionsLoading: true });
    try {
      const raw = await fetch(
        'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
      );
      const { results: questions } = await raw.json();
      if (!Array.isArray(questions) || questions.length < 10) {
        flux({
          questionsError: 'Could not load questions',
          questionsLoading: false,
        });
        return;
      }
      flux({
        questions: questions.map(({ question, ...rest }) => ({
          question: entities.decode(question),
          ...rest,
        })),
        questionsLoading: false,
      });
    } catch (e) {
      flux({ questionsError: e, questionsLoading: false });
    }
  };
}

export { Store };
