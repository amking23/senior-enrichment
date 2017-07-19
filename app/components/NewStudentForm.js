import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'

// const mapStateToProps = function(state) {
//   return {
//     campuses: state.campuses
//   }
// }

// const mapDispatchToProps = null;

function NewStudentForm(props){
  return (
    <div>
      <Navbar />
        <h2>Add Student:</h2>
        <form>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="E-Mail" />
          <input type="text" placeholder="Image Link" />
            <select name="cars">
              <option value="1">Campus 1</option>
              <option value="2">Campus 2</option>
              <option value="3">Campus 3</option>
              <option value="4">Campus 4</option>
            </select>
          <button>Submit</button>
        </form>
    </div>
  )
}

// const CampusListContainer = connect(mapStateToProps, mapDispatchToProps)(listCampuses)

export default NewStudentForm;


