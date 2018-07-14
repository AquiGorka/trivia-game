import React, { Component } from 'react';
import Flux from '@aquigorka/flux';
import {
  AnswersStore,
  GameStore,
  GameView,
  QuestionsStore,
  ResultsView,
  WelcomeView,
} from '../components';

class App extends Component {
  render() {
    return (
      <Flux>
        <QuestionsStore>
          <AnswersStore>
            <GameStore>
              <WelcomeView />
              <GameView />
              <ResultsView />
            </GameStore>
          </AnswersStore>
        </QuestionsStore>
      </Flux>
    );
  }
}

export default App;
