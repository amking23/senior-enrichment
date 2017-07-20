import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router'
import { addStudentThunkCreator } from '../reducers/index.jsx'




class NewStudentForm extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      selectedCampus: 'Lake Tahoe',
      selectedCampusId: '1',
      redirectToStudents: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.getSelectedCampus = this.getSelectedCampus.bind(this)
  }


  onSubmit(event) {
    event.preventDefault();
    this.props.addStudent(
      { name: event.target.name.value,
        email: event.target.email.value,
        image: event.target.image.value,
        campusId: this.state.selectedId,
        }
      );
    this.state.redirectToStudents = true;
  }

  getSelectedCampus(event){
    var id = event.nativeEvent.target.selectedIndex;
    let currentCampusName = event.nativeEvent.target[id]
    console.log('props ', this.props)
    let currentCampusId = this.props.campuses.filter(function(campus){
      // console.log(campus.name)
      // console.log(currentCampusName)
      console.log(campus.name === currentCampusName.innerHTML)
      return campus.name === currentCampusName.innerHTML
    })[0].id
    this.setState({selectedCampus: currentCampusName})
    this.setState({selectedId: currentCampusId})
  }

  render() {
    if(this.state.redirectToStudents){
      return (
        <Redirect to='/students' />
     )
    }
    return (
      <div>
        <Navbar />
          <h2>Add Student:</h2>
          <form onSubmit={this.onSubmit}>
              <input name="name" type="text" placeholder="First Name" />
              <input name="email" type="text" placeholder="E-Mail" />
              <input name="image" type="text" placeholder="Image URL" />
              <select onChange={this.getSelectedCampus} name="campusId">
                {
                  this.props.campuses.map(campus => (
                    <option key={campus.id}>{campus.name}</option>
                  ))
                }
              </select>
              <input type="submit" />
          </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    students: state.students,
    campuses: state.campuses
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    addStudent: function(studentToAdd){
      dispatch(addStudentThunkCreator(studentToAdd))
    }
  }
}


const NewStudentFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudentForm)

export default NewStudentFormContainer;


