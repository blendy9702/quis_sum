// AI 이해도 퀴즈 결과 피드백
export const getResultFeedback = (totalScore: number) => {
  const maxScore = 21; // 7문제 × 3점
  const percentage = (totalScore / maxScore) * 100;

  if (percentage >= 80) {
    return {
      title: "🚀 AI 마스터",
      description:
        "당신은 AI에 대해 매우 깊이 이해하고 있습니다. AI의 현재와 미래를 명확히 파악하고 있으며, AI 시대에 적극적으로 대응할 준비가 되어 있습니다.",
      advice:
        "이미 훌륭한 AI 이해도를 가지고 있으니, 이제 다른 사람들에게 AI 지식을 공유하고 함께 성장하는 리더십을 발휘해보세요.",
      color: "from-green-400 to-green-600",
      level: "전문가",
    };
  } else if (percentage >= 60) {
    return {
      title: "💡 AI 탐험가",
      description:
        "당신은 AI에 대해 꽤 잘 알고 있으며, 지속적으로 학습하려는 의지를 가지고 있습니다. 몇 가지 영역에서 더 깊은 이해가 필요합니다.",
      advice:
        "AI의 원리와 구조에 대해 더 깊이 파고들어보세요. 실습을 통해 이론을 실제로 적용해보는 것도 좋은 방법입니다.",
      color: "from-blue-400 to-blue-600",
      level: "중급자",
    };
  } else if (percentage >= 40) {
    return {
      title: "🌱 AI 학습자",
      description:
        "당신은 AI에 대한 기본적인 이해를 가지고 있지만, 더 체계적인 학습이 필요한 단계입니다. AI 시대에 대한 준비를 시작할 좋은 시기입니다.",
      advice:
        "AI 관련 온라인 강의나 워크샵에 참여해보세요. 실습 위주의 학습이 도움이 될 것입니다.",
      color: "from-yellow-400 to-orange-500",
      level: "초급자",
    };
  } else {
    return {
      title: "🌟 AI 입문자",
      description:
        "당신은 AI에 대한 탐구를 시작하는 단계에 있습니다. 이것은 결코 부족함이 아니라, 무한한 가능성을 의미합니다.",
      advice:
        "AI에 대한 두려움을 버리고 호기심을 가지고 접근해보세요. 작은 것부터 시작해서 점진적으로 AI를 이해해나가보세요.",
      color: "from-purple-400 to-pink-500",
      level: "입문자",
    };
  }
};

// 각 질문별 점수 매핑 (기존 선택지에 맞춰)
export const getScoreForAnswer = (
  questionId: number,
  answerText: string
): number => {
  // 각 질문별로 "그렇다"는 3점, "보통이다"는 2점, "아니다"는 1점
  if (answerText.includes("그렇다")) return 3;
  if (answerText.includes("보통이다")) return 2;
  if (answerText.includes("아니다")) return 1;

  // 기본값
  return 1;
};
