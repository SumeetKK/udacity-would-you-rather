import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { _getQuestions, _getUsers } from '../data/_DATA'


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
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
        })
    }
}