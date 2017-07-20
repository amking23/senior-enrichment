import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router'
import { addStudentThunkCreator } from '../reducers/index.jsx'
import StudentListContainer from './Students'




class NewStudentForm extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      selectedCampus: '1',
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
        campusId: this.state.selectedCampus
        }
      );
    this.state.redirectToStudents = true;
  }

  getSelectedCampus(event){
    var id = event.nativeEvent.target.selectedIndex;
    this.setState({selectedCampus: event.nativeEvent.target[id].text})
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
                <option name="1">1</option>
                <option name="2">2</option>
                <option name="3">3</option>
                <option name="4">4</option>
              </select>
              <input type="submit" />
          </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    students: state.students
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    addStudent: function(studentToAdd){
      dispatch(addStudentThunkCreator(studentToAdd))
    }
  }
}

// const mapDispatchToProps = dispatch => ({
//   addStudent:(studentToAdd) => dispatch(addStudentThunkCreator(studentToAdd))
// });


const NewStudentFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudentForm)

export default NewStudentFormContainer;


