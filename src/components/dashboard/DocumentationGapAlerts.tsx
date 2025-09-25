import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentationItem {
  feature: string;
  hasPRD: boolean;
  hasDesign: boolean;
  hasMeetingNotes: boolean;
  hasRationale: boolean;
}

interface DocumentationGapAlertsProps {
  data: DocumentationItem[];
}

export function DocumentationGapAlerts({ data }: DocumentationGapAlertsProps) {
  const calculateCompleteness = (item: DocumentationItem) => {
    const total = 4;
    const completed = [item.hasPRD, item.hasDesign, item.hasMeetingNotes, item.hasRationale].filter(Boolean).length;
    return (completed / total) * 100;
  };

  const getOverallProgress = () => {
    const totalItems = data.length * 4;
    const completedItems = data.reduce((acc, item) => {
      return acc + [item.hasPRD, item.hasDesign, item.hasMeetingNotes, item.hasRationale].filter(Boolean).length;
    }, 0);
    return (completedItems / totalItems) * 100;
  };

  const getStatusIcon = (hasItem: boolean) => {
    if (hasItem) {
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    }
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  const overallProgress = getOverallProgress();

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          Documentation Gap Alerts
          {overallProgress < 80 && <AlertCircle className="h-5 w-5 text-warning" />}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Feature documentation completeness tracking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Documentation Progress</span>
            <span className="text-foreground font-medium">{overallProgress.toFixed(0)}%</span>
          </div>
          <Progress 
            value={overallProgress} 
            className={cn(
              "h-3",
              overallProgress >= 80 ? "bg-success/20" : overallProgress >= 60 ? "bg-warning/20" : "bg-destructive/20"
            )}
          />
        </div>

        {/* Individual Features */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {data.map((item, index) => {
            const completeness = calculateCompleteness(item);
            return (
              <div key={index} className="space-y-2 p-3 bg-card/50 rounded-lg border border-muted/50">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-foreground">{item.feature}</h4>
                  <span className="text-xs text-muted-foreground">{completeness.toFixed(0)}%</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.hasPRD)}
                    <span className={item.hasPRD ? "text-foreground" : "text-muted-foreground"}>
                      PRD
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.hasDesign)}
                    <span className={item.hasDesign ? "text-foreground" : "text-muted-foreground"}>
                      Design Doc
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.hasMeetingNotes)}
                    <span className={item.hasMeetingNotes ? "text-foreground" : "text-muted-foreground"}>
                      Meeting Notes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.hasRationale)}
                    <span className={item.hasRationale ? "text-foreground" : "text-muted-foreground"}>
                      Rationale
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}