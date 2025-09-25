import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronDown } from "lucide-react";

interface DashboardFiltersProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedDeveloper: string;
  setSelectedDeveloper: (value: string) => void;
}

export function DashboardFilters({
  timeRange,
  setTimeRange,
  selectedProject,
  setSelectedProject,
  selectedDeveloper,
  setSelectedDeveloper,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40 bg-card border-muted">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Select value={selectedProject} onValueChange={setSelectedProject}>
        <SelectTrigger className="w-48 bg-card border-muted">
          <SelectValue placeholder="Project/Team" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          <SelectItem value="mobile-app">Mobile App</SelectItem>
          <SelectItem value="web-platform">Web Platform</SelectItem>
          <SelectItem value="api-backend">API Backend</SelectItem>
          <SelectItem value="ml-platform">ML Platform</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedDeveloper} onValueChange={setSelectedDeveloper}>
        <SelectTrigger className="w-48 bg-card border-muted">
          <SelectValue placeholder="Developer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Developers</SelectItem>
          <SelectItem value="sarah-chen">Sarah Chen</SelectItem>
          <SelectItem value="alex-rodriguez">Alex Rodriguez</SelectItem>
          <SelectItem value="jordan-kim">Jordan Kim</SelectItem>
          <SelectItem value="michael-zhang">Michael Zhang</SelectItem>
          <SelectItem value="emma-wilson">Emma Wilson</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}