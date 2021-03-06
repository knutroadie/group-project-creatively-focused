import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user.css';
// import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';
import { Calendar, momentLocalizer, } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Checkbox from '@material-ui/core/Checkbox';
import UserList from '../UserList/UserList';

// styling
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// variables
const localizer = momentLocalizer(moment);
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

// this page needs access to redux on props,
// a local state that holds the logged-in user's info
// and an editUser function that updates local state,
// then dispatches local state to the database to update it

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_TEACHERS' });
    this.props.dispatch({ type: 'GET_STUDENTS' });
    this.props.dispatch({ type: 'GET_STUDENTEVENT' });
    this.props.dispatch({ type: 'GET_SCHOOLS' });
    this.props.dispatch({ type: 'GET_DISTRICTS' });
  }

  state = {
    user: {
      // this is where the user's info is held locally
    },
    complete: false, // marked complete default false - changes to true in db
    id: this.props.students
  }

  // changes checkboxes in task list to true
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });

  };

  updateStudentEvent = (e, id) => {
    // console.log('updating student event', event, propertyValue);
    console.log(id);
    // dispatch calls 'EDIT_STUDENTEVENT' which'll make a call to redux/database to edit an event
    this.props.dispatch({
      type: 'EDIT_STUDENTEVENT',
      payload: id
    })
  }

  // formatEventsForCalendar = (studentEvents) => {
  //   // object that will have the amount of studentEvents within that month
  //   // jan = 0, dec = 11
  //   let year = {
  //     0: 0,
  //     1: 0,
  //     2: 0,
  //     3: 0,
  //     4: 0,
  //     5: 0,
  //     6: 0,
  //     7: 0,
  //     8: 0,
  //     9: 0,
  //     10: 0,
  //     11: 0
  //   };

  //   this.props.students.map(studentEvent => {
  //     // takes the index of year and increment studentEvent in that month
  //     year[moment(studentEvent.next_iep).month()]++
  //     year[moment(studentEvent.next_eval).month()]++

  //   });
  //   // loops through studentEvents and turns it into an object for calendar
  //   // let formatedStudentEvents = studentEvents.map(studentEvent => {

  //   //   // if the year's index is more than 3 change all events in that month
  //   //   if (year[moment(studentEvent.due_date).month()] > 3) {
  //   //     return {
  //   //       start: new Date(studentEvent.due_date),
  //   //       end: new Date(studentEvent.due_date),
  //   //       title: `⚠ ${studentEvent.student_firstname}'s ${studentEvent.task}`
  //   //     }
  //   //     // the standard object to return
  //   //   } else {
  //   //     return {
  //   //       start: new Date(studentEvent.due_date),
  //   //       end: new Date(studentEvent.due_date),
  //   //       title: `${studentEvent.student_firstname}'s ${studentEvent.task}`
  //   //     }
  //   //   }
  //   // });
  //   //returns one of the objects
  //   return formatedStudentEvents;
  // }

  render() {
    console.log(this.props.reduxState);
    
    // sets the events for calendar using the student's dates
    // let events = this.formatEventsForCalendar(this.props.student);    
    return (
      <div className="welcome">
        <h1>Welcome, {this.props.reduxState.user.firstname}!</h1>
        {/* <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "80vh", width: "100%" }}
        /> */}
        <h2 id="h3">UPCOMING DEADLINES</h2>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>Date Due</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Student Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxState.studentEvent.map(event => (
              // maps over studentsEvent reducer
              <TableRow key={event.id}>
                <TableCell>
                  <Checkbox
                    key={event.id}
                    checked={this.state.checkedB}
                    onChange={(e) => this.updateStudentEvent(e, event.id)}
                    value="true"
                    color="primary"
                  /></TableCell>
                <TableCell><Moment format="MM-D-YYYY">{event.due_date}</Moment></TableCell>
                <TableCell>{event.task}</TableCell>
                <TableCell>{event.student_lastname}, {event.student_firstname}</TableCell>
              </TableRow>
            )
            )}
          </TableBody>
        </Table>
        <UserList />
      </div>
    )
  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
// const mapStateToProps = (reduxState) => ({
//   user: state.user,
//   students: state.students
// });

const putReduxStateOnProps = (reduxState) => {
  return {
      reduxState
  }
}

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(putReduxStateOnProps)(UserPage));