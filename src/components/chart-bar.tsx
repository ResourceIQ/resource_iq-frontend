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

const chartData = [
  { team: "Engineering", resources: 186 },
  { team: "Product", resources: 105 },
  { team: "Design", resources: 87 },
  { team: "Marketing", resources: 73 },
  { team: "Sales", resources: 109 },
  { team: "Support", resources: 64 },
]

const chartConfig = {
  resources: {
    label: "Resources",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarLabel() {
  return (
    <Card>
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
              dataKey="team"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="resources" fill="#925ECC" radius={8}>
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
          Engineering has the largest allocation with {chartData[0].resources} resources
        </div>
        <div className="text-muted-foreground leading-none text-xs">
          Total resources: {chartData.reduce((acc, curr) => acc + curr.resources, 0)}
        </div>
      </CardFooter>
    </Card>
  )
}