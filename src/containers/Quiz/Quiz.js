import React, {Component, Fragment} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../Axios/Axios'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
  state = {
    isLoaded: false,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
  }

  async componentDidMount() {
    console.log(this.props.match.params.id)
    const response =  await axios.get(`/quiz/tests/${this.props.match.params.id}.json`)
    const quiz = [...response.data]
    quiz.shift()
    this.setState({quiz, isLoaded: true})
  }

  questionSwitchHandler(ms) {
    const timeout = window.setTimeout(() => {
      if (this.isQuizFinished()) {
        this.setState({
          isFinished: true
        })
      } else {
        this.setState({
          activeQuestion: this.state.activeQuestion + 1,
          answerState: null
        })
      }
      window.clearTimeout(timeout)
    }, ms)
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key]) {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      this.questionSwitchHandler(500)

    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })

      this.questionSwitchHandler(500)

    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  BackToList = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          {
            this.state.isFinished
             ? <Fragment>
                  <h1>Результаты</h1>
                  <FinishedQuiz
                      results={this.state.results}
                      quiz={this.state.quiz}
                      onRetry={this.retryHandler}
                      BackToList={this.BackToList}
                  />
                </Fragment>
             : this.state.isLoaded
                ? <Fragment>
                    <h1>Дайте ответы на все вопросы</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                  </Fragment>
                : <Loader />
          }
        </div>
      </div>
    )
  }
}


export default Quiz