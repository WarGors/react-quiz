import React, {Component, Fragment} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import questionList from "../../questions/questions";

class Quiz extends Component {
  state = {
    results: {}, // {[id]: success error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' 'error' }
    quiz: questionList,
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
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
      }, 500)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
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
             : <Fragment>
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
          }
        </div>
      </div>
    )
  }
}


export default Quiz