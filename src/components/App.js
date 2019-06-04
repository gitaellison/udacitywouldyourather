import React, { Component, Fragment } from 'react'
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './Questions/NewQuestion'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'
import LogOut from './LogOut'
import PollDetails from './Questions/PollDetails';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
          <Route
          path="/home"
          render={() => (<Nav /> )}
          /> 
          <Route
          path="/new"
          render={() => (<Nav /> )}
          />
          <Route
          path="/leaderboard"
          render={() => (<Nav /> )}
          />
           <Route
          path="/questions/:id"
          render={() => (<Nav /> )}
          />
            {this.props.loading === true
              ? <Login/>
              : 
              <div>
                  <Route path="/" exact component={Login} />
                  <Route path="/home" component={Dashboard}  />
                  <Route path="/new" component={NewQuestion} />
                  <Route path="/leaderboard" component={LeaderBoard}/>
                  <Route path="/logout" component={LogOut}/>
                  <Route path = "/questions/:id" component = {PollDetails}/>
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  console.log("autheduser:" + authedUser)

  return {
    loading: authedUser === null, 
    authedUser
  }
}

export default connect(mapStateToProps)(App)
