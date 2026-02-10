"use client"

import { Clock, Share2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"

const SHARE_DATA = [
  { time: "06시", clicks: 120, label: "06:00" },
  { time: "07시", clicks: 280, label: "07:00" },
  { time: "08시", clicks: 450, label: "08:00" },
  { time: "09시", clicks: 680, label: "09:00" },
  { time: "10시", clicks: 520, label: "10:00" },
  { time: "11시", clicks: 410, label: "11:00" },
  { time: "12시", clicks: 720, label: "12:00" },
  { time: "13시", clicks: 580, label: "13:00" },
  { time: "14시", clicks: 490, label: "14:00" },
  { time: "15시", clicks: 380, label: "15:00" },
  { time: "16시", clicks: 350, label: "16:00" },
  { time: "17시", clicks: 420, label: "17:00" },
  { time: "18시", clicks: 610, label: "18:00" },
  { time: "19시", clicks: 780, label: "19:00" },
  { time: "20시", clicks: 890, label: "20:00" },
  { time: "21시", clicks: 950, label: "21:00" },
  { time: "22시", clicks: 820, label: "22:00" },
  { time: "23시", clicks: 540, label: "23:00" },
]

const maxClicks = Math.max(...SHARE_DATA.map((d) => d.clicks))

const BEST_TIMES = [
  { time: "21:00", reason: "최고 클릭률", clicks: "950" },
  { time: "20:00", reason: "2위 클릭률", clicks: "890" },
  { time: "19:00", reason: "3위 클릭률", clicks: "780" },
]

// Compute colors in JS instead of using CSS variables directly
const PRIMARY_COLOR = "hsl(220, 72%, 50%)"
const PRIMARY_LIGHT = "hsl(220, 72%, 78%)"

function getBarColor(clicks: number): string {
  const ratio = clicks / maxClicks
  if (ratio >= 0.85) return PRIMARY_COLOR
  if (ratio >= 0.6) return "hsl(220, 60%, 60%)"
  return PRIMARY_LIGHT
}

export function ShareTiming() {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <Share2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Best Time to Share</span>
          </div>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            최적의 공유 시간대
          </h2>
          <p className="max-w-md text-pretty text-muted-foreground">
            링크를 공유하기 가장 좋은 시간을 확인하세요
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Chart */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                시간대별 클릭 추이
              </CardTitle>
              <CardDescription>
                오늘 기준 시간대별 평균 클릭수
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  clicks: {
                    label: "클릭수",
                    color: PRIMARY_COLOR,
                  },
                }}
                className="h-[280px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={SHARE_DATA}
                    margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                      interval={2}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="clicks"
                      radius={[4, 4, 0, 0]}
                      name="클릭수"
                    >
                      {SHARE_DATA.map((entry) => (
                        <Cell
                          key={entry.time}
                          fill={getBarColor(entry.clicks)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Best Times Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">추천 시간대</CardTitle>
              <CardDescription>공유 효과가 가장 높은 시간</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {BEST_TIMES.map((item, index) => (
                  <div
                    key={item.time}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-lg font-bold text-foreground">
                        {item.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.reason}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-semibold text-primary">
                        {item.clicks}
                      </p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>
                  </div>
                ))}

                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    저녁 19~22시 사이에 공유하면 클릭률이 평균 대비
                    <span className="font-semibold text-primary"> 2.3배 </span>
                    높습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
