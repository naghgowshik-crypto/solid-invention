import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Hero } from '../components/home/Hero';
import { AboutPreview } from '../components/home/AboutPreview';
import { CreativeWorld } from '../components/home/CreativeWorld';
import { FeaturedWork } from '../components/home/FeaturedWork';
import { TeamsPreview } from '../components/home/TeamsPreview';
import { CoreTeamPreview } from '../components/home/CoreTeamPreview';
import { FirstFrameBanner } from '../components/home/FirstFrameBanner';
import { ProcessTimeline } from '../components/home/ProcessTimeline';
import { CampusStoriesPreview } from '../components/home/CampusStoriesPreview';
import { JoinCTA } from '../components/home/JoinCTA';

export const HomePage: React.FC = () => {
  return (
    <PageLayout className="pt-0">
      <Hero />
      <AboutPreview />
      <CreativeWorld />
      <FeaturedWork />
      <TeamsPreview />
      <CoreTeamPreview />
      <FirstFrameBanner />
      <ProcessTimeline />
      <CampusStoriesPreview />
      <JoinCTA />
    </PageLayout>
  );
};
