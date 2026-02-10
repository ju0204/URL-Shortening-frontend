"use client"

import { Globe, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const POPULAR_DOMAINS = [
  { domain: "youtube.com", count: 12840, percentage: 32, category: "동영상" },
  { domain: "github.com", count: 8920, percentage: 22, category: "개발" },
  { domain: "notion.so", count: 6450, percentage: 16, category: "생산성" },
  { domain: "medium.com", count: 4280, percentage: 11, category: "블로그" },
  { domain: "figma.com", count: 3190, percentage: 8, category: "디자인" },
  { domain: "twitter.com", count: 2760, percentage: 7, category: "SNS" },
]

const CATEGORIES = [
  { name: "동영상", count: "15.2K", icon: "▶", color: "bg-chart-1 text-primary-foreground" },
  { name: "블로그", count: "9.8K", icon: "✎", color: "bg-chart-2 text-primary-foreground" },
  { name: "개발", count: "8.9K", icon: "</>", color: "bg-chart-3 text-primary-foreground" },
  { name: "SNS", count: "7.1K", icon: "@", color: "bg-chart-4 text-primary-foreground" },
  { name: "생산성", count: "5.3K", icon: "⚡", color: "bg-chart-5 text-primary-foreground" },
  { name: "디자인", count: "3.2K", icon: "◇", color: "bg-muted-foreground text-card" },
]

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function UrlTrends() {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">URL Trends</span>
          </div>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            인기 URL 트렌드
          </h2>
          <p className="max-w-md text-pretty text-muted-foreground">
            가장 많이 단축되는 도메인과 카테고리를 확인하세요
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Popular Domains */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-primary" />
                인기 도메인
              </CardTitle>
              <CardDescription>최근 30일간 가장 많이 단축된 도메인</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {POPULAR_DOMAINS.map((item, index) => (
                  <div key={item.domain} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-secondary-foreground">
                          {index + 1}
                        </span>
                        <span className="font-mono text-sm font-medium text-foreground">
                          {item.domain}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-normal">
                          {item.category}
                        </Badge>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {formatNumber(item.count)}
                        </span>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                카테고리별 분포
              </CardTitle>
              <CardDescription>어떤 종류의 링크가 가장 많을까요?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-secondary/50"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${cat.color}`}
                    >
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{cat.count} links</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
