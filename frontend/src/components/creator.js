import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Creator extends Component {

  static propTypes = {
    addTask: PropTypes.func.required,
  };

  constructor() {
    super();
    this.state = {task: ''}
  }

  onInputChange(event) {
    this.setState({task: event.target.value});
  }

  onKeyPress(event){
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  addTask(){
    if (this.state.task.length === 0) return;
    const payload = {task: this.state.task};

    axios.post('/tasks/', payload).then(response => {
      this.props.addTask(response.data);
      this.setState({task: ''});
    })
  }

  render() {
    return (
      <Grid
        container
        justify="center"
        spacing={16}
        alignItems="center"
        direction="row"
      >
        <Grid item>
          <TextField
            label="Enter task description"
            value={this.state.task}
            onChange={this.onInputChange.bind(this)}
            onKeyPress={this.onKeyPress.bind(this)}
            margin="none"
            variant="outlined"
            style={{minWidth: 400}}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={this.addTask.bind(this)}
            size="large"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => dispatch({type: 'addTask', task})
  }
}

Creator = connect(mapStateToProps, mapDispatchToProps)(Creator)

export default Creator;
