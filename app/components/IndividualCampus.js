import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import {getIndividualCampusThunkCreator} from '../reducers/index.jsx'
import { NavLink } from 'react-router-dom'


class listCampusStudents extends Component{
  constructor(){
    super();
  }

  componentDidMount(){
    const getIndividualCampusThunk = getIndividualCampusThunkCreator(this.props.match.params.campusId);
    store.dispatch(getIndividualCampusThunk)
  }

  render(){
    return (
      <div>
        <Navbar />
        <h1 className="campusesList">{ this.props.selectedCampus.name }</h1>
        <img className="campusPic" src={ this.props.selectedCampus.image } />
        <ul className="center">
        {
          this.props.selectedCampus.students.map(function(student){
            return (
                <li key={student.id}>
                  <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
                </li>
              )
          })
        }
        </ul>
      </div>
    )
  }
}

//CONTAINER
const mapStateToProps = function(state) {
  return {
    selectedCampus: state.selectedCampus
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCampusStudents:() => {
    selectedCampus: dispatch(getIndividualCampusThunk())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(listCampusStudents)



