import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import DoneIcon from '@material-ui/icons/Done';
import TimerIcon from '@material-ui/icons/Timer';
import Chip from '@material-ui/core/Chip';

import { connect } from 'react-redux';

import axios from 'axios';

import Tasks from './task';
import { setTasks } from '../actionCreators';


class Board extends Component {

  constructor() {
    super();
    this.state = {
      showPending: true,
      showDone: false,
    }
  }

  componentDidMount() {
    axios.get('/tasks/').then((response) => {
      this.props.setTasks(response.data);
    })
  }

  render() {
    const tasks = this.props.tasks;

    let pendingCount = 0;
    let doneCount = 0;
    if (tasks !== undefined){
      pendingCount = tasks.filter(task => !task.done).size;
      doneCount = tasks.filter(task => task.done).size;
    }

    return (
      <Grid
        container
        direction="column"
        spacing={16}
      >
        <Grid item>
          <Typography variant="h5" align="center">
             List of tasks
          </Typography>
        </Grid>

        <Grid
          item
          container
          justify="flex-end"
          direction="row"
          alignItems="center"
          spacing={16}
          xs={12}
        >
          <Grid item>
            <Badge
              color="secondary"
              badgeContent={doneCount}
              invisible={tasks === undefined}
            >
              <Chip
                label="Done"
                variant={!this.state.showDone ? 'outlined' : 'default'}
                icon={<DoneIcon/>}
                onClick={() => this.setState({...this.state, showDone: !this.state.showDone})}
              />
            </Badge>
          </Grid>
          <Grid item>
            <Badge
              color="primary"
              badgeContent={pendingCount}
              invisible={tasks === undefined}
            >
              <Chip
                label="Pending"
                variant={!this.state.showPending ? 'outlined' : 'default'}
                icon={<TimerIcon/>}
                onClick={() => this.setState({...this.state, showPending: !this.state.showPending})}
              />
            </Badge>
          </Grid>
        </Grid>

        <Grid item>
          <Tasks
            tasks={tasks}
            showPending={this.state.showPending}
            showDone={this.state.showDone}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {tasks: state.tasks};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTasks: (tasks) => dispatch(setTasks(tasks))
  };
}

Board = connect(mapStateToProps, mapDispatchToProps)(Board)

export default Board;
