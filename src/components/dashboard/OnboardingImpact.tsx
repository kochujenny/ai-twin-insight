import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface OnboardingImpactProps {
  data: Array<{
    date: string;
    beforeSystem: number;
    afterSystem: number;
  }>;
}

export function OnboardingImpact({ data }: OnboardingImpactProps) {
  // Calculate average improvement
  const avgBefore = data.reduce((acc, curr) => acc + curr.beforeSystem, 0) / data.length;
  const avgAfter = data.reduce((acc, curr) => acc + curr.afterSystem, 0) / data.length;
  const improvement = ((avgBefore - avgAfter) / avgBefore * 100).toFixed(1);

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground">Onboarding Impact</CardTitle>
        <CardDescription className="text-muted-foreground">
          Developer ramp time before vs. after AI system implementation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-2 bg-card/50 rounded-lg">
            <div className="text-lg font-bold text-muted-foreground">{avgBefore.toFixed(1)} days</div>
            <div className="text-xs text-muted-foreground">Before System</div>
          </div>
          <div className="p-2 bg-card/50 rounded-lg">
            <div className="text-lg font-bold text-primary">{avgAfter.toFixed(1)} days</div>
            <div className="text-xs text-muted-foreground">After System</div>
          </div>
          <div className="p-2 bg-card/50 rounded-lg">
            <div className="text-lg font-bold text-success">-{improvement}%</div>
            <div className="text-xs text-muted-foreground">Improvement</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              labelFormatter={(value) => `Date: ${value}`}
              formatter={(value: number, name: string) => [
                `${value} days`,
                name === "beforeSystem" ? "Before AI System" : "After AI System"
              ]}
            />
            <Line
              type="monotone"
              dataKey="beforeSystem"
              stroke="hsl(var(--destructive))"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
              name="Before System"
            />
            <Line
              type="monotone"
              dataKey="afterSystem"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              name="After System"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}