import React from 'react';
import { QuizQuestion } from '../types';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  isAnswered: boolean;
  selectedAnswer: string | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  isAnswered,
  selectedAnswer,
}) => {

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return "bg-gray-800 hover:bg-blue-700 focus:bg-blue-600";
    }
    if (option === question.correctAnswer) {
      return "bg-green-600 animate-pulse";
    }
    if (option === selectedAnswer) {
      return "bg-red-600";
    }
    return "bg-gray-700 cursor-not-allowed opacity-70";
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-white border border-gray-700/50 transform transition-all duration-500">
      <div className="mb-6">
        <p className="text-blue-400 font-bold text-lg">
          Question {questionNumber} / {totalQuestions}
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2 leading-tight" dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg text-left text-lg font-medium transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="text-center">
            <button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;