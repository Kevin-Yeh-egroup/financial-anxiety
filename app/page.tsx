'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/hero-section';
import LandingHowItWorks from '@/components/landing-how-it-works';
import LandingMobileStickyCta from '@/components/landing-mobile-sticky-cta';
import LandingClosingCta from '@/components/landing-closing-cta';
import AssessmentFlow from '@/components/assessment-flow';
import ResultsDisplay from '@/components/results-display';
import FeaturesSection from '@/components/features-section';
import LandingMoreFeaturesSection from '@/components/landing-more-features-section';
import AnxietyTypesSection from '@/components/anxiety-types-section';
import FAQSection from '@/components/faq-section';
import Footer from '@/components/footer';
import { type AssessmentResult } from '@/lib/assessment-data';

type PageState = 'landing' | 'assessment' | 'results';

export default function Home() {
  const [currentState, setCurrentState] = useState<PageState>('landing');
  const [results, setResults] = useState<AssessmentResult | null>(null);

  const handleStartTest = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentState('assessment');
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setResults(result);
    setCurrentState('results');
  };

  const handleRetake = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentState('landing');
    setResults(null);
  };

  return (
    <main className="w-full">
      {currentState === 'landing' && (
        <>
          <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
            <HeroSection onStartTest={handleStartTest} />
            <LandingHowItWorks />
            <FeaturesSection />
            <AnxietyTypesSection />
            <FAQSection />
            <LandingMoreFeaturesSection />
            <LandingClosingCta onStartTest={handleStartTest} />
            <Footer />
          </div>
          <LandingMobileStickyCta onStartTest={handleStartTest} />
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
