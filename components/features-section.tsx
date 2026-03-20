'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FEATURES } from '@/lib/assessment-data';

const FEATURE_ACCENTS = ['#6B7FD7', '#4DB6AC', '#F4A261', '#E76F51', '#9D79BC'];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-card py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            為什麼選擇我們的評估？
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            我們的工具結合了科學心理學研究和易用的設計，幫助您深入了解財務焦慮。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {FEATURES.map((feature, idx) => (
            <Card
              key={idx}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
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
                <p className="text-sm text-muted-foreground leading-relaxed">
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
