'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQ } from '@/lib/assessment-data';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full bg-background py-16 md:py-20 px-4 sm:px-6 md:px-8 scroll-mt-20"
    >
      <div className="max-w-prose mx-auto w-full min-w-0">
        <div className="text-center mb-10 md:mb-12">
          <h2
            id="faq-heading"
            className="text-2xl md:text-4xl font-bold text-foreground mb-3 text-balance"
          >
            常見問題
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-pretty break-keep leading-[1.6]">
            關於這個簡單檢測的常見疑問
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {FAQ.map((item, idx) => (
            <Card
              key={idx}
              className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
            >
              <button
                type="button"
                aria-expanded={openIndex === idx}
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
                className="w-full min-h-12 text-left py-4 px-5 md:p-6 flex items-center justify-between gap-4 hover:bg-muted/50 motion-safe:transition-colors"
              >
                <CardTitle className="text-base md:text-lg font-semibold text-foreground text-pretty break-keep pr-2">
                  {item.question}
                </CardTitle>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-muted-foreground motion-safe:transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>

              {openIndex === idx && (
                <CardContent className="pt-2 pb-5 px-5 md:pt-4 md:pb-6 md:px-6 border-t border-border">
                  <div className="text-muted-foreground text-sm md:text-base leading-[1.6] space-y-3 text-pretty break-keep">
                    {item.answer.split(/\n\n+/).map((block, i) => (
                      <p key={i}>{block.trim()}</p>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
