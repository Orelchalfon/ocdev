import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// Import loading spinner/skeleton
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() =>
  import("./pages/Services").catch(() => {
    console.error("Failed to load Services page");
    return { default: () => <Navigate to='/not-found' /> };
  })
);
const NotFound = lazy(() => import("./pages/NotFound"));

// Error boundary component

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='about'
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                  <About />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route
            path='portfolio'
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                  <Portfolio />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route
            path='services'
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                  <Services />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route
            path='contact'
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                  <Contact />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route
            path='not-found'
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFound />
              </Suspense>
            }
          />
          <Route
            path='*'
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
