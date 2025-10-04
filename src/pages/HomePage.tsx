import React from 'react';
import { Box } from '@mui/material';
import { AppSidebar, Footer } from '../components/layout';
import { 
  FloatingFeatureCard, 
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
  ContactSection
} from '../components/home';
import { sidebarItems } from '../data/layout/sidebarData';
import { heroQuestions, featureCards, partnerCompanies } from '../data/home/chatHeroData';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <AppSidebar items={sidebarItems} />
  
      {/* Hero Section with Floating Cards - Fixed to viewport */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {/* Floating Feature Cards */}
        {featureCards.map((feature, index) => (
          <FloatingFeatureCard
            key={index}
            content={feature.content}
            position={feature.position}
            delay={feature.delay}
          />
        ))}

        {/* Auth Buttons */}
        <AuthButtons />

        {/* Hero Search Section */}
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

        {/* Dark Feature Section */}
        <DarkFeatureSection />

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

