import React, { Component } from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Creator from './components/creator';
import Board from './components/board';
import reducer from './reducers';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

const store = createStore(reducer, {});


class App extends Component {

  constructor() {
    super();
    axios.defaults.baseURL = 'http://0.0.0.0:5000';
  }

  render() {
    return (
      <Provider store={store}>
        <Grid container justify="center">
          <Grid item xs={6}>
            <Paper>
              <Grid
                container
                spacing={32}
                direction="column"
                alignItems="stretch"
                justify="center"
              >
                <Grid item>
                  <Creator />
                </Grid>

                <Grid item>
                  <Board />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Provider>
    );
  }
}

export default App;
