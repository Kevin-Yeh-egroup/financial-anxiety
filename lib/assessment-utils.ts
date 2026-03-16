import {
  QUESTIONS,
  ANXIETY_PROFILES,
  type AssessmentResult,
} from './assessment-data';

export function calculateScores(
  answers: Record<number, number>
): AssessmentResult {
  const scores = {
    income: 0,
    debt: 0,
    planning: 0,
    emergency: 0,
    relationship: 0,
  };

  let totalAnswers = 0;

  QUESTIONS.forEach((question) => {
    if (answers[question.id] !== undefined) {
      scores[question.category] += answers[question.id];
      totalAnswers++;
    }
  });

  // Calculate average for each category
  const categoryCount = {
    income: 0,
    debt: 0,
    planning: 0,
    emergency: 0,
    relationship: 0,
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

  // Find primary type (highest score)
  const primaryType = (
    Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0] as string
  ) || 'income';

  return {
    scores,
    primaryType,
    allProfiles: ANXIETY_PROFILES as any,
  };
}

export function getScoreInterpretation(score: number): {
  level: string;
  levelCn: string;
  color: string;
  description: string;
} {
  if (score <= 25) {
    return {
      level: 'low',
      levelCn: '低',
      color: 'text-emerald-600',
      description: '您在這個方面的焦慮程度較低',
    };
  } else if (score <= 50) {
    return {
      level: 'moderate-low',
      levelCn: '輕微',
      color: 'text-blue-600',
      description: '您在這個方面的焦慮程度輕微',
    };
  } else if (score <= 75) {
    return {
      level: 'moderate',
      levelCn: '中等',
      color: 'text-amber-600',
      description: '您在這個方面的焦慮程度中等',
    };
  } else {
    return {
      level: 'high',
      levelCn: '高',
      color: 'text-red-600',
      description: '您在這個方面的焦慮程度較高',
    };
  }
}

export const SCORE_RANGES = {
  low: { min: 0, max: 25, label: '低焦慮' },
  'moderate-low': { min: 26, max: 50, label: '輕微焦慮' },
  moderate: { min: 51, max: 75, label: '中等焦慮' },
  high: { min: 76, max: 100, label: '高焦慮' },
};
