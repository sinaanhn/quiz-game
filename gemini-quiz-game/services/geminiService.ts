
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

const NUM_QUESTIONS = 10;

const quizSchema = {
  type: Type.OBJECT,
  properties: {
    question: {
      type: Type.STRING,
      description: "The trivia question."
    },
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING
      },
      description: "An array of 4 multiple-choice answers."
    },
    correctAnswer: {
      type: Type.STRING,
      description: "The correct answer, which must be one of the strings from the 'options' array."
    }
  },
  required: ["question", "options", "correctAnswer"]
};

export async function fetchQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `Generate ${NUM_QUESTIONS} unique and interesting general knowledge quiz questions. For each question, provide 4 multiple-choice options. Ensure one of the options is the correct answer. The questions should cover a variety of topics like history, science, pop culture, and geography.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: quizSchema
        },
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText) as QuizQuestion[];

    // Validate data to ensure it's not empty and has correct structure
    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("API returned an empty or invalid list of questions.");
    }
    
    return questions;

  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    // In case of an API error, return a fallback question to allow the app to function
    return [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
      }
    ];
  }
}
