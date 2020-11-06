import {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ
} from '../actions/actionTypes'

const initialState = {
  quizes: [],
  isLoaded: true,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

export default function quizReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, 
        isLoaded: false
      }
      case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        quizes: action.quizes,
        isLoaded: true
      }
      case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        isLoaded: true
      }
      case FETCH_QUIZES_ERROR:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      }
      case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
      case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      }
      case QUIZ_NEXT_QUESTION:
        return {
          ...state,
          activeQuestion: state.activeQuestion + 1,
          answerState: null
        }
      case RETRY_QUIZ:
        return {
          ...state,
          activeQuestion: 0,
          answerState: null,
          isFinished: false,
          results: {}
        }

    default: 
      return state
  }
}