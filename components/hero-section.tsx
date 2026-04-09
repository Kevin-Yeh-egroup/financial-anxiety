'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { QUESTIONS } from '@/lib/assessment-data';

interface HeroSectionProps {
  onStartTest: () => void;
}

export default function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative w-full bg-gradient-to-b from-background to-muted/20 pt-12 pb-16 md:pt-16 md:pb-20 px-4 sm:px-6 md:px-8 scroll-mt-0"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-5 inline-block">
          <span className="text-sm font-medium px-4 py-2 bg-accent/10 text-accent rounded-full">
            ✨ 免費｜簡單小檢測
          </span>
        </div>

        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight text-balance tracking-tight"
        >
          財務壓力來臨時，你可能較容易陷入哪種焦慮？
        </h1>

        <div className="text-base sm:text-lg text-muted-foreground mb-8 max-w-prose mx-auto leading-[1.6] text-pretty break-keep space-y-3">
          <p>
            用幾題簡單敘述，整理錢的壓力一來時，你可能較常出現哪一種反應。
          </p>
          <p>約五分鐘完成，結果僅供自我整理參考。</p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Button
            type="button"
            onClick={onStartTest}
            className="w-full sm:w-auto min-h-12 h-12 px-8 sm:px-10 text-base sm:text-lg font-semibold rounded-xl shadow-sm"
          >
            開始檢測
          </Button>
          <a
            href="#how-it-works"
            className="inline-flex min-h-11 items-center justify-center px-4 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          >
            先了解如何運作
            <span className="ml-1.5" aria-hidden>
              ↓
            </span>
          </a>
        </div>

        <div
          className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-10 border-t border-border/60"
          aria-label="檢測概要"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground tabular-nums mb-1">
              {QUESTIONS.length}
            </div>
            <p className="text-sm text-muted-foreground leading-snug">簡短題目</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground tabular-nums mb-1">
              5
            </div>
            <p className="text-sm text-muted-foreground leading-snug">分鐘內完成</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground tabular-nums mb-1">
              5
            </div>
            <p className="text-sm text-muted-foreground leading-snug">五種常見反應</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground tabular-nums mb-1">
              100%
            </div>
            <p className="text-sm text-muted-foreground leading-snug">隱私保護</p>
          </div>
        </div>
      </div>
    </section>
  );
}
