import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Page error:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <Navigate to='/not-found' />;
//     }

//     return this.props.children;
//   }
// }

const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Page error:", event.error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);
  if (hasError) {
    return <Navigate to='/not-found' />;
  }

  return children;
};
export default ErrorBoundary;
