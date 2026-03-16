'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FEATURES } from '@/lib/assessment-data';

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-background border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-8 pb-8 px-6">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
