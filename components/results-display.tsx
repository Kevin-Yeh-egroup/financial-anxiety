'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnxietyRadarChart from './radar-chart';
import { ANXIETY_PROFILES, type AssessmentResult } from '@/lib/assessment-data';
import { getScoreInterpretation } from '@/lib/assessment-utils';

interface ResultsDisplayProps {
  result: AssessmentResult;
  onRetake: () => void;
}

export default function ResultsDisplay({
  result,
  onRetake,
}: ResultsDisplayProps) {
  const primaryProfile = ANXIETY_PROFILES[result.primaryType];

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
          <div className="inline-block">
            <div className="bg-primary/10 border-2 border-primary rounded-2xl px-8 py-6">
              <h2 className="text-3xl font-bold text-primary mb-2">
                {primaryProfile.name}
              </h2>
              <p className="text-lg text-muted-foreground">
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
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: profile.color }}
                    />
                    {profile.radarLabel}
                  </CardTitle>
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

        {/* Call to Action */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            需要更多幫助？
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            如果您的焦慮程度較高，考慮尋求專業的財務顧問或心理健康專業人士的幫助。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRetake}
              variant="outline"
              className="sm:min-w-48"
            >
              重新評估
            </Button>
            <Button className="bg-primary hover:bg-primary/90 sm:min-w-48">
              分享結果
            </Button>
          </div>
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
