'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnxietyRadarChart from './radar-chart';
import {
  ANXIETY_PROFILES,
  GUIDANCE_CONFIG,
  type AnxietyTypeKey,
  type AssessmentResult,
  type GuidanceAction,
} from '@/lib/assessment-data';
import { getScoreInterpretation, heroRelatableText } from '@/lib/assessment-utils';

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

function ProfileHeroBlock({
  typeKey,
  score,
  imagePriority = false,
}: {
  typeKey: AnxietyTypeKey;
  score: number;
  imagePriority?: boolean;
}) {
  const profile = ANXIETY_PROFILES[typeKey];
  const interpretation = getScoreInterpretation(score, typeKey);
  const relatableBody = heroRelatableText(profile, score);

  return (
    <div
      className="rounded-2xl px-8 py-8 border-2"
      style={{
        backgroundColor: `${profile.color}14`,
        borderColor: profile.color,
      }}
    >
      <div className="flex justify-center mb-4">
        <div className="relative w-44 h-44">
          <Image
            src={profile.illustration}
            alt={profile.name}
            fill
            className="object-contain"
            sizes="176px"
            priority={imagePriority}
          />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-2" style={{ color: profile.color }}>
        {profile.name}
      </h2>
      <p
        className="text-sm font-semibold mb-6 px-3 py-1.5 rounded-full inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-left"
        style={{
          backgroundColor: `${profile.color}22`,
          color: profile.color,
        }}
      >
        <span>{profile.heroTraitLabel}</span>
        <span className="text-muted-foreground font-normal">·</span>
        <span className={interpretation.color}>{interpretation.levelCn}</span>
        <span className="text-muted-foreground font-normal text-xs">
          （{score}%）
        </span>
      </p>
      <div className="text-base text-foreground leading-loose text-center whitespace-pre-line text-pretty break-keep">
        {relatableBody}
      </div>
    </div>
  );
}

