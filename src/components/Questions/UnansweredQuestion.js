import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../../utils/helpers'
import { handleSaveQuestionAnswer } from '../../actions/questions'
import { Redirect } from 'react-router-dom'

class UnansweredQuestion extends Component {

  state = {
    redirectToQuestion: false
  }

  handleVote = answerObj => {
      const { dispatch } = this.props
      dispatch(handleSaveQuestionAnswer(answerObj))
      this.setState({redirectToQuestion: true});
    }
  
  render() {
    const { question, id, user, authedUser } = this.props

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    const {name, timestamp, text, hasVoted, votes} = question
    let optionOne = question["optionOne"];
    let optionTwo = question["optionTwo"];
    
    if(this.state.redirectToQuestion){
      return <Redirect to={`/questions/${question.id}`}  />
    }

    return (
      <div className='container'>
        <div>
          <div> 
          <img src = {user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
            <div>Would you rather</div>
            <div><button onClick={e =>
                    this.handleVote({
                      answer: 'optionOne',
                      authedUser,
                      qid: question.id
                    })}>Option One: {optionOne.text}</button>
            <button onClick={e =>
                    this.handleVote({
                      answer: 'optionTwo',
                      authedUser,
                      qid: question.id
                    })}>Option Two: {optionTwo.text}</button></div>
            <div>{formatDate(timestamp)}</div>
            <p>{text}</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id];
  const {author} = question;
  return {
    authedUser,
    question: question, 
    user: users[author]
  }
}

export default connect(mapStateToProps)(UnansweredQuestion)