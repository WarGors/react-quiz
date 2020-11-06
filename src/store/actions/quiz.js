import axios from '../../Axios/Axios'
import {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR, 
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ
} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quiz/tests.json')
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `${index + 1}. ${response.data[key][0]}`
        })
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError())
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    // console.log(this.props.match.params.id)
    try {
      const response =  await axios.get(`/quiz/tests/${quizId}.json`)
      const quiz = [...response.data]
      quiz.shift()
      dispatch(fetchQuizSuccess(quiz))
    } catch(e) {
      dispatch(fetchQuizesError(e))
    }
  }
} 

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key]) {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results), )
      dispatch(questionSwitch(500))

    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
      dispatch(questionSwitch(500))

    }
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function questionSwitch(ms) {
  return (dispatch, getState) => {
    const state = getState().quiz
    const timeout = window.setTimeout(() => {
      if (state.activeQuestion + 1 === state.quiz.length) {
        dispatch(finishQuiz())
      } else {
        dispatch(quizNextQestion())
      }
      window.clearTimeout(timeout)
    }, ms)
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQestion() {
  return {
    type: QUIZ_NEXT_QUESTION
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}