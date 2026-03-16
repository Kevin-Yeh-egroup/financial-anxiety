'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnxietyRadarChart from './radar-chart';
import { ANXIETY_PROFILES, GUIDANCE_CONFIG, type AssessmentResult, type GuidanceAction } from '@/lib/assessment-data';
import { getScoreInterpretation } from '@/lib/assessment-utils';

interface ResultsDisplayProps {
  result: AssessmentResult;
  onRetake: () => void;
}

function GuidanceButton({ action, color }: { action: GuidanceAction; color: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={action.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-start gap-4 rounded-xl p-5 border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
      style={{
        backgroundColor: hovered ? color : 'transparent',
        borderColor: hovered ? color : `${color}50`,
        color: hovered ? '#fff' : 'inherit',
      }}
    >
      <span className="text-2xl flex-shrink-0 mt-0.5">{action.icon}</span>
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-base mb-1 transition-colors duration-200"
          style={{ color: hovered ? '#fff' : color }}
        >
          {action.label}
        </p>
        <p
          className="text-sm leading-snug transition-colors duration-200"
          style={{ color: hovered ? 'rgba(255,255,255,0.85)' : undefined }}
        >
          {!hovered && <span className="text-muted-foreground">{action.description}</span>}
          {hovered && action.description}
        </p>
      </div>
      <span
        className="text-lg flex-shrink-0 self-center transition-colors duration-200"
        style={{ color: hovered ? 'rgba(255,255,255,0.7)' : `${color}80` }}
      >
        →
      </span>
    </a>
  );
}

export default function ResultsDisplay({
  result,
  onRetake,
}: ResultsDisplayProps) {
  const primaryProfile = ANXIETY_PROFILES[result.primaryType];
  const guidance = GUIDANCE_CONFIG[result.primaryType];

  const radarData = Object.entries(result.scores).map(([key, value]) => ({
    name: ANXIETY_PROFILES[key]?.radarLabel || key,
    value: value,
    fill: ANXIETY_PROFILES[key]?.color || '#999',
  }));

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Primary Result */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            您的焦慮類型
          </h1>
          <div className="inline-block w-full max-w-lg">
            <div
              className="rounded-2xl px-8 py-8 border-2"
              style={{
                backgroundColor: `${primaryProfile.color}14`,
                borderColor: primaryProfile.color,
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="relative w-44 h-44">
                  <Image
                    src={primaryProfile.illustration}
                    alt={primaryProfile.name}
                    fill
                    className="object-contain"
                    sizes="176px"
                    priority
                  />
                </div>
              </div>
              <h2
                className="text-3xl font-bold mb-1"
                style={{ color: primaryProfile.color }}
              >
                {primaryProfile.name}
              </h2>
              <p
                className="text-sm font-semibold mb-4 px-3 py-1 rounded-full inline-block"
                style={{
                  backgroundColor: `${primaryProfile.color}22`,
                  color: primaryProfile.color,
                }}
              >
                {primaryProfile.subtitle}
              </p>
              <p className="text-base text-foreground leading-relaxed mb-3">
                {primaryProfile.relatable}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {primaryProfile.description}
              </p>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <Card className="bg-card border border-border rounded-2xl mb-12 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">焦慮程度分析</CardTitle>
          </CardHeader>
          <CardContent>
            <AnxietyRadarChart data={radarData} />
            <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(result.scores).map(([key, value]) => {
                const profile = ANXIETY_PROFILES[key];
                const interpretation = getScoreInterpretation(value);
                return (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: profile.color }}>
                      {value}
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {profile.radarLabel}
                    </p>
                    <p className={`text-xs mt-1 font-medium ${interpretation.color}`}>
                      {interpretation.levelCn}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {Object.entries(result.scores).map(([key, value]) => {
            const profile = ANXIETY_PROFILES[key];
            const interpretation = getScoreInterpretation(value);

            return (
              <Card
                key={key}
                className="bg-card border border-border rounded-2xl shadow-sm"
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: profile.color }}
                    />
                    <span>{profile.name}</span>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{profile.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        焦慮程度
                      </span>
                      <span className={`font-bold ${interpretation.color}`}>
                        {interpretation.levelCn} ({value}%)
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{
                          width: `${value}%`,
                          backgroundColor: profile.color,
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {interpretation.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recommendations */}
        <Card className="bg-primary/5 border-2 border-primary rounded-2xl mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              📋 建議與行動計劃
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground mb-6 leading-relaxed">
              {primaryProfile.description}
            </p>
            <div className="space-y-4">
              {primaryProfile.recommendations.map((rec, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">{rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guided Actions */}
        {guidance && (
          <div
            className="rounded-2xl p-8 mb-12 border-2"
            style={{
              backgroundColor: `${primaryProfile.color}0d`,
              borderColor: `${primaryProfile.color}40`,
            }}
          >
            <div className="mb-6">
              <p className="text-lg font-semibold text-foreground mb-2">
                {guidance.intro}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                {guidance.primaryCta}
              </p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {guidance.secondaryCta}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guidance.actions.map((action) => (
                <GuidanceButton
                  key={action.url}
                  action={action}
                  color={primaryProfile.color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Retake & Share */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={onRetake}
            variant="outline"
            className="sm:min-w-48"
          >
            重新測驗
          </Button>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: '我的財務焦慮測驗結果', url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="sm:min-w-48"
            style={{ backgroundColor: primaryProfile.color, borderColor: primaryProfile.color }}
          >
            分享結果
          </Button>
        </div>

        {/* Privacy Notice */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            🔒 您的隱私很重要。我們不會收集、保存或共享您的任何個人數據。
          </p>
        </div>
      </div>
    </div>
  );
}
