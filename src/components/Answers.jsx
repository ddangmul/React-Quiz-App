import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef(); // 컴포넌트 재실행 시 재생성되지 않도록 참조 사용
  // 참조값이 설정되지 않았을 경우 (최초 1회) 실행
  if (!shuffledAnswers.current) {
    // [답변 셔플]
    // 위치 주의: quizIsComplete 상황이 아닐 경우(if문 퀴즈 답변 완료 시 렌더링 구문 이후)에 작성해야 로직 작동
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // sort() : 새 배열 반환하지 않고 원본 배열을 수정
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
