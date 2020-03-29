import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
// import Moment from 'react-moment';
// import Checkbox from '@material-ui/core/Checkbox';

//styling
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

// variables
// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//     },
//     table: {
//         minWidth: 700,
//     },
// });

class TaskListItem extends Component {


    updateStudentEvent = (event, id) => {
        this.props.dispatch({
            type: 'EDIT_STUDENTEVENT',
            payload: id
        })
      }

    render() {
        let task = this.props.task
        return (
            <div>
                {task.map(task => {
                    return (
                        <li>
                            <input 
                                type="checkbox" 
                                key={task.id}
                                onClick={(event) => this.updateStudentEvent(event, task.id)}>
                            </input>
                            <div>{moment(task.due_date).format('MM-DD-YYYY')}</div>
                            <div>{task.task}</div>
                        </li>
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

export default (withRouter(connect(putReduxStateOnProps)(TaskListItem)));