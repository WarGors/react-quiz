import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'

class App extends Component {
  render() {
    console.log('DIMAN!')
    return (
      <Layout>
        <Quiz />
      </Layout>
    )
  }
}

export default App
