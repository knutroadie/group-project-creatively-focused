import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class TaskListItem extends Component {

    updateStudentEvent = (event, id) => {
        this.props.dispatch({
            type: 'EDIT_STUDENTEVENT',
            payload: id
        })
    }

    render() {
        let task = this.props.task
        console.log(task);
        return (
            <div>
                {task.map(task => {
                    return (
                        <div>
                            <ListItem>
                                <Checkbox 
                                    key={task.id}
                                    onClick={(event) => this.updateStudentEvent(event, task.id)}>
                                </Checkbox>
                                <ListItemText>
                                {/* DUE DATE */}
                                {moment(task.due_date).format('MM-DD-YYYY')}<br />
                                {/* STUDENT NAME */}
                                {task.student_lastname}, {task.student_firstname}<br />
                                {/* TASK NAME */}
                                {task.task}
                                </ListItemText>
                            </ListItem>
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(TaskListItem));