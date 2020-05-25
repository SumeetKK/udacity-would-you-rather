import { RECEIVE_USERS, SAVE_ANSWER } from '../actions/users'

export default function users(state = {}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_ANSWER:
            console.log('action', action);
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
            default:
                return state
    }
}