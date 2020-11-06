import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Redirect, Route, Switch} from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout'
import {autoLogin} from './store/actions/auth'

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }
  render() {
    
    let routes = (
      <Switch>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={HomePage}/>
        <Redirect to={'/'}/>
      </Switch>
    )

    if (this.props.isAuthed) {
      routes = (
        <Switch>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={HomePage}/>
          <Redirect to={'/'}/>
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    isAuthed: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
