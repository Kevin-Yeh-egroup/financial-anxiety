'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/hero-section';
import AssessmentFlow from '@/components/assessment-flow';
import ResultsDisplay from '@/components/results-display';
import FeaturesSection from '@/components/features-section';
import FAQSection from '@/components/faq-section';
import Footer from '@/components/footer';
import { type AssessmentResult } from '@/lib/assessment-data';

type PageState = 'landing' | 'assessment' | 'results';

export default function Home() {
  const [currentState, setCurrentState] = useState<PageState>('landing');
  const [results, setResults] = useState<AssessmentResult | null>(null);

  const handleStartTest = () => {
    setCurrentState('assessment');
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setResults(result);
    setCurrentState('results');
  };

  const handleRetake = () => {
    setCurrentState('landing');
    setResults(null);
  };

  return (
    <main className="w-full">
      {currentState === 'landing' && (
        <>
          <HeroSection onStartTest={handleStartTest} />
          <FeaturesSection />
          <FAQSection />
          <Footer />
        </>
      )}

      {currentState === 'assessment' && (
        <AssessmentFlow onComplete={handleAssessmentComplete} />
      )}

      {currentState === 'results' && results && (
        <>
          <ResultsDisplay result={results} onRetake={handleRetake} />
          <Footer />
        </>
      )}
    </main>
  );
}
