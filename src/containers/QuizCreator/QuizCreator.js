import React, {Fragment} from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'

function createOptionControls(num) {
  return createControl({
    label: `Вариант ответа ${num}`,
    errorMessage: 'Значение не может быть пустым',
    type: 'text',
    id: num
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым',
      type: 'text'
    }, {required: true}),
    option1: createOptionControls(1),
    option2: createOptionControls(2),
    option3: createOptionControls(3),
    option4: createOptionControls(4),
  }
}

class QuizCreator extends React.Component {
  state = {
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls(),
    quizNameControl: createControl({
      label: 'Введите название теста',
      errorMessage: 'Название не может быть пустым',
      type: 'text'
    }, {required: true})
  }

  submitHandler(event) {
    event.preventDefault()
  }

  addQuestionHandler = (event) => {
    event.preventDefault()
    
    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    this.props.createQuizQuestion(questionItem)

    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls()
    })
  }

  createQuizHandler = event => {
    event.preventDefault()

    const quizName = this.state.quizNameControl.value
    const quiz = [ quizName, ...this.props.quiz ]

    this.props.finishCreateQuiz(quiz)

    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls(),
      quizNameControl: createControl({
        label: 'Введите название теста',
        errorMessage: 'Название не может быть пустым',
        type: 'text'
      }, {required: true})
    }) 
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control
    // const isFormValid = validateForm(formControls)
    
    this.setState({
      formControls, 
      isFormValid: validateForm(formControls)
    })
  }

  changeNameHandler = value => {
    const quizNameControl = { ...this.state.quizNameControl }

    quizNameControl.touched = true
    quizNameControl.value = value
    quizNameControl.valid = validate(quizNameControl.value, quizNameControl.validation)

    this.setState({
      quizNameControl
    })
  }

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <React.Fragment key={controlName + index}>
          <Input 
            value={control.value}
            type={control.type}
            label={control.label}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {
            controlName === 'question' ? <hr/> : null
          }
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = (event) => {
    const rightAnswerId = +event.target.value
    this.setState({rightAnswerId})
  }
  
  render() {
    const select = (
      <Select 
        label={'Выберите номер правильного варианта ответа'}
        onChange={this.selectChangeHandler}
        value={this.state.rightAnswerId}
        options={[
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4},
        ]}
      />
    )
    const control = this.state.quizNameControl
    const quizName = (
      <Fragment>
        <Input 
          value={control.value}
          type={control.type}
          label={control.label}
          errorMessage={control.errorMessage}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          onChange={event => this.changeNameHandler(event.target.value)}
        />
        <hr />
        <hr />
      </Fragment>
    )
    const allowPostTest = this.props.quiz.length !== 0 && this.state.quizNameControl.valid

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={(event) => this.submitHandler(event)}>
            { quizName }
            { this.renderControls() }
            { select }

            <Button 
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            
            <Button 
              onClick={this.createQuizHandler}
              disabled={!allowPostTest}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispachToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: quiz => dispatch(finishCreateQuiz(quiz))
  }
}

export default connect(mapStateToProps, mapDispachToProps)(QuizCreator)