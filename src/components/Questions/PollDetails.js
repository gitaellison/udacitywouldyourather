import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../../utils/helpers'
import { handleSaveQuestionAnswer } from '../../actions/questions'

class PollDetails extends Component {

  render() {
    const { questions, match} = this.props
    const id = match.params.id;
    const question = questions[id];
    const optionOneVotes = question["optionOne"]["votes"].length;
    const optionTwoVotes =  question["optionTwo"]["votes"].length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    const optionOneP = (optionOneVotes/ totalVotes) *100;
    const optionTwoP = (optionTwoVotes/ totalVotes) *100;

    if (question === null) {
      return <p> 404 Error This Question doesn't exist</p>
    }
  
    return (
      <div className='container'>
        <div>Author: {question.author}</div>
        <div><b>Would you rather {question["optionOne"].text}</b></div>
        <div>Percentage: {optionOneP}</div>
        <div><b>Would you rather {question["optionTwo"].text}</b></div>
        <div>Percentage: {optionTwoP}</div>
        <div>TotalVotes: {totalVotes}</div>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
    return {
      questions
    }
  }
  
export default connect(mapStateToProps)(PollDetails)