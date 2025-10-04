import React from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { 
  CompanySlider, 
  HeroSearchSection, 
  AuthButtons,
  ExamplesSection,
  DarkFeatureSection,
  ROISection,
  DarkPillarSection,
  FullWidthCTASection,
  AlternatingFeatureSection,
  FullWidthImageSection,
  SplitImageSection,
  ContactSection,
  LightFeatureSection,
  LightStatsSection,
  InteractiveFeaturesSection
} from '../components/home';
import { sidebarItems } from '../data/layout/sidebarData';
import { heroQuestions, partnerCompanies } from '../data/home/chatHeroData';
import { useThemeMode } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { isDark } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark 
          ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
          : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        position: 'relative',
        overflowX: 'hidden',
        transition: 'background 0.3s ease',
      }}
    >
      <AppSidebar items={sidebarItems} />
      <ThemeToggle />
  
      {/* Hero Section - Simplified */}
      <Box
        data-section-theme={isDark ? 'dark' : 'light'}
        data-section-primary={isDark ? '#009BE4' : '#2563EB'}
        sx={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {/* Auth Buttons */}
        <AuthButtons />

        {/* Hero Chat Section */}
        <HeroSearchSection questions={heroQuestions} />
      
      {/* Companies Slider - Fixed at Bottom */}
        <CompanySlider companies={partnerCompanies} />
      </Box>

      {/* Content Sections - Below Hero */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Examples Section */}
        <ExamplesSection />

        {/* Interactive Features Section - NEW */}
        <InteractiveFeaturesSection />

        {/* Light Feature Section - WHITE BACKGROUND */}
        <LightFeatureSection />

        {/* Dark Feature Section */}
        <DarkFeatureSection />

        {/* Light Stats Section - WHITE BACKGROUND */}
        <LightStatsSection />

        {/* Full Width Image Section */}
        <FullWidthImageSection />

        {/* ROI Section */}
        <ROISection />

        {/* Split Image Section */}
        <SplitImageSection />

        {/* Dark Pillar Section */}
        <DarkPillarSection />

        {/* Full Width CTA Section */}
        <FullWidthCTASection />

        {/* Alternating Feature Section - "Not just another AI tool" */}
        <AlternatingFeatureSection />

        {/* Contact Section */}
        <ContactSection />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;

