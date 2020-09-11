import React from 'react'
import classes from './HomePage.css'
import {NavLink} from 'react-router-dom'
import axios from '../../Axios/Axios'
import Loader from '../../components/UI/Loader/Loader'

export default class HomePage extends React.Component {
  state = {
    quizes: [],
    isLoaded: false
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/quiz/tests.json')
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `${index + 1}. ${response.data[key][0]}`
        })
      })
      this.setState({quizes, isLoaded: true})
    } catch (e) {
      console.log(e)
    }
  }

  listCreator = () => this.state.quizes.map(item => {
    return (
      <li key={item.id}>
        <NavLink to={`/quiz/${item.id}`}>
          {item.name}
        </NavLink>
      </li>
    )
  })

  render() {
    return (
      <div className={classes.HomePage}>
        {
          this.state.isLoaded
            ? <div>
                <h1>Список тестов</h1>
                <ul>
                  {this.listCreator()}
                </ul>
              </div>
            : <Loader />
        }
        
        
      </div>
    )
  }
}