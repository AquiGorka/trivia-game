import React, { Component } from 'react';
import Flux from '@aquigorka/flux'
import {
  GameView,
  ResultsView,
  WelcomeView,
} from '../components'

class App extends Component {
  render() {
    return <Flux>
      <WelcomeView />
      <GameView />
      <ResultsView />
    </Flux>;
  }
}

export default App;
