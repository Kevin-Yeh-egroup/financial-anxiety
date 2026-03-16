'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQ } from '@/lib/assessment-data';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-background py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            常見問題
          </h2>
          <p className="text-lg text-muted-foreground">
            查找有關我們評估工具的答案
          </p>
        </div>

        <div className="space-y-4">
          {FAQ.map((item, idx) => (
            <Card
              key={idx}
              className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
                className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <CardTitle className="text-lg font-semibold text-foreground">
                  {item.question}
                </CardTitle>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <CardContent className="pt-4 pb-6 px-6 border-t border-border">
                  <p className="text-muted-foreground leading-loose">
                    {item.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
