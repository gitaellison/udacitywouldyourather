import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AnsweredQuestion from './Questions/AnsweredQuestion';
import UnansweredQuestion from './Questions/UnansweredQuestion';

class Dashboard extends Component {
  state = {
    answeredQuestions: [], 
    unansweredQuestions: [], 
    displayAnswered: true
  }

  GetAnsweredQuestions(){
    const {users, authedUser, questions} = this.props
    const authedAnswered = users[authedUser].answers
    // let keys = Object.keys(authedAnswered).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    ///users werent updating right
    const keys = []
    const arr = Object.keys(questions);
      arr.forEach(element => {
        if(questions[element]["optionOne"]["votes"].includes(authedUser)){
         keys.push(element);
        }
        if(questions[element]["optionTwo"]["votes"].includes(authedUser)){
          keys.push(element);
        }
      });

    this.setState({answeredQuestions:keys});
    this.setState({displayAnswered: true});
}
  GetUnansweredQuestions(){
      const {questions, authedUser} = this.props
      const keys = []
      const arr = Object.keys(questions);
        arr.forEach(element => {
          if(!questions[element]["optionOne"]["votes"].includes(authedUser)){
           keys.push(element);
          }
          if(!questions[element]["optionTwo"]["votes"].includes(authedUser)){
            keys.push(element);
          }
        });
  
      this.setState({unansweredQuestions:keys});
      this.setState({displayAnswered: false});
      }
      
  ShowQuestions(){
    if(this.state.displayAnswered){
      return <div>{this.state.answeredQuestions.map((key) => <AnsweredQuestion id={key}/>)}</div>
    }
    else{
      return <div>{this.state.unansweredQuestions.map((key) => <UnansweredQuestion id={key}/>)}</div>
    }
  }
  render() {
    console.log("logged in:" + this.props.loggedIn)

    if (!this.props.loggedIn) {
      return <Redirect to='/' />
    }
    return (
      <div  className='center'>
        <h3>Your Timeline</h3>
        <ul className='dashboard-list'>
        <button onClick={() => this.GetAnsweredQuestions()}>Answered Questions</button>
        <button onClick={() => this.GetUnansweredQuestions()}>Unanswered Questions</button>
        {this.ShowQuestions()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  console.log("questions: " + questions);
  return {
    questions,
    users,
    authedUser,
    loggedIn: authedUser != null
  }
}

export default connect(mapStateToProps)(Dashboard)