export default function ResultsDisplay({
  result,
  onRetake,
}: ResultsDisplayProps) {
  const tied = result.tiedPrimaryTypes ?? [];
  const hasTie = tied.length > 1;
  const primaryType = result.primaryType;
  const primaryProfile =
    primaryType != null ? ANXIETY_PROFILES[primaryType] : null;
  const guidance =
    primaryType != null
      ? GUIDANCE_CONFIG[primaryType as AnxietyTypeKey]
      : undefined;
  const tieNames = tied
    .map((t) => ANXIETY_PROFILES[t]?.name)
    .filter(Boolean)
    .join('、');
  const isLowOverall = result.isLowOverall ?? false;

  const radarData = Object.entries(result.scores).map(([key, value]) => ({
    name: ANXIETY_PROFILES[key]?.radarLabel || key,
    value: value,
    fill: ANXIETY_PROFILES[key]?.color || '#999',
  }));

  const primaryScoreVal = result.primaryScore ?? 0;
  const isHighestDimension = (value: number) => value === primaryScoreVal;
  const highestBadgeLabel = hasTie ? '並列最高' : '相對最高';

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Primary Result */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            財務壓力下，您可能較容易陷入的反應
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed text-pretty break-keep">
            依您的作答，大致推估壓力來臨時可能較常出現的一種焦慮模式，方便對照當下的感受。
          </p>
          {isLowOverall && hasTie && (
            <div className="max-w-lg mx-auto mb-6 rounded-xl border border-dashed border-primary/35 bg-muted/35 px-4 py-3 text-left text-sm leading-relaxed text-pretty break-keep space-y-2.5">
              <p className="text-muted-foreground">
                您各面向分數整體偏低（最高分約 {result.primaryScore ?? '—'}%），顯示目前財務壓力下的反應可能相對緩和。
              </p>
              <p className="text-foreground">
                <span className="font-medium">分數並列較高：</span>
                {tieNames}（均為 {result.primaryScore ?? '—'}%）。五種類型權重相同，並列時不指定單一「主類型」；下方以相同版面呈現每一種並列描述，請一併閱讀。
              </p>
              <p className="text-muted-foreground">
                由於整體分數不高，下方僅供對照參考；若讀起來不像您，請以雷達圖與各項分數為主。
              </p>
            </div>
          )}
          {isLowOverall && !hasTie && (
            <div className="max-w-lg mx-auto mb-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm text-muted-foreground leading-relaxed text-pretty break-keep space-y-2">
              <p>
                您各面向分數整體偏低（最高分約 {result.primaryScore ?? '—'}%），顯示目前財務壓力下的反應可能相對緩和。
              </p>
              <p>
                下方「相對較明顯」的一項僅供對照參考；若讀起來不像您，請以雷達圖與各項分數為主。
              </p>
            </div>
          )}
          {!isLowOverall && hasTie && (
            <div className="max-w-lg mx-auto mb-6 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-left text-sm text-foreground leading-relaxed text-pretty break-keep space-y-2">
              <p>
                <span className="font-medium text-foreground">分數並列較高：</span>
                {tieNames}（{result.primaryScore ?? '—'}%）。
              </p>
              <p>
                五種類型權重相同；並列時不指定單一「主類型」。下方以相同版面呈現每一種並列描述，請一併閱讀。
              </p>
            </div>
          )}
          <div className="w-full max-w-lg mx-auto space-y-8">
            {hasTie
              ? tied.map((typeKey, i) => (
                  <ProfileHeroBlock
                    key={typeKey}
                    typeKey={typeKey as AnxietyTypeKey}
                    score={
                      result.scores[typeKey as keyof typeof result.scores] ?? 0
                    }
                    imagePriority={i === 0}
                  />
                ))
              : tied[0] != null && (
                  <ProfileHeroBlock
                    typeKey={tied[0] as AnxietyTypeKey}
                    score={
                      result.scores[
                        tied[0] as keyof typeof result.scores
                      ] ?? 0
                    }
                    imagePriority
                  />
                )}
          </div>
        </div>

        {/* Radar Chart */}
        <Card className="bg-card border border-border rounded-2xl mb-12 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">五種反應的相對傾向</CardTitle>
          </CardHeader>
          <CardContent>
            <AnxietyRadarChart data={radarData} />
            <p className="text-sm text-muted-foreground mt-4 text-center text-pretty break-keep">
              下方數字為各面向的相對強度（0–100）。標示「{highestBadgeLabel}」者為本次五項中的最高分
              {hasTie ? '（同分並列）' : ''}。
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(result.scores).map(([key, value]) => {
                const profile = ANXIETY_PROFILES[key];
                const interpretation = getScoreInterpretation(
                  value,
                  key as AnxietyTypeKey
                );
                const isTop = isHighestDimension(value);
                return (
                  <div
                    key={key}
                    className={`text-center rounded-xl px-2 py-3 transition-shadow ${
                      isTop ? 'border-2 shadow-md' : 'border border-transparent'
                    }`}
                    style={
                      isTop
                        ? {
                            borderColor: profile.color,
                            backgroundColor: `${profile.color}14`,
                          }
                        : undefined
                    }
                  >
                    {isTop && (
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-wide mb-1.5 px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${profile.color}28`,
                          color: profile.color,
                        }}
                      >
                        {highestBadgeLabel}
                      </span>
                    )}
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
            const interpretation = getScoreInterpretation(
              value,
              key as AnxietyTypeKey
            );
            const isTop = isHighestDimension(value);

            return (
              <Card
                key={key}
                className={`bg-card rounded-2xl shadow-sm ${
                  isTop
                    ? 'border-2'
                    : 'border border-border'
                }`}
                style={
                  isTop
                    ? {
                        borderColor: profile.color,
                        boxShadow: `0 0 0 1px ${profile.color}33`,
                      }
                    : undefined
                }
              >
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: profile.color }}
                      />
                      <span>{profile.name}</span>
                    </CardTitle>
                    {isTop && (
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                        style={{
                          backgroundColor: `${profile.color}22`,
                          color: profile.color,
                        }}
                      >
                        {highestBadgeLabel} · {value}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {profile.heroTraitLabel} · {interpretation.levelCn}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        反應強度
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
                  <p className="text-sm text-muted-foreground text-pretty break-keep leading-relaxed">
                    {interpretation.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Guided Actions */}
        {hasTie
          ? tied.map((typeKey) => {
              const p = ANXIETY_PROFILES[typeKey];
              const g = GUIDANCE_CONFIG[typeKey as AnxietyTypeKey];
              if (!g) return null;
              return (
                <div
                  key={typeKey}
                  className="rounded-2xl p-8 mb-8 border-2 last:mb-12"
                  style={{
                    backgroundColor: `${p.color}0d`,
                    borderColor: `${p.color}40`,
                  }}
                >
                  <p
                    className="text-sm font-semibold mb-4"
                    style={{ color: p.color }}
                  >
                    {p.name} · 可參考資源
                  </p>
                  <div className="mb-7">
                    <p className="text-lg font-semibold text-foreground mb-3">
                      {g.intro}
                    </p>
                    <p className="text-base text-muted-foreground leading-loose mb-1">
                      {g.primaryCta}
                    </p>
                    <p className="text-sm text-muted-foreground leading-loose">
                      {g.secondaryCta}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {g.actions.map((action: GuidanceAction) => (
                      <GuidanceButton
                        key={`${typeKey}-${action.url}-${action.resourceKey ?? 'x'}`}
                        action={action}
                        color={p.color}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          : guidance &&
            primaryProfile && (
              <div
                className="rounded-2xl p-8 mb-12 border-2"
                style={{
                  backgroundColor: `${primaryProfile.color}0d`,
                  borderColor: `${primaryProfile.color}40`,
                }}
              >
                <div className="mb-7">
                  <p className="text-lg font-semibold text-foreground mb-3">
                    {guidance.intro}
                  </p>
                  <p className="text-base text-muted-foreground leading-loose mb-1">
                    {guidance.primaryCta}
                  </p>
                  <p className="text-sm text-muted-foreground leading-loose">
                    {guidance.secondaryCta}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {guidance.actions.map((action: GuidanceAction) => (
                    <GuidanceButton
                      key={`${action.url}-${action.resourceKey ?? 'x'}`}
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
            重新檢測
          </Button>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: '我的財務焦慮小檢測結果', url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className={
              hasTie || !primaryProfile
                ? 'bg-primary sm:min-w-48'
                : 'sm:min-w-48'
            }
            style={
              hasTie || !primaryProfile
                ? undefined
                : {
                    backgroundColor: primaryProfile.color,
                    borderColor: primaryProfile.color,
                  }
            }
          >
            分享結果
          </Button>
        </div>

        {/* Privacy Notice */}
        <div className="text-center text-sm text-muted-foreground text-pretty break-keep max-w-md mx-auto space-y-1">
          <p>🔒 您的隱私很重要。</p>
          <p>我們不會收集、保存或共享您的任何個人數據。</p>
        </div>
      </div>
    </div>
  );
}
