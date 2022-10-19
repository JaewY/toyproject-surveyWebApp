import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../../contextAPI/StateContext";
import "./SurveyStart.scss";

interface IUserInfo {
  name: string;
  id: number | string;
}

function SurveyStart() {
  const navigate = useNavigate();

  const { surveys, setSurveys } = useContext(StateContext);

  const [isInputSubmitted, setIsInputSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({ name: "", id: 0 });
  const { name, id } = userInfo;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      id: "",
    });
  }, []);

  const handleInputBtn = () => {
    setIsInputSubmitted(true);
  };

  const handleStartBtn = () => {
    navigate(`/contents`, {
      state: { id, name },
    });
  };

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get("http://localhost:3000/data/surveys.json");
        const { data } = res;
        setSurveys(data.surveys[`${id}`]);
      })();
    } catch (err) {
      console.log("Error", err);
    }
  }, [id]);

  return (
    <section className="surveyStart">
      <h2 className="startNav">의류 소비패턴 설문조사</h2>
      <div className="startContents">
        {!isInputSubmitted ? (
          <>
            <p className="startDescription">
              성함과 설문 id를 입력 후 버튼을 눌러주세요.
            </p>
            <form className="userInput" autoComplete="off">
              <input
                className="inputName"
                placeholder="성함"
                maxLength={15}
                onChange={handleInputChange}
                value={name}
                name="name"
              />
              <input
                className="inputId"
                placeholder="Id"
                maxLength={2}
                onChange={handleInputChange}
                value={id}
                name="id"
              />
              <button
                className="inputBtn &:disabled"
                type="button"
                onClick={handleInputBtn}
                disabled={userInfo.id === "" || userInfo.name === ""}
              >
                입력
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="startDescription">
              {`안녕하세요 ${name}님 :)`}
              <br />
              나의 의류 소비패턴을 찾아서 떠날 준비가 되셨다면
              <br />
              시작 버튼을 눌러주세요!
            </p>
            <p className="totalQuestions">
              총
              <span className="totalNumber">{` ${surveys?.questions.length}문항`}</span>
            </p>
            <button
              className="surveyStartBtn"
              onClick={handleStartBtn}
              type="button"
            >
              시작
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default SurveyStart;
