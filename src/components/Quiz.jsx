import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  // 사용자 응답을 배열에 저장
  const [userAnswers, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  // 모든 퀴즈 답변 완료 상황 (활성화된 질문 인덱스와 원본 질문 배열 길이가 일치)
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // useCallback 사용
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswer((prevAnswers) => {
      return [...prevAnswers, selectedAnswer]; // 추가된 답변 배열을 setUserAnswer가 반환(상태 업데이트)하도록 return 명시
    });
  },
  []);

  // useCallback 사용
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // [모든 퀴즈 답변 완료 시] 대체 내용 렌더링
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Complete!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex} // 우리들만의 속성
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
