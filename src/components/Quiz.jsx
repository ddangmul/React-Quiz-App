import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  // 사용자 응답을 배열에 저장
  const [userAnswers, setUserAnswer] = useState([]);

  // 정답 여부 표시 전에 다음 질문으로 넘어가지 않게 하기 위함
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1; // answerState 업데이트 후 빈 문자열로 초기화 필요

  // 모든 퀴즈 답변 완료 상황 (활성화된 질문 인덱스와 원본 질문 배열 길이가 일치)
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // useCallback 사용
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswer((prevAnswers) => {
        return [...prevAnswers, selectedAnswer]; // 추가된 답변 배열을 setUserAnswer가 반환(상태 업데이트)하도록 return 명시
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex] // activeQuestionIndex가 변경될 때마다 재생성
  );

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
        question={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
