import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Clock, CheckCircle } from "lucide-react";

interface Developer {
  name: string;
  startDate: string;
  progress: number;
  status: "onboarding" | "ramping" | "productive";
  queriesUsed: number;
  timeToProductivity: string;
}

interface OnboardingProgressProps {
  developers: Developer[];
}

export function OnboardingProgress({ developers }: OnboardingProgressProps) {
  const getStatusColor = (status: Developer["status"]) => {
    switch (status) {
      case "onboarding":
        return "bg-warning text-warning-foreground";
      case "ramping":
        return "bg-info text-info-foreground";
      case "productive":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: Developer["status"]) => {
    switch (status) {
      case "onboarding":
        return <Clock className="h-3 w-3" />;
      case "ramping":
        return <User className="h-3 w-3" />;
      case "productive":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground">Developer Onboarding Progress</CardTitle>
        <CardDescription className="text-muted-foreground">
          Track new developer productivity ramp-up with AI assistance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {developers.map((developer, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{developer.name}</h4>
                  <p className="text-xs text-muted-foreground">Started {developer.startDate}</p>
                </div>
                <Badge className={getStatusColor(developer.status)}>
                  {getStatusIcon(developer.status)}
                  <span className="ml-1 capitalize">{developer.status}</span>
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress to Productivity</span>
                <span className="text-foreground">{developer.progress}%</span>
              </div>
              <Progress 
                value={developer.progress} 
                className="h-2 bg-muted"
              />
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{developer.queriesUsed} AI queries used</span>
              <span>Est. {developer.timeToProductivity}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}