import { useState } from "react";

export default function Quiz() {
  // 질문 배열의 인덱스를 관리
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  // 사용자 응답을 배열에 저장
  const [useAnswers, setUserAnswer] = useState([]);

  return <p>Currently active Question</p>;
}
``