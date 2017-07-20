import React from 'react';
import { connect } from 'react-redux';
import store from '../store.jsx'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router'
import { addCampusThunkCreator } from '../reducers/index.jsx'


class NewCampusForm extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      redirectToCampuses: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }


  onSubmit(event) {
    event.preventDefault();
    this.props.addCampus(
      { name: event.target.name.value,
        image: event.target.image.value,
        }
      );
    this.state.redirectToCampuses = true;
  }

  render() {
    if(this.state.redirectToCampuses){
      return (
        <Redirect to='/campuses' />
     )
    }
    return (
      <div>
        <Navbar />
          <h2>Add Campus:</h2>
          <form onSubmit={this.onSubmit}>
              <input name="name" type="text" placeholder="Campus Name" />
              <input name="image" type="text" placeholder="Image URL" />
              <input type="submit" />
          </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    addCampus: function(campusToAdd){
      dispatch(addCampusThunkCreator(campusToAdd))
    }
  }
}


const NewCampusFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewCampusForm)

export default NewCampusFormContainer;