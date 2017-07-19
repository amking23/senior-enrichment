import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'


const mapStateToProps = function(state) {
  return {
    students: state.students
  }
}

const mapDispatchToProps = null;

function listStudents(props){

  return (
    <div>
      <Navbar />
      <h1 className='campusesList'>Students</h1>

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
                      <td><button className='X' type="button">X</button></td>
                  </tr>
                )
            })
          }
        </tbody>
      </table>


      <h2>Add Student:</h2>
      <form>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="E-Mail" />
          <select name="cars">
            <option value="#">Campus 1</option>
            <option value="#">Campus 2</option>
            <option value="#">Campus 3</option>
            <option value="#">Campus 4</option>
          </select>
      </form>
    </div>
  )
}

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(listStudents)

export default StudentListContainer