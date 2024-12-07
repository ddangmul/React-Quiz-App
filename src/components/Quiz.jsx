import { useState } from "react";

import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  // 사용자 응답을 배열에 저장
  const [userAnswers, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  // 모든 퀴즈 답변 완료 상황 (활성화된 질문 인덱스와 원본 질문 배열 길이가 일치)
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevAnswers) => {
      return [...prevAnswers, selectedAnswer]; // 추가된 답변 배열을 setUserAnswer가 반환(상태 업데이트)하도록 return 명시
    });
  }

  // [모든 퀴즈 답변 완료 시] 대체 내용 렌더링
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Complete!</h2>
      </div>
    );
  }

  // [답변 셔플]
  // 위치 주의: quizIsComplete 상황이 아닐 경우(if문 퀴즈 답변 완료 시 렌더링 구문 이후)에 작성해야 로직 작동
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5); // sort() : 새 배열 반환하지 않고 원본 배열을 수정

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
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
