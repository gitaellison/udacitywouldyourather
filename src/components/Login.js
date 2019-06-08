import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class LogIn extends Component {
    state = {
      redirect: false
    }
    componentWillMount() {
      this.props.dispatch(setAuthedUser(false))
    }
    handleLogin (id) {
      console.log("user id: ", id)
      const {dispatch} = this.props
      dispatch(setAuthedUser(id))
      this.setState({ redirect: true })
    }
    render() {
      if(this.props.location !== undefined && this.state.redirect){
        return <Redirect to= {this.props.location.state.priorPath} />
      }

      if (this.state.redirect) {
        return <Redirect to='/home' />
      }
      return (
        <div className="container">
          <div  className="center">
          <p>{React.version}</p>
           <h2>Who are you?</h2>
           {Object.values(this.props.users).map((user) => (
       
            <div key={user.id}>
            <img src = {user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
            <button className="loginButton" onClick={() => this.handleLogin(user.id)}>{user.name}</button>
            </div>
          )
        )}
        </div></div>
      )
    }
  }
  
  function mapStateToProps({users, authedUser}){
    return{
        users,
        loggedIn: authedUser !== null, 
        authedUser
    }
}
 
  export default connect(mapStateToProps)(LogIn)