"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questionDummy } from "./data/qusitonDummy";
import { getResultFeedback } from "./data/resultFeedback";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{ text: string; score: number }>
  >([]);
  const [selectedAnswer, setSelectedAnswer] = useState<{
    text: string;
    score: number;
  } | null>(null);

  const questions = questionDummy;

  // 각 질문에 대한 선택지 생성
  const generateOptions = () => {
    return [
      {
        text: "그렇다",
        score: 3,
      },
      {
        text: "보통이다",
        score: 2,
      },
      {
        text: "아니다",
        score: 1,
      },
    ];
  };

  const handleAnswer = (answer: { text: string; score: number }) => {
    setSelectedAnswer(answer);
    // 즉시 다음 질문으로 넘어가기
    setAnswers([...answers, answer]);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  // 질문이 바뀔 때 selectedAnswer 초기화
  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  // 총점 계산
  const calculateTotalScore = () => {
    return answers.reduce((total, answer) => total + answer.score, 0);
  };

  // 결과 피드백 가져오기
  const getResult = () => {
    const totalScore = calculateTotalScore();
    return getResultFeedback(totalScore);
  };

  // 진행률 계산
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // 애니메이션 variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const questionVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
    selected: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen h-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            "linear-gradient(45deg, #4ecdc4, #45b7d1)",
            "linear-gradient(45deg, #45b7d1, #96c93d)",
            "linear-gradient(45deg, #96c93d, #ff6b6b)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
          }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20"
        >
          {/* 진행률 게이지 - 질문 진행 중에만 표시 */}
          {currentQuestion < questions.length && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  진행률
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {currentQuestion < questions.length ? (
              <motion.div
                key={currentQuestion}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <motion.h2
                  variants={questionVariants}
                  className="text-2xl font-bold text-center text-gray-800 leading-tight"
                >
                  {questions[currentQuestion].question}
                </motion.h2>

                <motion.div variants={containerVariants} className="space-y-4">
                  {generateOptions().map((option, index) => (
                    <AnimatePresence key={index}>
                      {(!selectedAnswer ||
                        selectedAnswer.text === option.text) && (
                        <motion.button
                          variants={optionVariants}
                          initial="hidden"
                          animate={
                            selectedAnswer?.text === option.text
                              ? "selected"
                              : "visible"
                          }
                          exit="exit"
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option)}
                          className={`w-full p-4 rounded-xl transition-all transform ${
                            selectedAnswer?.text === option.text
                              ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md"
                          }`}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {option.text}
                          </motion.span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 15,
                }}
                className="text-center space-y-6"
              >
                {(() => {
                  const result = getResult();
                  const totalScore = calculateTotalScore();
                  const maxScore = 21;
                  const percentage = Math.round((totalScore / maxScore) * 100);

                  return (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                      >
                        <h2 className="text-3xl font-bold text-gray-800">
                          {result.title}
                        </h2>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.4,
                            type: "spring" as const,
                            stiffness: 200,
                          }}
                          className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl"
                        >
                          🎯
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="space-y-2"
                        >
                          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {totalScore} / {maxScore}
                          </div>
                          <div className="text-lg text-gray-600">
                            {percentage}점
                          </div>
                          <div className="text-sm text-gray-500">
                            레벨: {result.level}
                          </div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-4"
                      >
                        <div
                          className={`p-6 rounded-2xl bg-gradient-to-r ${result.color} text-white shadow-lg`}
                        >
                          <p className="text-lg leading-relaxed">
                            {result.description}
                          </p>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200">
                          <h3 className="font-semibold text-gray-800 mb-2">
                            💡 조언
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {result.advice}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold text-gray-800">
                          📝 선택한 답변들
                        </h3>
                        <motion.ul
                          className="space-y-3"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {answers.map((answer, index) => (
                            <motion.li
                              key={index}
                              variants={optionVariants}
                              className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <span className="font-medium text-gray-700">
                                    {questions[index].question}:
                                  </span>{" "}
                                  <span className="text-gray-600">
                                    {answer.text}
                                  </span>
                                </div>
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                  {answer.score}점
                                </span>
                              </div>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
