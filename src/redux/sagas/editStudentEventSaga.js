import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editStudentEventSaga() {
    yield takeLatest('EDIT_STUDENTEVENT', editStudentEvent);
}

// this dispatches a PUT to the server
// updating a targeted row in the database
// afterward, it does a get to refresh the page
function* editStudentEvent(action) {
    console.log('in editStudentEvent saga', action.payload);
    yield axios.put(`/api/studentEvent/${action.payload.id}`, action.payload);
    console.log(action.payload.id, action.payload)
    yield put({ type: 'GET_STUDENTEVENT' });
}

export default editStudentEventSaga;