import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './components/ErrorFallback.jsx';
// context
import { AuthContextProvider } from './context/AuthContext.jsx';
// react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// styles
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/")}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);