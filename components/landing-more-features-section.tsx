'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

type FeatureLink = {
  title: string;
  description: string;
  href: string;
};

const DETECTION_LINKS: FeatureLink[] = [
  {
    title: '財務韌性檢測',
    description:
      '線上完成檢測，了解面對財務變動時的承受與回復能力。',
    href: 'https://www.familyfinhealth.com/financial-resilience',
  },
  {
    title: '詐騙防禦能力檢測',
    description:
      '線上完成檢測，了解辨識詐騙情境與自我防護的準備程度。',
    href: 'https://www.familyfinhealth.com/fraud-defense',
  },
];

const TOOL_LINKS: FeatureLink[] = [
  {
    title: '個人中心',
    description: '查看在好理家在檢測的歷史進度與紀錄。',
    href: 'https://www.familyfinhealth.com/personal-center?tab=overview',
  },
  {
    title: '財務生活記帳助理',
    description: '透過實際記帳，了解實際財務狀況。',
    href: 'https://www.familyfinhealth.com/toolbox/financial-calculator/basic-accounting-preview',
  },
  {
    title: '夢想達成財務管理',
    description: '訂定自我財務目標。',
    href: 'https://www.familyfinhealth.com/financial-planning',
  },
  {
    title: '財務試算模擬器',
    description: '不清楚的財務數字直接試算。',
    href: 'https://www.familyfinhealth.com/toolbox/financial-calculator',
  },
  {
    title: '問問AI',
    description: '直接詢問財務相關問題。',
    href: 'https://www.familyfinhealth.com/ask-ivy',
  },
  {
    title: '知識庫',
    description: '快速查找知識與經驗。',
    href: 'https://www.familyfinhealth.com/knowledge-base',
  },
];

function FeatureLinkCard({ item }: { item: FeatureLink }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-[11rem] h-full flex-col rounded-xl border border-border bg-background p-5 sm:p-6 shadow-sm motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-md motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-foreground leading-snug text-pretty break-keep pr-2">
          {item.title}
        </h3>
        <ExternalLink
          className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
          aria-hidden
        />
      </div>
      <p className="mb-auto flex-1 text-sm text-muted-foreground leading-[1.6] text-pretty break-keep">
        {item.description}
      </p>
      <p className="mt-6 text-xs text-muted-foreground/80">另開新視窗</p>
    </a>
  );
}

export default function LandingMoreFeaturesSection() {
  return (
    <section
      id="more-resources"
      className="w-full bg-muted/20 py-16 md:py-20 px-4 sm:px-6 md:px-8 scroll-mt-20"
      aria-labelledby="more-features-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="more-features-heading"
          className="mb-3 text-center text-2xl font-bold text-foreground md:text-4xl text-balance"
        >
          你還可以使用的這些功能
        </h2>
        <p className="mb-10 md:mb-12 text-center text-sm md:text-base text-muted-foreground max-w-prose mx-auto leading-[1.6] text-pretty break-keep">
          完成檢測後，若想多探索好理家在的其他檢測與工具，可從這裡前往（另開新視窗）。
        </p>

        <div className="mb-10 md:mb-12">
          <h3 className="mb-4 text-lg font-semibold text-foreground md:text-xl">
            檢測
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            {DETECTION_LINKS.map((item) => (
              <FeatureLinkCard key={item.href} item={item} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground md:text-xl">
            工具使用
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {TOOL_LINKS.map((item) => (
              <FeatureLinkCard key={item.href} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
