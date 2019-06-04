import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
  state = {
    userList: [], 
    createdCount:0, 
    answeredCount:0
  }

  sortCreatedList(user){
    const{questions} = this.props;
    const arr = []
    const keys = Object.keys(questions);
      keys.forEach(element => {
        if(questions[element]["author"].includes(user)){
         arr.push(element);
        }
      });

    return arr.length;
  }

  sortAnsweredList(user){
    const{questions} = this.props;

    const arr = []
    const keys = Object.keys(questions);
      keys.forEach(element => {
        if(questions[element]["optionOne"]["votes"].includes(user)){
         arr.push(element);
        }
        if(questions[element]["optionTwo"]["votes"].includes(user)){
          arr.push(element);
        }
      });
      return arr.length;
    }

  sortUsers(){
    var arr =[]
    Object.keys(this.props.users).forEach(user => {
      var obj = {
        user:{
          id: user,
          created: this.sortCreatedList(user), 
          answered: this.sortAnsweredList(user)
          }
      };
     arr.push(obj);
    })
    arr.sort(function(a,b){return arr[a]-arr[b]});
    return arr;
  }

  showUsers(){
    const {users} = this.props;
    
    const userList = this.sortUsers();

    var stuff = userList.map(user => {
     var id = user.user.id;
     var u = user.user;
      
    return( <div key={id}>
      <img src = {users[id].avatarURL} alt={`Avatar of ${users[id].name}`} className="avatar" />
      <b>{users[id].name}</b>
      <div>Answered Questions: {u.answered}</div>
      <div>Created Questions: {u.created}</div>
      <div>Total: {u.answered + u.created}</div>
    </div>)
     })
     return stuff;
  }
  render() {
  this.sortUsers();

  return(
  <div class='center'>
    {this.showUsers()}
  </div>
  )
  }
}

function mapStateToProps ({ authedUser, questions , users}) {
  return {
    loggedIn: authedUser != null, 
    questions, 
    users
  }
}

export default connect(mapStateToProps)(LeaderBoard)