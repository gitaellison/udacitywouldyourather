import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AnsweredQuestion from './Questions/AnsweredQuestion';
import UnansweredQuestion from './Questions/UnansweredQuestion';

class Dashboard extends Component {
  state = {
    displayAnswered: false
  }


  displayAnswered(){
    this.setState({displayAnswered: true});

  }

  displayUnanswered(){
    this.setState({displayAnswered: false});

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

      return keys;
}
  GetUnansweredQuestions(){
      const {questions, authedUser} = this.props
      const keys = []
      const arr = Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp);
        arr.forEach(element => {
          if(!questions[element]["optionOne"]["votes"].includes(authedUser) && 
          !questions[element]["optionTwo"]["votes"].includes(authedUser)){
            keys.push(element);
          }
        });

        return keys;
      }
      
  ShowQuestions(){
    if(this.state.displayAnswered){
      return <div>{this.GetAnsweredQuestions().map((key) => <AnsweredQuestion id={key} key={this.uuidv4()}/>)}</div>
    }
    else{
      return <div>{this.GetUnansweredQuestions().map((key) => <UnansweredQuestion id={key} key={this.uuidv4()}/>)}</div>
    }
  }

  ///took this from stackoverflow creating unique id
   uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  render() {
    if (!this.props.loggedIn) {
        return <Redirect to={{
        pathname: '/',
        state: { priorPath: '/home' }
      }}/>
    }

    return (
      <div  className='center'>
        <h3>Your Timeline</h3>
        <ul className='dashboard-list'>
        <button onClick={() => this.displayAnswered()}>Answered Questions</button>
        <button onClick={() => this.displayUnanswered()}>Unanswered Questions</button>
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
    loggedIn: authedUser != false
  }
}

export default connect(mapStateToProps)(Dashboard)