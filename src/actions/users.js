export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveAnswer(authedUser, qid, answer){
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function saveQuestion (user, qid) {
    return {
      type: SAVE_QUESTION,
      user,
      qid,
    }
}