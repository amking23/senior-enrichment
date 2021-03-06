import { combineReducers } from 'redux'
import axios from 'axios'
import store from '../store.jsx'


function getInitialState() {
  return {
    students: [],
    campuses: [],
    selectedCampus: {
      students: []
    },
    selectedStudent: {
      campus: {}
    },
    studentToRemove: {},
    studentToAdd: {},
    campusToAdd: {},
    campusToRemove: {}
  }
}

//ACTIONS----------------------------------------------------------

const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const GET_STUDENT = 'GET_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
const ADD_CAMPUS = 'ADD_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';


//ACTION CREATORS----------------------------------------------------------

export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

export function getIndividualCampusStudents (selectedCampus) {
  const action = { type: GET_CAMPUS, selectedCampus };
  return action;
}

export function getStudent (selectedStudent) {
  const action = { type: GET_STUDENT, selectedStudent };
  return action;
}

export function removeStudent (studentToRemove) {
  const action = { type: REMOVE_STUDENT, studentToRemove}
  return action
}

export function addStudent (studentToAdd) {
  const action = { type: ADD_STUDENT, studentToAdd}
  return action
}

export function addCampus (studentToAdd) {
  const action = { type: ADD_CAMPUS, campusToAdd}
  return action
}

export function removeCampus (campusToRemove) {
  const action = { type: REMOVE_CAMPUS, campusToRemove}
  return action
}


//REDUCERS----------------------------------------------------------

export const rootReducer = function(state = getInitialState(), action) {
  switch(action.type) {
    
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students})
    
    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses})

    case GET_CAMPUS:
      return Object.assign({}, state, {selectedCampus: action.selectedCampus})

    case GET_STUDENT:
      return Object.assign({}, state, {selectedStudent: action.selectedStudent})

    case REMOVE_STUDENT:
      return Object.assign({}, state, {students: state.students.filter(student => student.id !== action.studentToRemove)})

    case ADD_STUDENT:
      return Object.assign({}, state, {students: [action.students, ...action.studentToAdd]})

    case ADD_CAMPUS:
      return Object.assign({}, state, {campuses: [action.campuses, ...action.campusToAdd]})

    case REMOVE_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.filter(campus => campus.id !== action.campusToRemove)})

    default: return state

  }
};

//THUNK CREATORS----------------------------------------------------------
export function getStudentsThunkCreator() {
  return function getStudentsThunk(dispatch) {
    return axios.get('/api/students')
      .then(function(res){
        return res.data
      })
      .then(function(students) {
        const action = getStudents(students)
        dispatch(action)
      })
      .catch(err => console.error('Fetching students unsuccessful', err))
  }
}

export function getCampusesThunkCreator() {
  return function getCampusesThunk(dispatch) {
    return axios.get('/api/campuses')
      .then(function(res){
        return res.data
      })
      .then(function(campuses) {
        const action = getCampuses(campuses)
        dispatch(action)
      })
      .catch(err => console.error('Fetching campuses unsuccessful', err))
  }
}

export function getIndividualCampusThunkCreator(campusId) {
  return function getIndividualCampusThunk(dispatch) {
    return axios.get(`/api/campuses/${campusId}`)
      .then(function(res){
        return res.data
      })
      .then(function(selectedCampus) {
        const action = getIndividualCampusStudents(selectedCampus)
        dispatch(action)
      })
      .catch(err => console.error('Fetching students at campus unsuccessful', err))
  }
}

export function getStudentThunkCreator(studentId) {
  return function getStudentThunk(dispatch) {
    return axios.get(`/api/students/${studentId}`)
      .then(function(res){
        return res.data
      })
      .then(function(selectedStudent) {
        const action = getStudent(selectedStudent)
        dispatch(action)
      })
      .catch(err => console.error('Fetching students unsuccessful', err))
  }
}

export function removeStudentThunkCreator(studentId) {
  return function removeStudentThunk(dispatch) {
    dispatch(removeStudent(studentId));
    axios.delete(`/api/students/${studentId}`)
    .then(function(){
      store.dispatch(getCampusesThunkCreator())
    })
      .catch(err => console.error(`Removing student: ${studentId} unsuccessful`, err))
  }
}

export function addStudentThunkCreator(studentToAdd) {
  return function addStudentThunk(dispatch) {
    axios.post(`/api/students/add`, studentToAdd)
    .then(function(){
      store.dispatch(getStudentsThunkCreator())
    })
      .catch(err => console.error(`Adding student unsuccessful`, err))
  }
}

export function addCampusThunkCreator(campusToAdd) {
  return function addCampusThunk(dispatch) {
    axios.post(`/api/campuses/add`, campusToAdd)
    .then(function(){
      store.dispatch(getCampusesThunkCreator())
    })
      .catch(err => console.error(`Adding campus unsuccessful`, err))
  }
}

export function removeCampusThunkCreator(campusId) {
  return function removeCampusThunk(dispatch) {
    dispatch(removeCampus(campusId));
    axios.delete(`/api/campuses/${campusId}`)
      .catch(err => console.error(`Removing campus: ${campusId} unsuccessful`, err))
  }
}

export default rootReducer
