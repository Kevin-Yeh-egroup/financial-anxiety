'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FEATURES } from '@/lib/assessment-data';

const FEATURE_ACCENTS = ['#6B7FD7', '#4DB6AC', '#F4A261', '#E76F51', '#9D79BC'];

export default function FeaturesSection() {
  return (
    <section
      id="what-you-get"
      aria-labelledby="features-heading"
      className="w-full bg-card py-16 md:py-20 px-4 sm:px-6 md:px-8 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <h2
            id="features-heading"
            className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            做完檢測，你會得到什麼？
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-prose mx-auto text-pretty break-keep leading-[1.6]">
            介面簡單、題目好懂，幫你在幾分鐘內，整理壓力來了時自己可能較容易陷入哪一種焦慮。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {FEATURES.map((feature, idx) => (
            <Card
              key={idx}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-card border border-border rounded-2xl shadow-sm motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-md motion-safe:hover:-translate-y-0.5 overflow-hidden"
            >
              <div
                className="h-2 w-full"
                style={{ backgroundColor: FEATURE_ACCENTS[idx % FEATURE_ACCENTS.length] }}
              />
              <CardContent className="pt-6 pb-7 px-6">
                <div className="text-5xl mb-5 text-center">{feature.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: FEATURE_ACCENTS[idx % FEATURE_ACCENTS.length] }}
                  />
                  <h3 className="text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm md:text-[0.9375rem] text-muted-foreground leading-[1.6] text-pretty break-keep">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
