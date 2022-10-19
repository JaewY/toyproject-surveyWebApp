import React, { useContext } from "react";
import "./BackNextBtn.scss";
import { useNavigate } from "react-router-dom";
import type { SUM } from "pages/SurveyContents/SurveyContents";
import { StateContext } from "../../contextAPI/StateContext";

function BackNextBtn({
  id,
  name,
  answers,
  questions,
  btnActive,
  isDisabled,
  isSelected,
  setActiveQuestion,
  setIsSelected,
  setBtnActive,
  surveyTitle,
}: SUM) {
  const navigate = useNavigate();
  const {
    activeQuestion,
    selectedAnswer,
    isProgressBar,
    totalShowPageNumbers,
    defaultShowPageNumbers,
    setSelectedAnswer,
    setResult,
    setIsProgressBar,
    setTotalShowPageNumbers,
  } = useContext(StateContext);

  const goToBack = () => {
    setActiveQuestion((prev) => prev - 1);
    setIsSelected(false);
    setBtnActive((prev) => prev - 1);
    setSelectedAnswer([]);

    const newArr = [...isProgressBar];
    if (questions.length === 2 && activeQuestion + 1 === 2) {
      newArr.fill(false);
    } else if (questions.length === 3) {
      if (activeQuestion + 1 === 2) {
        newArr[0] = false;
        newArr[1] = false;
      } else {
        newArr[2] = false;
      }
    } else if (questions.length >= 4) {
      const newArr2 = [...totalShowPageNumbers];

      const [firstPage, SecondPage, thirdPage, fourthPage] = [
        ...defaultShowPageNumbers,
      ];

      if (newArr2[3] !== fourthPage) {
        newArr2[3] += 1;
        if (newArr2[3] === fourthPage) newArr[2] = false;
      } else if (newArr2[2] !== thirdPage) {
        newArr2[2] += 1;
        if (newArr2[2] === thirdPage) newArr[1] = false;
      } else if (newArr2[1] !== SecondPage) {
        newArr2[1] += 1;
        if (newArr2[1] === SecondPage) newArr[0] = false;
      } else if (newArr2[0] !== firstPage) {
        newArr2[0] += 1;
      }
      setTotalShowPageNumbers(newArr2);
    }
    setIsProgressBar(newArr);

    if (activeQuestion === 0) {
      navigate(`/`, {
        state: { id, name },
      });
      window.location.reload();
    }
  };

  const goToNext = () => {
    setActiveQuestion((prev) => prev + 1);
    setIsSelected((prev) => !prev);
    setBtnActive(-1);
    setSelectedAnswer([]);
    setResult((prev) => [
      ...prev,
      { question: activeQuestion, answer: selectedAnswer },
    ]);

    const newArr = [...isProgressBar];

    if (questions.length === 2 && activeQuestion + 2 === 2) {
      newArr.fill(true);
    } else if (questions.length === 3) {
      if (activeQuestion + 2 === 2) {
        newArr[0] = true;
        newArr[1] = true;
      } else {
        newArr.fill(true);
      }
    } else if (questions.length >= 4) {
      const newArr2 = [...totalShowPageNumbers];

      if (newArr2[0] > 1) {
        newArr2[0] -= 1;
      } else if (newArr2[1] !== 0) {
        newArr2[1] -= 1;
        newArr[0] = true;
      } else if (newArr2[2] !== 0) {
        newArr2[2] -= 1;
        newArr[1] = true;
      } else if (newArr2[3] !== 0) {
        newArr2[3] -= 1;
        newArr[2] = true;
      }

      setTotalShowPageNumbers(newArr2);
    }
    setIsProgressBar(newArr);

    if (activeQuestion === questions.length - 1) {
      setIsSelected((prev) => !prev);
      navigate(`/completion`, {
        state: {
          id,
          name,
          answers,
          questions,
          activeQuestion,
          btnActive,
          isDisabled,
          isSelected,
          surveyTitle,
        },
      });
    }
  };

  return (
    <div className="backNextBtn">
      <button onClick={goToBack} type="button" className="backBtn">
        이전
      </button>
      <button
        onClick={goToNext}
        type="button"
        className={isDisabled ? "nextBtn active" : "nextBtn"}
        disabled={isDisabled}
      >
        다음
      </button>
    </div>
  );
}

export default BackNextBtn;
