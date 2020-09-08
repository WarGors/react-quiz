import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/' component={HomePage}/>
        </Switch>
      </Layout>
    )
  }
}

export default App
