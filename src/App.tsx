import { lazy, Suspense, useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from './theme';
import { ThemeProvider } from './contexts/ThemeContext';
import { SplashScreen } from './components/shared';
import ContactPage from './pages/ContactPage';
import { HelmetProvider } from 'react-helmet-async';
import HubSpotPageTracker from './components/shared/HubSpotPageTracker';
// import { useHubSpotPageTracking } from './hooks/useHubSpotPageTracking'; // ❌ امسح الـ import ده

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
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
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {

  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });
  const [isInitialized, setIsInitialized] = useState(false);

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

  // ❌ امسح السطر ده - كان هنا useHubSpotPageTracking();
  
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
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <Suspense fallback={<SplashScreen onComplete={() => {}} />}>
                {/* ✅ ده كفاية - موجود جوا الـ Router */}
                <HubSpotPageTracker />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/product/deployment" element={<DeploymentPage />} />
                  <Route path="/resources/faq" element={<FAQPage />} />
                  <Route path="/company/about" element={<AboutPage />} />
                  <Route path="/roadmap" element={<RoadmapPage />} />
                  <Route path="/product/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/product/architecture" element={<ArchitecturePage />} />
                  <Route path="/product/agents" element={<AgentsPage />} />
                  <Route path="/resources/blog" element={<BlogPage />} />
                  <Route path="/resources/blog/:id" element={<BlogDetailPage />} />
                  <Route path="/company/contact" element={<ContactPage />} />
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