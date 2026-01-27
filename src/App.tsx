import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import Profile from "./pages/Profile";
import ProjectChart from "./pages/ProjectChart";
import MentorSupport from "./pages/MentorSupport";
import MentorChat from "./pages/MentorChat";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Subscription from "./pages/Subscription";
import OrderSummary from "./pages/OrderSummary";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isOnboardingComplete } = useUserStore();

  if (!isOnboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/career/:id" element={<CareerDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/project-chart" element={<ProjectChart />} />
            <Route path="/mentor-support" element={<MentorSupport />} />
            <Route path="/mentor-chat/:id" element={<MentorChat />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
