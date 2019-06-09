import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../../utils/helpers'
import { handleSaveQuestionAnswer } from '../../actions/questions'
import { Redirect } from 'react-router-dom'

class PollDetails extends Component {

  render() {

  
    const { questions, match, authedUser} = this.props
    const id = match.params.id;
    const question = questions[id];
    if (!this.props.loggedIn) {
      return <Redirect to={{
      pathname: '/',
      state: { priorPath: '/questions/'+ id}
    }}/>
  }
    if (question === undefined) {
      return <p className='center'> 404 Error This Question doesn't exist</p>
    }

    if(!question["optionOne"]["votes"].includes(authedUser) && !question["optionTwo"]["votes"].includes(authedUser)){
      return <Redirect to= '/home'/>
    }

    const optionOneVotes = question["optionOne"]["votes"].length;
    const optionTwoVotes =  question["optionTwo"]["votes"].length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    const optionOneP = (optionOneVotes/ totalVotes) *100;
    const optionTwoP = (optionTwoVotes/ totalVotes) *100;
    const {author} = question;
    var user =  this.props.users[author]
  
  
    return (
      <div className='container'>
        <div>Author: {question.author}</div>
        <img src = {user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
        <div><b>Would you rather {question["optionOne"].text}</b></div>
        <div>Percentage: {optionOneP}</div>
        <div><b>Would you rather {question["optionTwo"].text}</b></div>
        <div>Percentage: {optionTwoP}</div>
        <div>Total Votes Option One: {optionOneVotes}</div>
        <div>Total Votes Option Two: {optionTwoVotes}</div>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users , authedUser}) {
    return {
      questions, 
      users, 
      loggedIn: authedUser != false, 
      authedUser
    }
  }
  
export default connect(mapStateToProps)(PollDetails)