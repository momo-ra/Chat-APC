import { lazy, Suspense, useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { theme } from './theme';
import { ThemeProvider } from './contexts/ThemeContext';
import { SplashScreen } from './components/shared';
import HubSpotPageTracker from './components/shared/HubSpotPageTracker';
import ConsentBanner from './components/shared/ConsentBanner';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// Lazy load all pages for better performance
const HomePage = lazy(() => import("./pages/Index")); // HomePage (Index)
const Demo = lazy(() => import("./pages/Demo"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const DeploymentPage = lazy(() => import("./pages/DeploymentPage"));
const FAQPage = lazy(() => import("./pages/resources/FAQPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const ArchitecturePage = lazy(() => import("./pages/ArchitecturePage"));
const AgentsPage = lazy(() => import("./pages/AgentsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UserTourPage = lazy(() => import("./pages/UserTourPage"));

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Lock scroll during splash screen
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.scrollbarWidth = 'none';
    document.body.style.scrollbarWidth = 'none';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.scrollbarWidth = '';
      document.body.style.scrollbarWidth = '';
    };
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem('splashShown') === 'true') {
      setShowSplash(false);
    }
    setIsInitialized(true);
  }, []);

  // Show splash screen
  if (showSplash) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MUIThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={{
              html: { overflow: 'hidden', scrollbarWidth: 'none' },
              body: { overflow: 'hidden', scrollbarWidth: 'none' },
              '*::-webkit-scrollbar': { display: 'none' },
            }} />
            <SplashScreen onComplete={handleSplashComplete} />
          </MUIThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  if (!isInitialized) {
    return null;
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MUIThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={{
              html: { overflow: 'hidden', scrollbarWidth: 'none' },
              body: { overflow: 'hidden', scrollbarWidth: 'none' },
              '*::-webkit-scrollbar': { display: 'none' },
            }} />
            <ConsentBanner />

            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <Suspense fallback={<SplashScreen onComplete={() => {}} />}>
                {/* HubSpot Page Tracking */}
                <HubSpotPageTracker />
                
                <Routes>
                  {/* Main Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/demo" element={<Demo />} />
                  
                  {/* Auth Pages */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* Product Pages */}
                  <Route path="/product/deployment" element={<DeploymentPage />} />
                  <Route path="/product/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/product/architecture" element={<ArchitecturePage />} />
                  <Route path="/product/agents" element={<AgentsPage />} />
                  <Route path="/product/tour" element={<UserTourPage />} />
                  
                  {/* Company Pages */}
                  <Route path="/company/about" element={<AboutPage />} />
                  <Route path="/company/contact" element={<ContactPage />} />
                  
                  {/* Resources Pages */}
                  <Route path="/resources/faq" element={<FAQPage />} />
                  <Route path="/resources/blog" element={<BlogPage />} />
                  <Route path="/resources/blog/:id" element={<BlogDetailPage />} />
                  
                  {/* Other Pages */}
                  <Route path="/roadmap" element={<RoadmapPage />} />

                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  
                  {/* 404 Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </MUIThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
