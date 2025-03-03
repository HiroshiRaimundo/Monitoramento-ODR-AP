
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="amazon-monitor-theme">
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ajuda" element={<Help />} />
              <Route path="/documentacao" element={<Documentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
