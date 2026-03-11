"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart showing resource allocation by team"

const chartConfig = {
  resources: {
    label: "Resources",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarLabel({ data }: { data?: { team_name: string; headcount: number }[] }) {
  const chartData = data || []

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Resource Allocation by Team</CardTitle>
        <CardDescription>Current headcount distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="team_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="headcount" fill="#925ECC" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <span className="text-emerald-600">↑ 8.3%</span> team growth this quarter <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="text-muted-foreground leading-none">
          {chartData.length > 0 ? `${chartData[0].team_name} has the largest allocation with ${chartData[0].headcount} resources` : "No allocation data available"}
        </div>
        <div className="text-muted-foreground leading-none text-xs">
          Total resources: {chartData.reduce((acc, curr) => acc + curr.headcount, 0)}
        </div>
      </CardFooter>
    </Card>
  )
}