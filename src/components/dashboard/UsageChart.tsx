import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface UsageChartProps {
  data: Array<{
    date: string;
    queries: number;
    activeUsers: number;
    knowledgeCapture: number;
  }>;
}

export function UsageChart({ data }: UsageChartProps) {
  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground">AI Developer Twin Usage</CardTitle>
        <CardDescription className="text-muted-foreground">
          Daily queries, active users, and knowledge capture events
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="queriesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="captureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 32% 17%)" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(210 40% 3%)",
                border: "1px solid hsl(217 32% 17%)",
                borderRadius: "8px",
                color: "hsl(210 40% 98%)"
              }}
            />
            <Area
              type="monotone"
              dataKey="queries"
              stroke="hsl(217 91% 60%)"
              fillOpacity={1}
              fill="url(#queriesGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="activeUsers"
              stroke="hsl(142 76% 36%)"
              fillOpacity={1}
              fill="url(#usersGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="knowledgeCapture"
              stroke="hsl(199 89% 48%)"
              fillOpacity={1}
              fill="url(#captureGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}