export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const SAVE_QUESTION = 'SAVE_QUESTIONS'


export function receiveQuestions(questions)
{
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function saveAnswer(authedUser, qid, answer){
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

export function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}