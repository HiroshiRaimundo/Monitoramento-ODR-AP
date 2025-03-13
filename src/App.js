import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Index from './pages/Index';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import Documentation from './pages/Documentation';

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      ThemeProvider,
      { defaultTheme: "light", storageKey: "vite-ui-theme" },
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(
          "div",
          { className: "min-h-screen bg-gradient-to-br from-white to-forest-50/30 font-poppins" },
          React.createElement(
            "link",
            {
              rel: "stylesheet",
              href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
            }
          ),
          React.createElement(
            Routes,
            null,
            React.createElement(Route, { path: "/", element: React.createElement(Index, null) }),
            React.createElement(Route, { path: "/ajuda", element: React.createElement(Help, null) }),
            React.createElement(Route, { path: "/documentacao", element: React.createElement(Documentation, null) }),
            React.createElement(Route, { path: "*", element: React.createElement(NotFound, null) })
          ),
          React.createElement(Toaster, null)
        )
      )
    )
  );
}

export default App;
