import { useState, useEffect } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { DeveloperContributions } from "@/components/dashboard/DeveloperContributions";
import { DocumentationGapAlerts } from "@/components/dashboard/DocumentationGapAlerts";
import { BugOriginTraceability } from "@/components/dashboard/BugOriginTraceability";
import { OnboardingImpact } from "@/components/dashboard/OnboardingImpact";
import { 
  Rocket, 
  GraduationCap, 
  BookOpen, 
  Target, 
  Shield, 
  MessageSquare, 
  Search, 
  RefreshCw, 
  Clock, 
  Gauge,
  TrendingUp,
  Brain,
  Activity
} from "lucide-react";

// Mock data - in a real app, this would come from APIs
const mockDeveloperContributions = [
  { name: "Sarah Chen", contributions: 28, color: "hsl(var(--primary))" },
  { name: "Alex Rodriguez", contributions: 35, color: "hsl(var(--success))" },
  { name: "Jordan Kim", contributions: 15, color: "hsl(var(--warning))" },
  { name: "Michael Zhang", contributions: 22, color: "hsl(var(--info))" }
];

const mockDocumentationData = [
  {
    feature: "User Authentication System",
    hasPRD: true,
    hasDesign: true,
    hasMeetingNotes: true,
    hasRationale: false
  },
  {
    feature: "Payment Processing Module",
    hasPRD: true,
    hasDesign: false,
    hasMeetingNotes: true,
    hasRationale: true
  },
  {
    feature: "Notification Engine",
    hasPRD: false,
    hasDesign: true,
    hasMeetingNotes: false,
    hasRationale: false
  },
  {
    feature: "Analytics Dashboard",
    hasPRD: true,
    hasDesign: true,
    hasMeetingNotes: true,
    hasRationale: true
  },
  {
    feature: "File Upload Service",
    hasPRD: false,
    hasDesign: false,
    hasMeetingNotes: true,
    hasRationale: false
  }
];

const mockBugOriginData = [
  { category: "Unclear Requirements", count: 23, percentage: 34, color: "hsl(var(--destructive))" },
  { category: "Technical Debt", count: 18, percentage: 27, color: "hsl(var(--warning))" },
  { category: "Integration Issues", count: 15, percentage: 22, color: "hsl(var(--info))" },
  { category: "Performance", count: 11, percentage: 17, color: "hsl(var(--success))" }
];

const mockOnboardingImpactData = [
  { date: "Week 1", beforeSystem: 21, afterSystem: 12 },
  { date: "Week 2", beforeSystem: 19, afterSystem: 10 },
  { date: "Week 3", beforeSystem: 22, afterSystem: 11 },
  { date: "Week 4", beforeSystem: 20, afterSystem: 9 },
  { date: "Week 5", beforeSystem: 18, afterSystem: 8 },
  { date: "Week 6", beforeSystem: 17, afterSystem: 7 }
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedDeveloper, setSelectedDeveloper] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Contextual - CTO Dashboard
            </h1>
            <div className="text-sm text-muted-foreground">
              Last updated: {currentTime.toLocaleTimeString()}
            </div>
          </div>
          <p className="text-muted-foreground">
            Monitor team knowledge retention, onboarding efficiency, quality alignment, and developer contributions
          </p>
          
          {/* Filters */}
          <DashboardFilters
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedDeveloper={selectedDeveloper}
            setSelectedDeveloper={setSelectedDeveloper}
          />
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Average Time-to-Context (TTC)"
            value="2.3 days"
            change="-1.2 days improvement"
            changeType="positive"
            icon={Rocket}
            description="Time to understand feature context"
            gradient
          />
          <MetricCard
            title="Onboarding Ramp Time"
            value="8.2 days"
            change="-3.5 days improvement"
            changeType="positive"
            icon={GraduationCap}
            description="Time to productivity"
            gradient
          />
          <MetricCard
            title="Feature Knowledge Coverage"
            value="87%"
            change="+12% this quarter"
            changeType="positive"
            icon={BookOpen}
            description="Features with complete docs"
            gradient
          />
          <MetricCard
            title="Requirement Coverage Score"
            value="92%"
            change="+8% this month"
            changeType="positive"
            icon={Target}
            description="Clear requirement definition"
            gradient
          />
          <MetricCard
            title="Strategic Continuity"
            value="94%"
            change="+5% this quarter"
            changeType="positive"
            icon={Shield}
            description="Features fully explainable"
            gradient
          />
        </div>

        {/* Key Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeveloperContributions data={mockDeveloperContributions} />
          <DocumentationGapAlerts data={mockDocumentationData} />
        </div>

        {/* Supporting Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BugOriginTraceability data={mockBugOriginData} />
          <OnboardingImpact data={mockOnboardingImpactData} />
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Context Query Count per Feature"
            value="12.4"
            change="+2.1 this month"
            changeType="positive"
            icon={MessageSquare}
            description="Avg queries per feature"
          />
          <MetricCard
            title="Context Depth Usage"
            value="78%"
            change="+15% this quarter"
            changeType="positive"
            icon={Search}
            description="Features accessed docs before coding"
          />
          <MetricCard
            title="Decision Rationale Density"
            value="6.8"
            change="+1.3 this month"
            changeType="positive"
            icon={Brain}
            description="Explanations per feature"
          />
          <MetricCard
            title="Update Freshness"
            value="85%"
            change="+7% this month"
            changeType="positive"
            icon={RefreshCw}
            description="Features updated recently"
          />
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="First-Feature Delivery Gap"
            value="4.2 days"
            change="-1.8 days improvement"
            changeType="positive"
            icon={Clock}
            description="Time to first meaningful contribution"
          />
          <MetricCard
            title="System Performance"
            value="99.8%"
            change="0.1% downtime this month"
            changeType="positive"
            icon={Gauge}
            description="AI system uptime"
          />
          <MetricCard
            title="Overall Team Velocity"
            value="+28%"
            change="vs. pre-AI baseline"
            changeType="positive"
            icon={TrendingUp}
            description="Development speed improvement"
          />
        </div>
      </div>
    </div>
  );
}