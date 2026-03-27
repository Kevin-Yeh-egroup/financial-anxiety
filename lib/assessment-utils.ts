import {
  QUESTIONS,
  ANXIETY_PROFILES,
  LEVEL_DESCRIPTIONS_BY_TYPE,
  type AnxietyProfile,
  type AssessmentResult,
  type AnxietyTypeKey,
} from './assessment-data';

/** 最高分低於此值時，視為「整體反應偏弱」，結果頁會加註說明避免過度詮釋 */
const LOW_OVERALL_MAX_SCORE = 36;

/** 分數區間對應的顯示標籤（與 getScoreInterpretation 的 levelCn 一致） */
export const SCORE_RANGES = {
  low: { min: 0, max: 25, label: '低焦慮' },
  'moderate-low': { min: 26, max: 50, label: '輕微焦慮' },
  moderate: { min: 51, max: 75, label: '中等焦慮' },
  high: { min: 76, max: 100, label: '高焦慮' },
} as const;

export function calculateScores(
  answers: Record<number, number>
): AssessmentResult {
  const scores = {
    survival: 0,
    anticipation: 0,
    helplessness: 0,
    avoidance: 0,
    hypervigilance: 0,
  };

  QUESTIONS.forEach((question) => {
    if (answers[question.id] !== undefined) {
      scores[question.category] += answers[question.id];
    }
  });

  const categoryCount = {
    survival: 0,
    anticipation: 0,
    helplessness: 0,
    avoidance: 0,
    hypervigilance: 0,
  };

  QUESTIONS.forEach((question) => {
    categoryCount[question.category]++;
  });

  Object.keys(scores).forEach((key) => {
    const category = key as keyof typeof scores;
    if (categoryCount[category] > 0) {
      scores[category] = Math.round(
        (scores[category] / categoryCount[category] / 5) * 100
      );
    }
  });

  const primaryScore = Math.max(
    ...(Object.keys(scores) as (keyof typeof scores)[]).map((k) => scores[k])
  );
  const tiedPrimaryTypes: string[] = (
    Object.keys(scores) as (keyof typeof scores)[]
  )
    .filter((k) => scores[k] === primaryScore)
    .sort((a, b) => a.localeCompare(b));
  const primaryType =
    tiedPrimaryTypes.length === 1 ? tiedPrimaryTypes[0] : null;
  const isLowOverall = primaryScore <= LOW_OVERALL_MAX_SCORE;

  return {
    scores,
    primaryScore,
    tiedPrimaryTypes,
    isLowOverall,
    primaryType,
    allProfiles: ANXIETY_PROFILES as any,
  };
}

/** 第二個參數傳入維度代碼時，敘述會依該類型與強度區間客製，避免五種面向共用同一句話。 */
export function getScoreInterpretation(
  score: number,
  categoryKey?: AnxietyTypeKey
): {
  level: string;
  levelCn: string;
  color: string;
  description: string;
} {
  const byType = categoryKey ? LEVEL_DESCRIPTIONS_BY_TYPE[categoryKey] : null;

  if (score <= 25) {
    return {
      level: 'low',
      levelCn: SCORE_RANGES.low.label,
      color: 'text-emerald-600',
      description:
        byType?.low ?? '面對財務壓力時，您在這個面向的反應相對較輕',
    };
  }
  if (score <= 50) {
    return {
      level: 'moderate-low',
      levelCn: SCORE_RANGES['moderate-low'].label,
      color: 'text-blue-600',
      description:
        byType?.moderateLow ??
        '面對財務壓力時，您在這個面向偶爾可能會有感覺',
    };
  }
  if (score <= 75) {
    return {
      level: 'moderate',
      levelCn: SCORE_RANGES.moderate.label,
      color: 'text-amber-600',
      description:
        byType?.moderate ??
        '面對財務壓力時，您在這個面向可能較常感到吃力',
    };
  }
  return {
    level: 'high',
    levelCn: SCORE_RANGES.high.label,
    color: 'text-red-600',
    description:
      byType?.high ??
      '面對財務壓力時，您在這個面向可能較常明顯感到焦慮',
  };
}

/** 結果頁主視覺區正文：依該維度分數對應四段敘述之一 */
export function heroRelatableText(profile: AnxietyProfile, score: number): string {
  const h = profile.heroRelatableByLevel;
  if (score <= 25) return h.low;
  if (score <= 50) return h.moderateLow;
  if (score <= 75) return h.moderate;
  return h.high;
}
