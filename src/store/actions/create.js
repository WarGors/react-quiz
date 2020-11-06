import {CREATE_QUIZ_QUESTION, RESET_QUIZ_QUESTIONS} from './actionTypes'
import axios from '../../Axios/Axios'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export function finishCreateQuiz(quiz) {
  return async dispatch => {
    await axios.post('/quiz/tests.json', quiz)

    dispatch(resetQuizQuestions())
  }
}

export function resetQuizQuestions() {
  return {
    type: RESET_QUIZ_QUESTIONS
  }
}