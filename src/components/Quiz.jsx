import { useState } from "react";

import QUESTIONS from "../questions.js";

export default function Quiz() {
  // 사용자 응답을 배열에 저장
  const [useAnswers, setUserAnswer] = useState([]);
  const activeQuestionIndex = useAnswers.length;

  return <p>Currently active Question</p>;
}
``;
