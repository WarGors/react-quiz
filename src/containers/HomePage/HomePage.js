import React from 'react'
import classes from './HomePage.css'
import {NavLink} from 'react-router-dom'

export default class HomePage extends React.Component {
  listCreator = () => [1,2,3].map((id, index) => {
    return (
      <li key={index}>
        <NavLink to={`/quiz/${id}`}>
          {`Тест ${id}`}
        </NavLink>
      </li>
    )
  })

  render() {
    return (
      <div className={classes.HomePage}>
        <div>
          <h1>Список тестов</h1>
          <ul>
            {this.listCreator()}
          </ul>
        </div>
        
      </div>
    )
  }
}