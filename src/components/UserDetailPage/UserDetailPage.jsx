import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskList from '../TaskList/TaskList';

class UserDetailPage extends Component {

    // GET request for details of the item clicked on
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TEACHER_DETAIL',
            payload: this.props.match.params.id
        })
    }

    // directs the user to an edit page pre-populated with the item's info
    editUser = () => {
        console.log('clicking to go edit', this.props.match.params.id);
        this.props.history.push(`/edituser/${this.props.match.params.id}`)
    }

    // dispatches a DELETE to the database via redux saga for the item clicked on
    deleteUser = () => {
        console.log('clicking to delete', this.props.reduxState.teacherDetail.id);
        this.props.dispatch({
            type: 'DELETE_USER',
            payload: this.props.match.params.id
        })
        this.props.history.push(`/adminhome`)
    }

    goToUserList = () => {
        console.log('going back to student list');
        this.props.history.push(`/adminhome`)
    }


    render() {
        let user = this.props.reduxState.teacherDetail;
        return (
            <div>
                <h1>Username: {user.username}</h1>
                <p>ID: {user.id}</p>
                <p>School: {user.school}</p>
                <p>ISD: {user.isd}</p>
                <p>Phone Number: {user.phone}</p>
                <button onClick={this.editUser}>edit user</button><br />
                <button onClick={(event) => { if (window.confirm('are you sure you want to delete this user?')) this.deleteUser(event) }}>delete user</button>
                {/* SHOULD WE HAVE A LIST OF DEADLINES HERE? */}
                {/* <ol>
                    <li><input type="checkbox"></input>This is a task.</li>
                    <li><input type="checkbox"></input>This is another task.</li>
                    <li><input type="checkbox"></input>This is a third task.</li>
                </ol> */}
                <button onClick={this.goToUserList}>BACK TO USER LIST</button>

                <TaskList />
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(UserDetailPage));