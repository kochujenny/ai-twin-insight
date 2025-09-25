import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface BugOriginTraceabilityProps {
  data: Array<{
    category: string;
    count: number;
    percentage: number;
    color: string;
  }>;
}

export function BugOriginTraceability({ data }: BugOriginTraceabilityProps) {
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="hsl(var(--foreground))" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground">Bug Origin Traceability</CardTitle>
        <CardDescription className="text-muted-foreground">
          Root cause analysis: requirement clarity vs. other factors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              formatter={(value: number, name: string) => [
                `${value} bugs (${data.find(d => d.category === name)?.percentage}%)`,
                name
              ]}
            />
            <Legend 
              wrapperStyle={{
                color: "hsl(var(--foreground))",
                fontSize: "12px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-card/50 rounded-lg">
            <div className="text-2xl font-bold text-destructive">
              {data.find(d => d.category === "Unclear Requirements")?.percentage || 0}%
            </div>
            <div className="text-xs text-muted-foreground">From Poor Requirements</div>
          </div>
          <div className="p-3 bg-card/50 rounded-lg">
            <div className="text-2xl font-bold text-success">
              {100 - (data.find(d => d.category === "Unclear Requirements")?.percentage || 0)}%
            </div>
            <div className="text-xs text-muted-foreground">Technical/Other Issues</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}