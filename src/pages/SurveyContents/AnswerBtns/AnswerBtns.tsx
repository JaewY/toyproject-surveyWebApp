import React, { useContext } from "react";
import "./AnswerBtns.scss";
import { StateContext } from "../../../contextAPI/StateContext";

interface IAnswerBtnProps {
  answers: string[];
  mode: number;
}

function AnswerBtns({ answers, mode }: IAnswerBtnProps) {
  const {
    btnActive,
    isSelected,
    selectedAnswer,
    setBtnActive,
    setIsSelected,
    setSelectedAnswer,
  } = useContext(StateContext);

  const handleSingularAnswer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const currentTargetValue = Number(e.currentTarget.value);

    if (isSelected === false) {
      setBtnActive(currentTargetValue);
      setIsSelected((prev) => !prev);
      setSelectedAnswer([answers[currentTargetValue]]);
    } else if (isSelected === true && currentTargetValue === btnActive) {
      setBtnActive(10);
      setIsSelected((prev) => !prev);
      setSelectedAnswer([]);
    } else if (isSelected === true && currentTargetValue !== btnActive) {
      setBtnActive(currentTargetValue);
      setSelectedAnswer([answers[currentTargetValue]]);
    }
  };

  const handlePluralAnswer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const currentTargetValue = Number(e.currentTarget.value);

    if (isSelected === false) {
      setBtnActive(currentTargetValue);
      setSelectedAnswer([answers[currentTargetValue]]);
      setIsSelected((prev) => !prev);
    } else if (
      isSelected === true &&
      selectedAnswer.includes(answers[currentTargetValue])
    ) {
      setBtnActive(-1);
      setIsSelected((prev) => !prev);
      setSelectedAnswer([]);
    } else if (isSelected === true && currentTargetValue !== btnActive) {
      setSelectedAnswer((prev) => [...prev, answers[currentTargetValue]]);
    }
  };

  return (
    <div className="answers">
      {answers.map((answer, index) => {
        return (
          <button
            onClick={mode === 1 ? handlePluralAnswer : handleSingularAnswer}
            key={answers[index]}
            type="button"
            value={index}
            className={
              index === btnActive ||
              (mode === 1 && selectedAnswer.includes(answers[index]))
                ? "activeAnswer"
                : "answer"
            }
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
}

export default AnswerBtns;
