import React, {Component} from 'react'
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

class Drawer extends Component {

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.path}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >{link.name}
          </NavLink>
        </li>
      )
    })
  }

  render() {

    const links = [
      {path: '/', name: 'Список тестов', exact: true}
    ]

    if (this.props.isAuthed) {
      links.push({path: '/quiz-creator', name: 'Консруктор', exact: false})
      links.push({path: '/logout', name: 'Выйти', exact: false})
    } else {
      links.push({path: '/auth', name: 'Авторизация', exact: false})
    }

    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}

export default Drawer