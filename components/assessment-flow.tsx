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
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredCount = QUESTIONS.length - Object.keys(answers).length;

    if (unansweredCount > 0) {
      alert(`請回答所有 ${unansweredCount} 個未回答的問題後再提交`);
      return;
    }

    setIsLoading(true);

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = calculateScores(answers);
    onComplete(result);
    setIsLoading(false);
  };

  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const canProceed = selectedAnswer !== null;
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <QuestionCard
          question={currentQuestion.text}
          currentIndex={currentIndex}
          totalQuestions={QUESTIONS.length}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="sm:flex-1"
          >
            上一題
          </Button>

          {!isLastQuestion && (
            <>
              <Button
                onClick={handleSkip}
                variant="ghost"
                className="sm:flex-1"
              >
                跳過
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="sm:flex-1 bg-primary hover:bg-primary/90"
              >
                下一題
              </Button>
            </>
          )}

          {isLastQuestion && (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || isLoading}
              className="sm:flex-1 bg-primary hover:bg-primary/90"
            >
              {isLoading ? '正在分析...' : '完成並查看結果'}
            </Button>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          已回答 {Object.keys(answers).length} / {QUESTIONS.length} 個問題
        </div>
      </div>
    </div>
  );
}
