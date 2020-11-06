import React from "react";
import classes from "./HomePage.css";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'

class HomePage extends React.Component {
 
  componentDidMount() {
    this.props.fetchQuizes()
  }

  listCreator = () =>
    this.props.quizes.map((item) => {
      return (
        <li key={item.id}>
          <NavLink to={`/quiz/${item.id}`}>{item.name}</NavLink>
        </li>
      );
    });

  render() {
    // console.log(this.props)
    return (
      <div className={classes.HomePage}>
        {this.props.isLoaded && this.props.quizes.length !== 0 ? (
          <div>
            <h1>Список тестов</h1>
            <ul>{this.listCreator()}</ul>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    isLoaded: state.quiz.isLoaded,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)