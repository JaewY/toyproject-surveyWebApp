import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { StateContext } from "../../contextAPI/StateContext";
import { IQuestions } from "../SurveyContents/SurveyContents";
import "./SurveyCompletion.scss";

interface IResultList {
  [key: string]: string;
}
function SurveyCompletion() {
  const location = useLocation();

  const { questions } = location.state as {
    questions: IQuestions[];
  };

  const { surveys, result } = useContext(StateContext);

  const handleShowResultBtn = () => {
    const resultList: IResultList = {};

    for (let i = 1; i <= result.length - 1; i += 1) {
      const titleKey = questions[result[i].question].title;
      const answerArr: string[] = [];
      const showAnswer = result[i].answer;

      answerArr.push(...showAnswer);
      resultList[titleKey] = answerArr.join(",");
    }

    alert(JSON.stringify(resultList));
  };
  return (
    <section className="surveyCompletion">
      <div className="completionContents">
        <h2 className="completionTitle">{`${surveys.title} 관련 설문 완료`}</h2>
        <p className="completionDescription">
          수고하셨습니다.
          <br />
          아래 버튼을 눌러 답변을 확인해보세요!
        </p>
      </div>
      <div className="completionFooter">
        <button
          className="showResultBtn"
          type="button"
          onClick={handleShowResultBtn}
        >
          내 답변 보기
        </button>
      </div>
    </section>
  );
}

export default SurveyCompletion;
