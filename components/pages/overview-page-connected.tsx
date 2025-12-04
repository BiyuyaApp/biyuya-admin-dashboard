"use client"

import { useEffect, useState } from "react"
import type React from "react"

import { KpiCard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import {
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import {
  Repeat,
  Calendar,
  Timer,
  Star,
  AlertTriangle,
  Server,
  Activity,
  Target,
  UserMinus,
  UserCheck,
} from "lucide-react"

import { analyticsService, type OverviewMetrics, type FunnelStep, type SystemHealth } from "@/lib/analytics-service"

export function OverviewPageConnected() {
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null)
  const [funnel, setFunnel] = useState<FunnelStep[]>([])
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        // Fetch all data in parallel
        const [metricsData, funnelData, healthData] = await Promise.all([
          analyticsService.getOverviewMetrics(7),
          analyticsService.getOnboardingFunnel(),
          analyticsService.getSystemHealth(),
        ])

        setMetrics(metricsData)
        setFunnel(funnelData.map((step, index) => ({
          ...step,
          fill: `oklch(${0.55 + index * 0.05} ${0.2 - index * 0.02} 250)`,
        })))
        setSystemHealth(healthData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center space-y-3">
          <Spinner className="h-8 w-8 mx-auto" />
          <p className="text-sm text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Error Loading Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Make sure the backend is running on {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!metrics) {
    return null
  }

  const maxDropOff = funnel.reduce((max, step) => (step.dropOff > max.dropOff ? step : max), funnel[0])

  return (
    <div className="space-y-6">
      {/* Primary KPIs */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Retention D1"
            value={`${metrics.retention.d1}%`}
            subtitle="Return next day"
            icon={Repeat}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Retention D7"
            value={`${metrics.retention.d7}%`}
            subtitle="Active 1 week later"
            icon={Calendar}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Retention D30"
            value={`${metrics.retention.d30}%`}
            subtitle="Active 1 month later"
            icon={Calendar}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="DAU/WAU"
            value={metrics.dauWauRatio}
            subtitle="Stickiness ratio"
            icon={Activity}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="TTFV"
            value={`${metrics.ttfv}min`}
            subtitle="Time to First Value"
            icon={Timer}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Power Users"
            value={metrics.powerUsers.toString()}
            subtitle="High activity"
            icon={Star}
          />
        </div>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Churn Rate"
            value={`${metrics.churnRate}%`}
            subtitle="Month-over-month"
            icon={UserMinus}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="DAU"
            value={metrics.dau.toLocaleString()}
            subtitle="Daily active users"
            icon={UserCheck}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="WAU"
            value={metrics.wau.toLocaleString()}
            subtitle="Weekly active users"
            icon={UserCheck}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="MAU"
            value={metrics.mau.toLocaleString()}
            subtitle="Monthly active users"
            icon={UserCheck}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Activation"
            value={`${metrics.activationRate}%`}
            subtitle="Complete first transaction"
            icon={Target}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Jobs Success"
            value={`${systemHealth?.successRate || 0}%`}
            subtitle="Last 24h"
            badge={{
              label: systemHealth && systemHealth.successRate >= 95 ? "Good" : "Warning",
              variant: systemHealth && systemHealth.successRate >= 95 ? "success" : "destructive"
            }}
            icon={Server}
          />
        </div>
      </div>

      {/* Funnel & System Health */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Onboarding funnel</CardTitle>
            {maxDropOff && (
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
                Max drop: {maxDropOff.name} ({maxDropOff.dropOff}%)
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      borderRadius: "6px",
                    }}
                  />
                  <Funnel dataKey="value" data={funnel} isAnimationActive>
                    <LabelList position="right" fill="oklch(0.7 0 0)" stroke="none" fontSize={11} />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System health (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <HealthMetric
                icon={AlertTriangle}
                label="Failed jobs"
                value={systemHealth?.failedJobs24h.toString() || "0"}
                status={systemHealth && systemHealth.failedJobs24h === 0 ? "success" : "warning"}
              />
              <HealthMetric
                icon={Server}
                label="Total jobs"
                value={systemHealth?.totalJobs24h.toString() || "0"}
                status="success"
              />
              <div className="col-span-2">
                <div className={`flex items-center gap-3 rounded-md p-3 ${
                  systemHealth && systemHealth.successRate >= 95
                    ? "bg-success/10"
                    : "bg-warning/10"
                }`}>
                  <Server className={`h-4 w-4 ${
                    systemHealth && systemHealth.successRate >= 95
                      ? "text-success"
                      : "text-warning"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Success rate</p>
                    <p className={`text-sm font-semibold ${
                      systemHealth && systemHealth.successRate >= 95
                        ? "text-success"
                        : "text-warning"
                    }`}>
                      {systemHealth?.successRate || 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function HealthMetric({
  icon: Icon,
  label,
  value,
  status,
}: {
  icon: React.ElementType
  label: string
  value: string
  status: "success" | "warning" | "error"
}) {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
  }
  const bgColors = {
    success: "bg-success/10",
    warning: "bg-warning/10",
    error: "bg-destructive/10",
  }

  return (
    <div className={`flex items-center gap-3 rounded-md ${bgColors[status]} p-3`}>
      <Icon className={`h-4 w-4 ${statusColors[status]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className={`text-sm font-semibold ${statusColors[status]}`}>{value}</p>
      </div>
    </div>
  )
}
