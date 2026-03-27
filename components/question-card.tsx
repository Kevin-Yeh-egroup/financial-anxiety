'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface QuestionCardProps {
  question: string;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerSelect: (value: number) => void;
}

const ANSWER_SCALES = [
  { value: 1, label: '非常不同意' },
  { value: 2, label: '不同意' },
  { value: 3, label: '普通' },
  { value: 4, label: '同意' },
  { value: 5, label: '非常同意' },
];

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            第 {currentIndex + 1} 題，共 {totalQuestions} 題
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-card border border-border rounded-2xl shadow-sm">
        <CardContent className="pt-8 pb-8 px-6 md:px-8">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 leading-relaxed text-pretty break-keep">
            {question}
          </h3>

          <div className="space-y-3">
            {ANSWER_SCALES.map((scale) => (
              <button
                key={scale.value}
                onClick={() => onAnswerSelect(scale.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedAnswer === scale.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === scale.value
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    }`}
                  >
                    {selectedAnswer === scale.value && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </div>
                  <div className="font-medium text-foreground">
                    {scale.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
