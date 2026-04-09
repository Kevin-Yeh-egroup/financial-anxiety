'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingMobileStickyCtaProps {
  onStartTest: () => void;
}

/** 手機首屏外隨時可觸發主轉換；桌面以首屏與頁尾前 CTA 為主 */
export default function LandingMobileStickyCta({
  onStartTest,
}: LandingMobileStickyCtaProps) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
      role="region"
      aria-label="開始檢測"
    >
      <Button
        type="button"
        onClick={onStartTest}
        className="w-full min-h-12 h-12 text-base font-semibold rounded-xl"
      >
        開始檢測
      </Button>
    </div>
  );
}
