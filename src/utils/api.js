import {
  _getUsers,
  _getQuestions,
  _saveVoteToggle,
  _saveQuestion,
  _saveQuestionAnswer, 
  _saveUserAnswer
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveVoteToggle (info) {
  return _saveVoteToggle(info)
}

export function saveQuestion (info) {
  return _saveQuestion(info)
}
export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}
