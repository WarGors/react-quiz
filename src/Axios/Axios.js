import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-b11d1.firebaseio.com/'
})