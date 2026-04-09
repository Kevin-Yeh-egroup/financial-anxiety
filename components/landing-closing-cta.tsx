'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingClosingCtaProps {
  onStartTest: () => void;
}

/** 桌面版在 FAQ 後再次收斂單一主行動；手機以固定底欄為主故隱藏避免重複堆疊 */
export default function LandingClosingCta({ onStartTest }: LandingClosingCtaProps) {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="hidden md:block w-full bg-primary/5 border-y border-primary/15 py-16 md:py-20 px-4 sm:px-6 md:px-8 scroll-mt-20"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          id="closing-cta-heading"
          className="text-2xl md:text-3xl font-bold text-foreground text-balance mb-3"
        >
          準備好了嗎？
        </h2>
        <p className="text-base text-muted-foreground leading-[1.6] text-pretty break-keep mb-8">
          約五分鐘完成；結果僅供自我整理參考，不會儲存你的資料。
        </p>
        <Button
          type="button"
          onClick={onStartTest}
          className="min-h-12 h-12 px-10 text-base font-semibold rounded-xl"
        >
          開始檢測
        </Button>
      </div>
    </section>
  );
}
