import { RECEIVE_USERS, SAVE_ANSWER, SAVE_QUESTION } from '../actions/users'

export default function users(state = {}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_ANSWER:
            return{
                ...state,
                [action.authedUser] : {
                    ...state[action.authedUser],
                    answers : {
                      ...state[action.authedUser].answers,
                      [action.qid] : action.answer
                    }
                }
            }
        case SAVE_QUESTION :
            return {
                ...state,
                [action.user] : {
                  ...state[action.user],
                  questions: [...state[action.user].questions, action.qid]
                }
              }
            default:
                return state
    }
}