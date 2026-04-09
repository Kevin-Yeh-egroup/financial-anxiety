'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ANXIETY_PROFILES } from '@/lib/assessment-data';

const TYPE_ORDER = ['survival', 'anticipation', 'helplessness', 'avoidance', 'hypervigilance'];

export default function AnxietyTypesSection() {
  const profiles = TYPE_ORDER.map((key) => ANXIETY_PROFILES[key]);

  return (
    <section
      id="five-reactions"
      aria-labelledby="anxiety-types-heading"
      className="w-full bg-gradient-to-b from-muted/10 to-background py-16 md:py-20 px-4 sm:px-6 md:px-8 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <span className="text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full">
            誰適合先看這段
          </span>
          <h2
            id="anxiety-types-heading"
            className="text-2xl md:text-4xl font-bold text-foreground mt-6 mb-4 text-balance"
          >
            五種常見的壓力反應
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-prose mx-auto leading-[1.6] text-pretty break-keep">
            有人先擔心帳單與生計，有人先想到未來會不會出事，也有人先僵住、先躲開。每個人的反應節奏不同，這很正常。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {profiles.map((profile) => (
            <Card
              key={profile.type}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-card border border-border rounded-2xl shadow-sm motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-md motion-safe:hover:-translate-y-0.5 overflow-hidden"
            >
              <div
                className="h-2 w-full"
                style={{ backgroundColor: profile.color }}
              />
              <CardContent className="pt-6 pb-7 px-6">
                <div className="flex justify-center mb-5">
                  <div className="relative w-36 h-36">
                    <Image
                      src={profile.illustration}
                      alt={profile.name}
                      fill
                      className="object-contain"
                      sizes="144px"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: profile.color }}
                  />
                  <h3 className="text-lg font-bold text-foreground">
                    {profile.name}
                  </h3>
                </div>
                <p className="text-sm md:text-[0.9375rem] text-muted-foreground leading-[1.6] text-pretty break-keep">
                  {profile.relatable.split('\n\n')[0]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-prose mx-auto text-pretty break-keep leading-[1.6]">
          做完檢測後，會依你的作答大致整理壓力下可能較常出現的反應，並附上可參考的資源連結。
        </p>
      </div>
    </section>
  );
}
