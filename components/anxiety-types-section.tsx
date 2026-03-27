'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ANXIETY_PROFILES } from '@/lib/assessment-data';

const TYPE_ORDER = ['survival', 'anticipation', 'helplessness', 'avoidance', 'hypervigilance'];

export default function AnxietyTypesSection() {
  const profiles = TYPE_ORDER.map((key) => ANXIETY_PROFILES[key]);

  return (
    <section className="w-full bg-gradient-to-b from-muted/10 to-background py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full">
            5 種常見的壓力反應
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-6 mb-4 text-balance">
            壓力一來，可能會陷入哪種焦慮？
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty break-keep">
            有人先擔心帳單與生計，有人先想到未來會不會出事，也有人先僵住、先躲開。每個人的反應節奏不同，這很正常。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {profiles.map((profile) => (
            <Card
              key={profile.type}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
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
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty break-keep">
                  {profile.relatable.split('\n\n')[0]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto text-pretty break-keep leading-relaxed">
          做完檢測後，會依你的作答大致整理壓力下可能較常出現的反應，並附上可參考的資源連結。
        </p>
      </div>
    </section>
  );
}
