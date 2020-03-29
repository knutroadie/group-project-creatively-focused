import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
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
                        <div>
                            <ListItem key={task.id}>
                                <Checkbox
                                    key={task.id}
                                    onClick={(event) => this.updateStudentEvent(event, task.id)}>
                                </Checkbox>
                                <ListItemText>
                                {moment(task.due_date).format('MM-DD-YYYY')}<br />
                                {task.task}<br />
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

export default (withRouter(connect(putReduxStateOnProps)(TaskListItem)));