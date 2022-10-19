import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";

type StateContextProviderProps = {
  children: React.ReactNode;
};

export interface ISetStateAction {
  btnActive: number;
  activeQuestion: number;
  surveys: ISurveys;
  selectedAnswer: string[];
  result: IResult[];
  isSelected: boolean;
  isProgressBar: boolean[];
  totalShowPageNumbers: number[];
  defaultShowPageNumbers: number[];
  setActiveQuestion: Dispatch<SetStateAction<number>>;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
  setBtnActive: Dispatch<SetStateAction<number>>;
  setSurveys: Dispatch<SetStateAction<ISurveys>>;
  setSelectedAnswer: Dispatch<SetStateAction<string[]>>;
  setResult: Dispatch<SetStateAction<IResult[]>>;
  setIsProgressBar: Dispatch<SetStateAction<boolean[]>>;
  setTotalShowPageNumbers: Dispatch<SetStateAction<number[]>>;
  setDefaultShowPageNumbers: Dispatch<SetStateAction<number[]>>;
}

interface ISurveys {
  title: string;
  questions: number[];
}

interface IResult {
  question: number;
  answer: string[];
}

export const StateContext = createContext<ISetStateAction>({
  btnActive: 0,
  activeQuestion: 0,
  surveys: { title: "", questions: [0] },
  selectedAnswer: [""],
  result: [{ question: -1, answer: [""] }],
  isSelected: false,
  isProgressBar: [false],
  totalShowPageNumbers: [-1],
  defaultShowPageNumbers: [-1],
  setActiveQuestion: () => {
    return null;
  },
  setIsSelected: () => {
    return null;
  },
  setBtnActive: () => {
    return null;
  },
  setSurveys: () => {
    return null;
  },
  setSelectedAnswer: () => {
    return null;
  },
  setResult: () => {
    return null;
  },
  setIsProgressBar: () => {
    return null;
  },
  setTotalShowPageNumbers: () => {
    return null;
  },
  setDefaultShowPageNumbers: () => {
    return null;
  },
});

export function StateContextProvider({ children }: StateContextProviderProps) {
  const [btnActive, setBtnActive] = useState<number>(-1);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([""]);
  const [totalShowPageNumbers, setTotalShowPageNumbers] = useState<number[]>(
    [],
  );
  const [defaultShowPageNumbers, setDefaultShowPageNumbers] = useState<
    number[]
  >([]);
  const [surveys, setSurveys] = useState<ISurveys>({
    title: "",
    questions: [0],
  });
  const [result, setResult] = useState<IResult[]>([
    { question: -1, answer: [""] },
  ]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isProgressBar, setIsProgressBar] = useState<boolean[]>([]);

  const value: ISetStateAction = useMemo(
    () => ({
      btnActive,
      activeQuestion,
      surveys,
      selectedAnswer,
      result,
      isSelected,
      isProgressBar,
      totalShowPageNumbers,
      defaultShowPageNumbers,
      setActiveQuestion,
      setBtnActive,
      setIsSelected,
      setSurveys,
      setSelectedAnswer,
      setResult,
      setIsProgressBar,
      setTotalShowPageNumbers,
      setDefaultShowPageNumbers,
    }),
    [
      btnActive,
      activeQuestion,
      surveys,
      selectedAnswer,
      result,
      isSelected,
      isProgressBar,
      totalShowPageNumbers,
      defaultShowPageNumbers,
      setActiveQuestion,
      setBtnActive,
      setIsSelected,
      setSurveys,
      setSelectedAnswer,
      setResult,
      setIsProgressBar,
      setTotalShowPageNumbers,
      setDefaultShowPageNumbers,
    ],
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}
