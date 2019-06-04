import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class LogOut extends Component {

    componentWillMount() {
      this.props.dispatch(setAuthedUser(false))
    }

     render() {
      return  <Redirect to='/' />      
    }
  }
  
  export default connect()(LogOut)