'use client';

import React from 'react';

const STEPS = [
  {
    step: '1',
    title: '簡短作答',
    body: '依直覺勾選符合程度的敘述，約五分鐘可完成；無需輸入金額或個資。',
  },
  {
    step: '2',
    title: '看見你的傾向',
    body: '結果會整理五種常見反應的相對強度，方便對照壓力來臨時較常出現的模式。',
  },
  {
    step: '3',
    title: '選擇下一步',
    body: '可依結果參考知識庫、財務韌性檢視或諮詢等資源，依自己的節奏試試看。',
  },
] as const;

export default function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="w-full border-y border-border/80 bg-muted/20 py-16 md:py-20 px-4 sm:px-6 md:px-8 scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="how-it-works-heading"
          className="text-2xl md:text-3xl font-bold text-foreground text-center text-balance mb-3"
        >
          如何運作
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-prose mx-auto leading-[1.6] text-pretty break-keep mb-10">
          三個步驟，先理解流程再開始也不遲。
        </p>
        <ol className="space-y-6 list-none p-0 m-0">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="flex gap-4 items-start rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                aria-hidden
              >
              {item.step}
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-lg font-semibold text-foreground mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-[1.6] text-pretty break-keep">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
