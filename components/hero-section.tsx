'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { QUESTIONS } from '@/lib/assessment-data';

interface HeroSectionProps {
  onStartTest: () => void;
}

export default function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-background to-muted/20 pt-16 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-block">
          <span className="text-sm font-medium px-4 py-2 bg-accent/10 text-accent rounded-full">
            ✨ 免費｜簡單小檢測
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
          財務壓力來臨時，你可能較容易陷入哪種焦慮？
        </h1>

        <div className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-loose text-pretty break-keep space-y-3">
          <p>
            用幾題簡單敘述，整理錢的壓力一來時，你可能較常出現哪一種反應。
          </p>
          <p>約五分鐘完成，結果僅供自我整理參考。</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onStartTest}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-5 text-3xl md:text-4xl h-auto rounded-2xl"
          >
            開始檢測
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{QUESTIONS.length}</div>
            <p className="text-sm text-muted-foreground">簡短題目</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5分鐘</div>
            <p className="text-sm text-muted-foreground">快速完成</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5</div>
            <p className="text-sm text-muted-foreground">五種常見反應</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-sm text-muted-foreground">隱私保護</p>
          </div>
        </div>
      </div>
    </section>
  );
}
