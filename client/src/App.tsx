import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import UnifiedPortfolio from "@/pages/unified-portfolio";
import ProfessionalSummary from "@/pages/professional-summary";
import Messages from "@/pages/messages";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ProfessionalSummary} />
      <Route path="/portfolio" component={UnifiedPortfolio} />
      <Route path="/messages" component={Messages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
