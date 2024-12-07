import { useState } from "react";

import QUESTIONS from "../questions.js";

export default function Quiz() {
  // 사용자 응답을 배열에 저장
  const [userAnswers, setUserAnswer] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevAnswers) => {
      return [...prevAnswers, selectedAnswer]; // 추가된 답변 배열을 setUserAnswer가 반환(상태 업데이트)하도록 return 명시
    });
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
