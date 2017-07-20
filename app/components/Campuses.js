import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import { removeCampusThunkCreator } from '../reducers/index.jsx'


const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = dispatch => ({
  removeCampus:(campusId, campus) => {
    console.log('campuses: ', campus)
    if(campus.students.length === 0){
      return dispatch(removeCampusThunkCreator(campusId))
    } else {
      console.log('students: ', campus.students)
      alert("Can't delete campus while students are attending! Please expell or reassign students attending this campus.");
    }
  }
});


function listCampuses(props){
  return (
    <div>
      <Navbar />
      <h1 className='campusesList'>Campuses <NavLink to="/campuses/add" className='plus'>+</NavLink></h1>
      <ul>
        {
          props.campuses.map(function(campus){
            return (
                <li key={campus.id}>
                  <h1 className="campusesList"><NavLink to={`/campuses/${campus.id}`}>{campus.name}</NavLink><button className='X' onClick={() => props.removeCampus(campus.id, campus)} type="button">X</button></h1>
                  <NavLink to={`/campuses/${campus.id}`}><img className="campusPic" src={campus.image} /></NavLink>
                </li>
              )
          })
        }
      </ul>
    </div>
  )
}

const CampusListContainer = connect(mapStateToProps, mapDispatchToProps)(listCampuses)

export default CampusListContainer


