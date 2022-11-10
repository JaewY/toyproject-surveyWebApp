import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import "./SurveyContents.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../../contextAPI/StateContext";
import ProgressBar from "./ProgressBar/ProgressBar";
import BackNextBtn from "../../components/BackNextBtn/BackNextBtn";
import AnswerBtns from "./AnswerBtns/AnswerBtns";

export interface IQuestions {
  title: string;
  mode: number;
  answers: number[];
}

export interface IProps {
  id: string;
  name: string;
  answers: string[];
  questions: IQuestions[];
  activeQuestion: number;
  btnActive: number;
  isDisabled: boolean;
  isSelected: boolean;
  surveyTitle: string;
  selectedAnswer: string[];
  isProgressBar: boolean[];
  totalShowPageNumbers: number[];
  defaultShowPageNumbers: number[];
}

export interface ISetStateAction {
  setActiveQuestion: Dispatch<SetStateAction<number>>;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
  setBtnActive: Dispatch<SetStateAction<number>>;
  setSelectedAnswer: Dispatch<SetStateAction<string[]>>;
  setIsProgressBar: Dispatch<SetStateAction<boolean[]>>;
  setDefaultShowPageNumbers: Dispatch<SetStateAction<number[]>>;
  setTotalShowPageNumbers: Dispatch<SetStateAction<number[]>>;
}

export type SUM = IProps & ISetStateAction;

function SurveyContents() {
  const {
    btnActive,
    activeQuestion,
    isSelected,
    surveys,
    selectedAnswer,
    isProgressBar,
    totalShowPageNumbers,
    defaultShowPageNumbers,
    setActiveQuestion,
    setBtnActive,
    setIsSelected,
    setSelectedAnswer,
    setIsProgressBar,
    setDefaultShowPageNumbers,
    setTotalShowPageNumbers,
  } = useContext(StateContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { id, name } = location.state as {
    id: string;
    name: string;
    title: string;
  };

  const qIndex: number[] = surveys.questions;

  const [isDisabled, setIsDisabled] = useState(true);
  const [answers, setAnswers] = useState<string[]>([""]);
  const [questions, setQuestions] = useState<IQuestions[]>([
    {
      title: "",
      mode: 0,
      answers: [0],
    },
  ]);

  const handleHomeBtn = () => {
    navigate(`/?id=${id}&name=${name}`, {
      state: { id, name },
    });
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/data/questions.json",
        );
        const { data } = res;
        setQuestions(qIndex.map((e) => data.questions[e]));
      } catch (err) {
        console.log("Error", err);
      }
    })();
  }, [location.pathname]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/data/answers.json");
        const { data } = res;
        const aIndex = questions.map((e) => e.answers);
        setAnswers(aIndex[activeQuestion].map((e) => data.answers[e]));
      } catch (err) {
        console.log("Error", err);
      }
    })();
  }, [questions, activeQuestion]);

  useEffect(() => {
    if (isSelected === true) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isSelected]);

  useEffect(() => {
    if (questions.length === 1) {
      const newArr = Array(3).fill(true);
      setIsProgressBar(newArr);
    } else {
      const newArr = Array(3).fill(false);
      setIsProgressBar(newArr);
    }

    const share = Math.floor(questions.length / 4);
    const remainder = questions.length % 4;
    const newArr = Array(4).fill(share);

    switch (remainder) {
      case 1:
        newArr[0] += 1;
        break;
      case 2:
        newArr[0] += 1;
        newArr[1] += 1;
        break;
      case 3:
        newArr[0] += 1;
        newArr[1] += 1;
        newArr[2] += 1;
        break;
      default:
        break;
    }

    setTotalShowPageNumbers(newArr);
    setDefaultShowPageNumbers(newArr);
  }, [questions]);

  return (
    <section className="surveyContents">
      <div className="contentsNav">
        <button
          onClick={handleHomeBtn}
          type="button"
          className="contentsNavHomeBtn"
        >
          Home
        </button>

        <ProgressBar isProgressBar={isProgressBar} />
        <h2 className="contentsNavTitle">{surveys.title}</h2>
      </div>
      <div className="contentsContent">
        <p className="activeStatus">
          <span className="activeNumber">{`${activeQuestion + 1}`}</span>
          {`/${surveys.questions.length}문항`}
        </p>
        <p className="question">{questions[activeQuestion]?.title}</p>
        <AnswerBtns mode={questions[activeQuestion].mode} answers={answers} />
      </div>
      <div className="contentsFooter">
        <BackNextBtn
          id={id}
          name={name}
          answers={answers}
          questions={questions}
          activeQuestion={activeQuestion}
          btnActive={btnActive}
          isDisabled={isDisabled}
          isSelected={isSelected}
          surveyTitle={surveys.title}
          selectedAnswer={selectedAnswer}
          isProgressBar={isProgressBar}
          totalShowPageNumbers={totalShowPageNumbers}
          defaultShowPageNumbers={defaultShowPageNumbers}
          setSelectedAnswer={setSelectedAnswer}
          setActiveQuestion={setActiveQuestion}
          setIsSelected={setIsSelected}
          setBtnActive={setBtnActive}
          setIsProgressBar={setIsProgressBar}
          setDefaultShowPageNumbers={setDefaultShowPageNumbers}
          setTotalShowPageNumbers={setTotalShowPageNumbers}
        />
      </div>
    </section>
  );
}

export default SurveyContents;
