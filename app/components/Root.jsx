import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import {Route, Switch} from 'react-router-dom';
import {Router} from 'react-router'
import history from './history'
import { getStudentsThunkCreator, getCampusesThunkCreator } from '../reducers/index.jsx'
import store from '../store.jsx'
import StudentListContainer from './Students'
import CampusListContainer from './Campuses'
import IndividualCampusContainer from './IndividualCampus'
import IndividualStudent from './IndividualStudent'
import NewStudentForm from './NewStudentForm'
import NewCampusForm from './NewCampusForm'
import EditStudent from './EditStudent'


class Root extends Component {
  constructor() {
    super()
  }

  componentDidMount(){
    const getStudentsThunk = getStudentsThunkCreator();
    store.dispatch(getStudentsThunk)
    const getCampusesThunk = getCampusesThunkCreator();
    store.dispatch(getCampusesThunk)

  }

  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/students" component={StudentListContainer} />
          <Route path="/students/add" component={NewStudentForm} />
          <Route path="/students/edit/:studentId" component={EditStudent} />
          <Route path="/students/:studentId" component={IndividualStudent} />
          <Route exact path="/campuses" component={CampusListContainer} />
          <Route path="/campuses/add" component={NewCampusForm} />
          <Route path="/campuses/:campusId" component={IndividualCampusContainer} />
          <Route component={Home} />
        </Switch>
      </Router>
    );
  }
}

//CONTAINER
const mapPropsToState = null;

const mapDispatchToProps = dispatch => ({
  fetchInitialData:() => {
    students: dispatch(getStudentsThunk())
    campuses: dispatch(getCampusesThunk())
  }
});

export default connect(mapPropsToState, mapDispatchToProps)(Root)
    
