import { receiveUsers, saveAnswer as UserAnswer } from './users'
import { receiveQuestions, saveAnswer as QuestionAnswer } from './questions'
import { setAuthedUser } from './authedUser'
import { _getQuestions, _getUsers, _saveQuestionAnswer } from '../data/_DATA'


const AUTHED_ID = 'sarahedo'

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