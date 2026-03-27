'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import QuestionCard from './question-card';
import { QUESTIONS } from '@/lib/assessment-data';
import { calculateScores } from '@/lib/assessment-utils';

interface AssessmentFlowProps {
  onComplete: (result: any) => void;
}

export default function AssessmentFlow({ onComplete }: AssessmentFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;

  const handleAnswerSelect = (value: number) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      const allAnswered = Object.keys(newAnswers).length === QUESTIONS.length;
      if (allAnswered) {
        setTimeout(() => handleSubmitWithAnswers(newAnswers), 200);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitWithAnswers = async (finalAnswers: Record<number, number>) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = calculateScores(finalAnswers);
    onComplete(result);
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-muted-foreground text-sm max-w-xl mx-auto mb-8 leading-relaxed text-pretty break-keep">
          請依你面對財務壓力時的真實感受作答；每題沒有標準答案，選最接近現況的就好。
        </p>
        <QuestionCard
          question={currentQuestion.text}
          currentIndex={currentIndex}
          totalQuestions={QUESTIONS.length}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="mt-12 flex justify-start">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
          >
            上一題
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          已回答 {Object.keys(answers).length} / {QUESTIONS.length} 題
        </div>
      </div>
    </div>
  );
}
