export interface Question {
  id: number;
  question: string;
  options: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "당신의 이상적인 주말은?",
    options: ["친구들과 함께하는 활발한 활동", "혼자만의 시간을 즐기는 휴식"],
  },
  {
    id: 2,
    question: "스트레스 해소 방법은?",
    options: ["운동이나 활동적인 취미", "독서나 음악 감상"],
  },
  {
    id: 3,
    question: "새로운 환경에서 당신은?",
    options: ["적극적으로 사람들과 어울림", "관찰하며 천천히 적응"],
  },
  {
    id: 4,
    question: "의사결정을 할 때 당신은?",
    options: ["직관적으로 빠르게 결정", "신중하게 분석 후 결정"],
  },
  {
    id: 5,
    question: "여행을 갈 때 당신은?",
    options: ["즉흥적인 모험을 즐김", "철저한 계획을 세움"],
  },
];
