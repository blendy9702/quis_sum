"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "당신은 어떤 성격을 가지고 있나요?",
      options: ["내향적", "외향적"],
    },
    {
      question: "주말에 무엇을 하시나요?",
      options: ["집에서 휴식", "외부 활동"],
    },
  ];

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className='min-h-screen h-full relative overflow-hidden'>
      <motion.div
        className='absolute inset-0'
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
        className='absolute inset-0'
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
      <div className='relative min-h-screen flex items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md w-full'
        >
          <AnimatePresence mode='wait'>
            {currentQuestion < questions.length ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className='text-2xl font-bold mb-6 text-center'>
                  {questions[currentQuestion].question}
                </h2>
                <div className='space-y-4'>
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className='w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all'
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className='text-center'
              >
                <h2 className='text-2xl font-bold mb-4'>결과</h2>
                <p>선택한 답변들:</p>
                <ul className='mt-4'>
                  {answers.map((answer, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className='mb-2'
                    >
                      {questions[index].question}: {answer}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
