import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { updateTask, deleteTask } from '../actionCreators';


class Task extends Component {

  static propTypes = {
    task: PropTypes.object.isRequired,
  };

  toggleDone(event) {
    const payload = {done: event.target.checked};
    const path = `/tasks/${this.props.task.id}/`;
    axios.patch(path, payload).then(response => {
      this.props.updateTask(response.data);
    });
  }

  deleteTask(){
    const path = `/tasks/${this.props.task.id}/`;
    axios.delete(path).then(response => {
      this.props.deleteTask(this.props.task);
    })
  }

  render() {
    const {
      task,
      done,
      create_date
    } = this.props.task;

    return (
      <ListItem button>
        <Checkbox
          checked={done}
          onChange={this.toggleDone.bind(this)}
        />
        <ListItemText primary={task} secondary={`Created ${create_date}`}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.deleteTask.bind(this)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (task) => dispatch(deleteTask(task))
  }
}

Task = connect(mapStateToProps, mapDispatchToProps)(Task);

class Tasks extends Component {

  static propTypes = {
    tasks: PropTypes.object,
    showPending: PropTypes.bool,
    showDone: PropTypes.bool,
  };

  getTaskList() {
    const {
      tasks,
      showPending,
      showDone
    } = this.props;

    if (tasks === undefined) return tasks;

    const filterTasks = (item) => {
      if (showPending & showDone) return true;
      if (showPending) return !item.done;
      if (showDone) return item.done;
      return false;
    }
    return tasks.filter(filterTasks);
  }

  render() {
    const tasks = this.getTaskList();

    if (tasks === undefined) {
      return (
        <Grid container justify="center">
          <Grid item>
            <CircularProgress disableShrink/>
          </Grid>
        </Grid>
      );

    } else if (tasks.size === 0){
      return (
        <Typography align="center">
          No tasks found
        </Typography>
      );
    } else {
      return (
        <List dense disablePadding>
          {tasks.map(task => <Task key={task.id} task={task}/>)}
        </List>
      );
    }
  }
}

export default Tasks;
