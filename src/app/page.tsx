"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questionDummy } from "./data/qusitonDummy";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{ text: string; quote: string }>
  >([]);
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<{
    text: string;
    quote: string;
  } | null>(null);

  const questions = questionDummy;

  const handleAnswer = (answer: { text: string; quote: string }) => {
    setSelectedAnswer(answer);
    setSelectedQuote(answer.quote);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers([...answers, selectedAnswer]);
      setSelectedQuote(null);
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

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
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className='bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20'
        >
          <AnimatePresence mode='wait'>
            {currentQuestion < questions.length ? (
              <motion.div
                key={currentQuestion}
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                className='space-y-6'
              >
                <motion.h2
                  variants={questionVariants}
                  className='text-2xl font-bold text-center text-gray-800 leading-tight'
                >
                  {questions[currentQuestion].question}
                </motion.h2>

                <motion.div variants={containerVariants} className='space-y-4'>
                  {questions[currentQuestion].options.map((option, index) => (
                    <AnimatePresence key={index}>
                      {(!selectedAnswer ||
                        selectedAnswer.text === option.text) && (
                        <motion.button
                          variants={optionVariants}
                          initial='hidden'
                          animate={
                            selectedAnswer?.text === option.text
                              ? "selected"
                              : "visible"
                          }
                          exit='exit'
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

                <AnimatePresence>
                  {selectedQuote && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 200,
                          damping: 25,
                        }}
                        className='bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20'
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className='text-center space-y-6'
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.3,
                              type: "spring" as const,
                              stiffness: 200,
                            }}
                            className='w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto'
                          >
                            <span className='text-2xl'>💬</span>
                          </motion.div>

                          <motion.p
                            className='text-gray-800 italic text-xl leading-relaxed'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            &ldquo;{selectedQuote}&rdquo;
                          </motion.p>

                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            className='px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg'
                          >
                            다음 질문
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className='text-center space-y-6'
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='text-3xl font-bold text-gray-800'
                >
                  결과
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className='text-gray-600'
                >
                  선택한 답변들:
                </motion.p>
                <motion.ul
                  className='space-y-3'
                  variants={containerVariants}
                  initial='hidden'
                  animate='visible'
                >
                  {answers.map((answer, index) => (
                    <motion.li
                      key={index}
                      variants={optionVariants}
                      className='p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200'
                    >
                      <span className='font-medium text-gray-700'>
                        {questions[index].question}:
                      </span>{" "}
                      <span className='text-gray-600'>{answer.text}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
