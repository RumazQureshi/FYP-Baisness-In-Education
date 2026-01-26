import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Layout
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Job Seeker Pages
import SeekerDashboard from "./pages/seeker/SeekerDashboard";
import SeekerProfile from "./pages/seeker/SeekerProfile";
import CVUpload from "./pages/seeker/CVUpload";
import GeneralizedCV from "./pages/seeker/GeneralizedCV";
import JobListings from "./pages/seeker/JobListings";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PostJob from "./pages/recruiter/PostJob";
import CandidateScreening from "./pages/recruiter/CandidateScreening";
import Shortlist from "./pages/recruiter/Shortlist";
import CandidateDetail from "./pages/recruiter/CandidateDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Job Seeker Routes */}
          <Route path="/seeker" element={<DashboardLayout role="seeker" />}>
            <Route path="dashboard" element={<SeekerDashboard />} />
            <Route path="profile" element={<SeekerProfile />} />
            <Route path="cv-upload" element={<CVUpload />} />
            <Route path="generalized-cv" element={<GeneralizedCV />} />
            <Route path="jobs" element={<JobListings />} />
          </Route>

          {/* Recruiter Routes */}
          <Route path="/recruiter" element={<DashboardLayout role="recruiter" />}>
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="candidates" element={<CandidateScreening />} />
            <Route path="shortlist" element={<Shortlist />} />
            <Route path="candidate/:candidateId" element={<CandidateDetail />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
