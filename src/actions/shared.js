import { receiveUsers, saveAnswer as UserAnswer, saveQuestion as UserQuestion } from './users'
import { receiveQuestions, saveAnswer as QuestionAnswer, saveQuestion } from './questions'
import { setAuthedUser } from './authedUser'
import { _getQuestions, _getUsers, _saveQuestionAnswer, _saveQuestion } from '../data/_DATA'


const AUTHED_ID = null

function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}



export function handleInitialData() {
  return (dispatch) => {
      return getInitialData().then(
          ({users, questions}) => {
              dispatch(receiveUsers(users))
              dispatch(receiveQuestions(questions))
              dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}

export function handleAnswer (authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(QuestionAnswer(authedUser, qid, answer))
    dispatch(UserAnswer(authedUser, qid, answer))
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
  }
}


export function handleQuestion(author, optionOneText, optionTwoText){
  const question = {
    author,
    optionOneText,
    optionTwoText,
  }
  return (dispatch) => {
    return _saveQuestion(question).then((ques) => {
      dispatch(saveQuestion(ques))
      dispatch(UserQuestion(ques.author, ques.id))
    })
  }
}
