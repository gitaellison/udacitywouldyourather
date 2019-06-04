import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../../utils/helpers'
import { handleToggleQuestion } from '../../actions/questions'
import { Redirect } from 'react-router-dom'

class AnsweredQuestion extends Component {
  state = {
    redirectToQuestion: false,
    selection: ''
  }
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props

  }

  redirectToDetails(){
    this.setState({redirectToQuestion: true});
  }

  render() {
    const { question, id, authedUser } = this.props

    if (question === null) {
      return <p> 404 Error This Question doesn't exist</p>
    }
  
    if(this.state.redirectToQuestion){
      return <Redirect to={`/questions/${question.id}`}  />
    }
    const {name, timestamp, text, hasVoted, votes} = question
    let optionOne = question["optionOne"];
    let optionTwo = question["optionTwo"];
    
    var sel = '';
    if(optionOne.votes.includes(authedUser)){
      sel = optionOne.text;
    }
    else{
      sel = optionTwo.text;
    }
    return (
      <div className='question'>
        <div className='question-info'>
          <div> 
            Asked by {question.author}
            <div>Would you rather</div>
            <div>{optionOne.text} or {optionTwo.text}</div>
            <div>{formatDate(timestamp)}</div>
            <p>Your selection: {sel}</p>
            <button onClick={() => this.redirectToDetails()}>View Details</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question, 
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(AnsweredQuestion)