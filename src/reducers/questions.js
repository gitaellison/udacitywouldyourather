import { RECEIVE_QUESTIONS, TOGGLE_QUESTION, ADD_QUESTION, ADD_QUESTION_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case TOGGLE_QUESTION :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      }
      case ADD_QUESTION :
        const { question } = action
  
        return {
          ...state,
          [action.question.id]: action.question
        }

        case ADD_QUESTION_ANSWER:
          return {
            ...state,
            [action.qid]: {
              ...state[action.qid],
              [action.answer]: {
                ...state[action.qid][action.answer],
                votes: state[action.qid][action.answer].votes.concat([action.authedUser])
              }
            }
          }
      default :
        return state
  }
}