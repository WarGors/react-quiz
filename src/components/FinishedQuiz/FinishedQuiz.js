import React from "react";
import classes from "./FinishedQuiz.css";
import Button from "../UI/Button/Button";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }

    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          return (
            <li className={classes[props.results[quizItem.id]]} key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
            </li>
          );
        })}
      </ul>

      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Button onClick={props.BackToList} type="success">
          Вернуться к списку тестов
        </Button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
