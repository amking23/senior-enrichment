import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'



const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = null;

function listCampuses(props){
  return (
    <div>
      <Navbar />
      <ul>
        {
          props.campuses.map(function(campus){
            return (
                <li key={campus.id}>
                  <h1 className="campusesList"><NavLink to={`/campuses/${campus.id}`}>{campus.name}</NavLink></h1>
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


