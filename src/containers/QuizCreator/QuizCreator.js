import React from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'

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

export default class QuizCreator extends React.Component {
  state = {
    quiz: [],
    rightAnserId: 1,
    isFormValid: false,
    formControls: createFormControls()
  }

  submitHandler(event) {
    event.preventDefault()
  }

  addQuestionHandler = (event) => {
    event.preventDefault()
    
    const quiz = [...this.state.quiz];
    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: this.state.quiz.length + 1,
      rightAnserId: this.state.rightAnserId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      rightAnserId: 1,
      isFormValid: false,
      formControls: createFormControls()
    })
  }

  createQuizHandler = (event) => {
    event.preventDefault()

    console.log(this.state.quiz)
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
    const rightAnserId = +event.target.value
    this.setState({rightAnserId})
  }
  
  render() {
    const select = (
      <Select 
        label={'Выберите номер правильного варианта ответа'}
        onChange={this.selectChangeHandler}
        value={this.state.rightAnserId}
        options={[
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4},
        ]}
      />
    )

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={(event) => this.submitHandler(event)}>
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
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}