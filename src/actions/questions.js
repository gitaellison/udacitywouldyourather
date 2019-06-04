import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveQuestionAnswer,
  saveQuestion,
  saveVoteToggle
} from '../utils/api'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function addQuestionAnswer (authedUser, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser, qid, answer
  }
}

export function addUserAnswer (authedUser, qid, answer) {
  return {
    type: ADD_USER_ANSWER,
    authedUser, qid, answer
  }
}

export function handleAddQuestion (optionOne, OptionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOne: optionOne, 
      optionTwo: OptionTwo,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleSaveQuestionAnswer(obj){
    
  return(dispatch, getState) => {
      
      const {authedUser} = getState()
      const qid = obj.qid;
      const answer = obj.answer;

      console.log("The authedUser: ", obj.authedUser)
      console.log("The questionId: ", obj.qid)
      console.log("The answer selected: ", obj.answer)
      saveQuestionAnswer({authedUser, qid, answer}).catch((e) => {
        console.warn("Error in handleAnswerQuestion")

      })
      .then(() => dispatch(addQuestionAnswer(authedUser, qid, answer)))
      .then(() => dispatch(addUserAnswer(authedUser, qid, answer)))
  }
}    
 
export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function toggleQuestion ({ id, authedUser, hasVoted }) {
  return {
    type: TOGGLE_QUESTION,
    id,
    authedUser,
    hasVoted
  }
}

export function handleTogglequestion (info) {
  return (dispatch) => {
    dispatch(toggleQuestion(info))

    return saveVoteToggle(info)
      .catch((e) => {
        console.warn('Error in handleTogglequestion: ', e)
        dispatch(toggleQuestion(info))
        alert('The was an error liking the question. Try again.')
      })
  }
}