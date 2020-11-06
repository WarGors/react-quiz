import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export function auth(email, password, isLogged) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWg-0aY_UaQ6QVkrQq-P4rpgBd804T1kg'

    if (isLogged) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWg-0aY_UaQ6QVkrQq-P4rpgBd804T1kg'
    }

    try {
      const response = await axios.post(url, authData);
    
      const data = response.data

      const experationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('experationDate', experationDate.getTime())

      dispatch(authSuccess(data.idToken))

      dispatch(autoLogout(data.expiresIn))
    } catch(e) {
      if (e.message === 'Request failed with status code 400') {
        alert('Неправильный логин или пароль')
      }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export function autoLogout(experationDate) {
  return dispatch => {
    setTimeout( () => {
      dispatch(logOut())
    }, experationDate * 1000)
  }
}

export function logOut() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('experationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logOut())
    } else {
      const experationDate = new Date(+localStorage.getItem('experationDate'))
      
      if(new Date() >= experationDate) {
        dispatch(logOut())
      } else {
        dispatch(authSuccess(token))

        dispatch(autoLogout((experationDate.getTime() - new Date().getTime()) / 1000))
      }
    }


  }
}