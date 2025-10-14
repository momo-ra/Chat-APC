import { lazy, Suspense, useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from './theme';
import { ThemeProvider } from './contexts/ThemeContext';
import { SplashScreen } from './components/shared';
import ContactPage from './pages/ContactPage';

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
    // Check if splash has been shown in this session
    return !sessionStorage.getItem('splashShown');
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const handleSplashComplete = () => {
    // Mark splash as shown for this session
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  // Prevent splash from showing again if already shown and ensure proper initialization
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
            <SplashScreen onComplete={handleSplashComplete} />
          </MUIThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  // Don't render main app until initialized to prevent white flash
  if (!isInitialized) {
    return null;
  }

  // Main app content
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense fallback={<SplashScreen onComplete={() => {}} />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </MUIThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
