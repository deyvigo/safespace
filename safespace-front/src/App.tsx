import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Biblioteca from "./pages/Biblioteca";
import Atencion from "./pages/Atencion";
import Auth from "./pages/Auth";
import PsychologistDashboard from "./pages/PsychologistDashboard";
import StudentManagement from "./pages/StudentManagement";
import SessionManagement from "./pages/SessionManagement";
import ContentManagement from "./pages/ContentManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/atencion" element={<Atencion />} />
          <Route path="/psicologo" element={<PsychologistDashboard />} />
          <Route path="/psicologo/estudiantes" element={<StudentManagement />} />
          <Route path="/psicologo/sesiones" element={<SessionManagement />} />
          <Route path="/psicologo/contenidos" element={<ContentManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
