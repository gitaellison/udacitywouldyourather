import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
    render() {
      return (
           <div>{this.props.authedUser}</div>
          )
        }
  }

  function mapStateToProps({authedUser}){
    return{
        authedUser
    }
}

  export default connect(mapStateToProps)(User)