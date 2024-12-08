import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // 다수의 setTime함수 생성되지 않도록 useEffect 사용
  useEffect(() => {
    console.log("setting timeout");
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]); // 내부에서 사용 중인 속성들 중 컴포넌트 재실행에 영향을 주는 것들 추가

  // interval 재실행되지 않도록 UseEffect 사용
  useEffect(() => {
    console.log("setting interval");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []); // 내부에서 사용 중인 상태 또는 속성이 없으므로 의존성 없음

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
