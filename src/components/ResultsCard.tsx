import React from 'react';
import { TrophyIcon } from './Icon';

interface ResultsCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "";
  if (percentage === 100) {
    message = "Perfect Score! You're a genius!";
  } else if (percentage >= 75) {
    message = "Great Job! You really know your stuff.";
  } else if (percentage >= 50) {
    message = "Not bad! A solid effort.";
  } else {
    message = "Better luck next time! Keep learning.";
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md text-white border border-gray-700/50 text-center">
        <TrophyIcon className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-gray-300 text-lg mb-6">{message}</p>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <p className="text-xl text-blue-400">Your Score</p>
            <p className="text-6xl font-bold my-2">{percentage}%</p>
            <p className="text-gray-400">{score} out of {totalQuestions} correct</p>
        </div>

        <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
            Play Again
        </button>
    </div>
  );
};

export default ResultsCard;