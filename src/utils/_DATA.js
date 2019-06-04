let users = {
  sarah_edo: {
    id: "sarah_edo",
    name: "Sarah Drasner",
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
    questions: ['8xf0y6ziyjabvozdd253nd'],
    answers: {
      "f4xzgapq7mu783k9t02ghx": 'optionOne',
    },
  },
  tylermcginnis: {
    id: "tylermcginnis",
    name: "Tyler McGinnis",
    avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
    questions: ['5w6k1n34dkp1x29cuzn2zn'],
    answers: {
      "5c9qojr2d1738zlx09afby": 'optionOne',
    },
  },
  dan_abramov: {
    id: "dan_abramov",
    name: "Dan Abramov",
    avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
    questions: ['5c9qojr2d1738zlx09afby'],
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
    },

  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarah_edo",
    timestamp: 1518122597860,
    optionOne: {
      votes: ['dan_abramov'],
      text: 'eat icecream forever'
    },
    optionTwo: {
      votes: [],
      text: 'eat pizza forever'
    }
  },

  "5c9qojr2d1738zlx09afby": {
    id: "5c9qojr2d1738zlx09afby",
    author: "dan_abramov",
    timestamp: 1518043995650,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'travel to switzerland'
    },
    optionTwo: {
      votes: [],
      text: 'travel to puerto rico'
    }
  },
  "f4xzgapq7mu783k9t02ghx": {
    id: "f4xzgapq7mu783k9t02ghx",
    author: "tylermcginnis",
    timestamp: 1517043995650,
    optionOne: {
      votes: ['sarah_edo'],
      text: 'a million dollars'
    },
    optionTwo: {
      votes: [],
      text: 'debt free for life'
    },
  },
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

export function _saveVoteToggle ({ id, hasVoted, authedUser }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      questions = {
        ...questions,
        [id]: {
          ...questions[id],
          votes: hasVoted === true
            ? questions[id].votes.filter((uid) => uid !== authedUser)
            : questions[id].votes.concat([authedUser])
        }
      }

      res()
    }, 500)
  })
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatQuestion ({optionOne, optionTwo, author}) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOne,
    },
    optionTwo: {
      votes: [],
      text: optionTwo,
    }
}}

export function _saveQuestion ({ optionOne, optionTwo, author}) {
  return new Promise((res, rej) => {
    const formattedQuestion = formatQuestion({
      optionOne, optionTwo,
      author
    })

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      }

      users = {
        ...users,
        [author]: {
          ...users[author],
          questions: users[author].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [ authedUser]: {
          ...users[ authedUser],
          answers: {
            ...users[ authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}