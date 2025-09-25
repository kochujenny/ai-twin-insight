import { useState, useEffect } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { OnboardingProgress } from "@/components/dashboard/OnboardingProgress";
import { KnowledgeGraph } from "@/components/dashboard/KnowledgeGraph";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Database, 
  Brain,
  Activity,
  Target
} from "lucide-react";

// Mock data - in a real app, this would come from APIs
const mockUsageData = [
  { date: "2024-09-16", queries: 145, activeUsers: 12, knowledgeCapture: 8 },
  { date: "2024-09-17", queries: 162, activeUsers: 15, knowledgeCapture: 12 },
  { date: "2024-09-18", queries: 134, activeUsers: 11, knowledgeCapture: 6 },
  { date: "2024-09-19", queries: 189, activeUsers: 18, knowledgeCapture: 15 },
  { date: "2024-09-20", queries: 201, activeUsers: 22, knowledgeCapture: 18 },
  { date: "2024-09-21", queries: 178, activeUsers: 19, knowledgeCapture: 14 },
  { date: "2024-09-22", queries: 223, activeUsers: 25, knowledgeCapture: 21 },
];

const mockDevelopers = [
  {
    name: "Sarah Chen",
    startDate: "2024-09-15",
    progress: 85,
    status: "ramping" as const,
    queriesUsed: 47,
    timeToProductivity: "3 days remaining"
  },
  {
    name: "Alex Rodriguez",
    startDate: "2024-09-10",
    progress: 100,
    status: "productive" as const,
    queriesUsed: 73,
    timeToProductivity: "Complete"
  },
  {
    name: "Jordan Kim",
    startDate: "2024-09-20",
    progress: 35,
    status: "onboarding" as const,
    queriesUsed: 18,
    timeToProductivity: "7 days remaining"
  }
];

const mockKnowledgeData = [
  { name: "Git Commits", value: 2340, color: "hsl(217 91% 60%)" },
  { name: "Jira Tickets", value: 1450, color: "hsl(142 76% 36%)" },
  { name: "Slack Messages", value: 3210, color: "hsl(199 89% 48%)" },
  { name: "Notion Docs", value: 890, color: "hsl(38 92% 50%)" },
  { name: "Figma Files", value: 560, color: "hsl(280 100% 70%)" }
];

const mockActivities = [
  {
    id: "1",
    type: "query" as const,
    user: "Sarah Chen",
    action: "Asked about authentication implementation patterns",
    timestamp: "2 minutes ago",
    details: "\"How do we handle JWT token refresh in the mobile app?\""
  },
  {
    id: "2",
    type: "commit" as const,
    user: "Alex Rodriguez",
    action: "Linked commit to knowledge base",
    timestamp: "15 minutes ago",
    details: "Added rationale for database migration strategy"
  },
  {
    id: "3",
    type: "onboarding" as const,
    user: "Jordan Kim",
    action: "Completed environment setup module",
    timestamp: "1 hour ago"
  },
  {
    id: "4",
    type: "document" as const,
    user: "Michael Zhang",
    action: "Updated API documentation",
    timestamp: "2 hours ago",
    details: "Added context for rate limiting decisions"
  },
  {
    id: "5",
    type: "query" as const,
    user: "Sarah Chen",
    action: "Queried about component architecture",
    timestamp: "3 hours ago",
    details: "\"Why did we choose this specific state management pattern?\""
  }
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Developer Twin - CTO Dashboard
            </h1>
            <div className="text-sm text-muted-foreground">
              Last updated: {currentTime.toLocaleTimeString()}
            </div>
          </div>
          <p className="text-muted-foreground">
            Monitor developer productivity, knowledge capture and onboarding progress
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Developers"
            value={25}
            change="+12% from last week"
            changeType="positive"
            icon={Users}
            description="Currently using the AI twin"
            gradient
          />
          <MetricCard
            title="Daily Queries"
            value={223}
            change="+25% from yesterday"
            changeType="positive"
            icon={MessageSquare}
            description="Questions answered today"
            gradient
          />
          <MetricCard
            title="Knowledge Items"
            value="8.5K"
            change="+3.2% this week"
            changeType="positive"
            icon={Database}
            description="Captured context pieces"
            gradient
          />
          <MetricCard
            title="Avg. Onboarding Time"
            value="8.2 days"
            change="-2.1 days improvement"
            changeType="positive"
            icon={Clock}
            description="Time to productivity"
            gradient
          />
        </div>

        {/* Charts and Detailed Views */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <UsageChart data={mockUsageData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OnboardingProgress developers={mockDevelopers} />
          <KnowledgeGraph data={mockKnowledgeData} />
          <RecentActivity activities={mockActivities} />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Query Success Rate"
            value="94.2%"
            change="+1.8% this month"
            changeType="positive"
            icon={Target}
            description="Queries resolved successfully"
          />
          <MetricCard
            title="Knowledge Gaps"
            value={12}
            change="-5 from last week"
            changeType="positive"
            icon={Brain}
            description="Missing context identified"
          />
          <MetricCard
            title="Team Productivity"
            value="+23%"
            change="vs. pre-AI baseline"
            changeType="positive"
            icon={TrendingUp}
            description="Overall efficiency gain"
          />
          <MetricCard
            title="System Health"
            value="99.8%"
            change="0.1% downtime this month"
            changeType="positive"
            icon={Activity}
            description="AI system uptime"
          />
        </div>
      </div>
    </div>
  );
}