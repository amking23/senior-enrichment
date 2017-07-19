import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import { removeStudentThunkCreator } from '../reducers/index.jsx'


const mapStateToProps = function(state) {
  return {
    students: state.students
  }
}

const mapDispatchToProps = dispatch => ({
  removeStudent:(studentId) => dispatch(removeStudentThunkCreator(studentId))
});

function listStudents(props){

  return (
    <div>
      <Navbar />
      <h1 className='campusesList'>Students <NavLink to="/students/add" className='plus'>+</NavLink></h1>

      <table className='studentsTable'>
        <tbody>
          <tr>
            <th className="tableHeadings">Student Name</th>
            <th className="tableHeadings">Campus</th> 
            <th className="tableHeadings">Expell Student</th>
          </tr>
          {
            props.students.map(function(student){
              return (
                  <tr key={student.id}>
                      <td><NavLink to={`/students/${student.id}`}>{student.name}</NavLink></td>
                      <td><NavLink to={`/campuses/${student.campus.id}`}>{student.campus.name}</NavLink></td>
                      <td><button className='X' onClick={() => props.removeStudent(student.id)} type="button">X</button></td>
                  </tr>
                )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(listStudents)

export default StudentListContainer