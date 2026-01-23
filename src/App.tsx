import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Load ad scripts
    const scripts = [
      

      {
        src: "https://pl28389000.effectivegatecpm.com/f1/4f/74/f14f74330d0fdd4562e69cc344e34278.js",
        async: true
      },
      {
        src: "https://pl28389029.effectivegatecpm.com/5a/9e/a6/5a9ea6e15b33da2763113e5a0e63b162.js",
        async: true
      },
      {
        src: "https://quge5.com/88/tag.min.js",
        async: true,
        "data-zone": "204860",
        "data-cfasync": "false"
      },
      {
        src: "https://quge5.com/88/tag.min.js",
        async: true,
        "data-zone": "198680",
        "data-cfasync": "false"
      }
    ];

    scripts.forEach(scriptConfig => {
      const script = document.createElement("script");
      script.src = scriptConfig.src;
      script.async = scriptConfig.async;
      Object.keys(scriptConfig).forEach(key => {
        if (key !== 'src' && key !== 'async') {
          script.setAttribute(key, scriptConfig[key]);
        }
      });
      document.head.appendChild(script);
    });

    // Inline script for al5sm
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = "(function(s){s.dataset.zone='10297781',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))";
    document.head.appendChild(inlineScript);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
