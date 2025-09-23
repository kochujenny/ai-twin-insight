import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, MessageSquare, GitCommit, FileText, Users } from "lucide-react";

interface Activity {
  id: string;
  type: "query" | "commit" | "document" | "onboarding";
  user: string;
  action: string;
  timestamp: string;
  details?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "query":
        return <MessageSquare className="h-4 w-4 text-primary" />;
      case "commit":
        return <GitCommit className="h-4 w-4 text-success" />;
      case "document":
        return <FileText className="h-4 w-4 text-info" />;
      case "onboarding":
        return <Users className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActivityBadge = (type: Activity["type"]) => {
    switch (type) {
      case "query":
        return <Badge variant="outline" className="text-primary border-primary/50">Query</Badge>;
      case "commit":
        return <Badge variant="outline" className="text-success border-success/50">Commit</Badge>;
      case "document":
        return <Badge variant="outline" className="text-info border-info/50">Document</Badge>;
      case "onboarding":
        return <Badge variant="outline" className="text-warning border-warning/50">Onboarding</Badge>;
      default:
        return <Badge variant="outline">Activity</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription className="text-muted-foreground">
          Latest interactions with the AI Developer Twin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-border/30 last:border-0">
                <div className="mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{activity.user}</p>
                    {getActivityBadge(activity.type)}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  {activity.details && (
                    <p className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                      {activity.details}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}