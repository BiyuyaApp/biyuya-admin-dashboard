"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { KpiCard } from "@/components/ui/kpi-card"
import { Server, Zap, Database, Globe } from "lucide-react"
import {
  analyticsService,
  NewRelicAPM,
  NewRelicErrors,
  NewRelicDatabase,
  NewRelicExternal
} from "@/lib/analytics-service"

export function OperationsPageConnected() {
  const [apmData, setApmData] = useState<NewRelicAPM | null>(null)
  const [errorsData, setErrorsData] = useState<NewRelicErrors | null>(null)
  const [databaseData, setDatabaseData] = useState<NewRelicDatabase | null>(null)
  const [externalData, setExternalData] = useState<NewRelicExternal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const [apmResponse, errorsResponse, databaseResponse, externalResponse] = await Promise.all([
          analyticsService.getNewRelicAPM(),
          analyticsService.getNewRelicErrors(),
          analyticsService.getNewRelicDatabase(),
          analyticsService.getNewRelicExternal(),
        ])

        setApmData(apmResponse)
        setErrorsData(errorsResponse)
        setDatabaseData(databaseResponse)
        setExternalData(externalResponse)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load operations data')
        console.error('Error fetching operations data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading operations data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading operations data</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  // Calculate badge variants based on metrics
  const getResponseTimeBadge = (ms: number) => {
    if (ms === 0) return null
    if (ms < 200) return { label: "Excellent", variant: "success" as const }
    if (ms < 500) return { label: "Good", variant: "default" as const }
    return { label: "Slow", variant: "warning" as const }
  }

  const getErrorRateBadge = (rate: number) => {
    if (rate === 0) return { label: "Perfect", variant: "success" as const }
    if (rate < 1) return { label: "Low", variant: "success" as const }
    if (rate < 5) return { label: "OK", variant: "warning" as const }
    return { label: "High", variant: "destructive" as const }
  }

  const getApdexBadge = (score: number) => {
    if (score === 0) return null
    if (score >= 0.94) return { label: "Excellent", variant: "success" as const }
    if (score >= 0.85) return { label: "Good", variant: "default" as const }
    if (score >= 0.7) return { label: "Fair", variant: "warning" as const }
    return { label: "Poor", variant: "destructive" as const }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operations</h1>
        <p className="text-muted-foreground">Backend performance and system health (New Relic APM)</p>
      </div>

      {/* APM Metrics (New Relic) */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Application Performance Monitoring (APM)</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{apmData?.avgResponseTime || 0}ms</p>
            {getResponseTimeBadge(apmData?.avgResponseTime || 0) && (
              <Badge
                variant={getResponseTimeBadge(apmData?.avgResponseTime || 0)!.variant}
                className="mt-2 text-xs"
              >
                {getResponseTimeBadge(apmData?.avgResponseTime || 0)!.label}
              </Badge>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Last 24 hours</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Throughput</p>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{apmData?.throughput || 0}</p>
            <p className="mt-2 text-xs text-muted-foreground">Requests per minute</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Error Rate</p>
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{apmData?.errorRate.toFixed(2) || '0.00'}%</p>
            {getErrorRateBadge(apmData?.errorRate || 0) && (
              <Badge
                variant={getErrorRateBadge(apmData?.errorRate || 0).variant}
                className="mt-2 text-xs"
              >
                {getErrorRateBadge(apmData?.errorRate || 0).label}
              </Badge>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Last 24 hours</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Apdex Score</p>
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{apmData?.apdexScore.toFixed(2) || '0.00'}</p>
            {getApdexBadge(apmData?.apdexScore || 0) && (
              <Badge
                variant={getApdexBadge(apmData?.apdexScore || 0)!.variant}
                className="mt-2 text-xs"
              >
                {getApdexBadge(apmData?.apdexScore || 0)!.label}
              </Badge>
            )}
            <p className="mt-2 text-xs text-muted-foreground">User satisfaction (0-1)</p>
          </Card>
        </div>
      </div>

      {/* Error Tracking */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Error Tracking</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Errors</p>
            <p className="text-2xl font-bold">{errorsData?.totalErrors || 0}</p>
            <p className="mt-2 text-xs text-muted-foreground">Last 24 hours</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Error Rate</p>
            <p className="text-2xl font-bold">{errorsData?.errorRate.toFixed(2) || '0.00'}%</p>
            <p className="mt-2 text-xs text-muted-foreground">Percentage of requests</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="mt-1 text-2xl font-bold">
              {(errorsData?.errorRate || 0) === 0 ? (
                <span className="text-green-600">Healthy</span>
              ) : (errorsData?.errorRate || 0) < 1 ? (
                <span className="text-green-600">Good</span>
              ) : (
                <span className="text-yellow-600">Monitor</span>
              )}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">System health</p>
          </Card>
        </div>
      </div>

      {/* Database Performance */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Database Performance</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg Query Time</p>
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{databaseData?.avgQueryTime || 0}ms</p>
            {(databaseData?.avgQueryTime || 0) > 0 && (
              <Badge
                variant={(databaseData?.avgQueryTime || 0) < 100 ? "success" : (databaseData?.avgQueryTime || 0) < 500 ? "default" : "warning"}
                className="mt-2 text-xs"
              >
                {(databaseData?.avgQueryTime || 0) < 100 ? "Fast" : (databaseData?.avgQueryTime || 0) < 500 ? "OK" : "Slow"}
              </Badge>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Last 24 hours</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Queries</p>
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{databaseData?.totalQueries.toLocaleString() || 0}</p>
            <p className="mt-2 text-xs text-muted-foreground">Last 24 hours</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Slow Queries</p>
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{databaseData?.slowQueries || 0}</p>
            {(databaseData?.slowQueries || 0) > 0 && (
              <Badge variant="warning" className="mt-2 text-xs">
                Needs optimization
              </Badge>
            )}
            <p className="mt-2 text-xs text-muted-foreground">&gt; 1 second</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Query Health</p>
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">
              {(databaseData?.totalQueries || 0) === 0 ? (
                <span className="text-gray-500">N/A</span>
              ) : (databaseData?.slowQueries || 0) === 0 ? (
                <span className="text-green-600">Excellent</span>
              ) : ((databaseData?.slowQueries || 0) / (databaseData?.totalQueries || 1)) < 0.01 ? (
                <span className="text-green-600">Good</span>
              ) : (
                <span className="text-yellow-600">Review</span>
              )}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {(databaseData?.totalQueries || 0) > 0 &&
                `${(((databaseData?.slowQueries || 0) / (databaseData?.totalQueries || 1)) * 100).toFixed(2)}% slow`
              }
            </p>
          </Card>
        </div>
      </div>

      {/* External Services */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">External Services (API Calls)</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg Call Time</p>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{externalData?.avgExternalTime || 0}ms</p>
            {(externalData?.avgExternalTime || 0) > 0 && (
              <Badge
                variant={(externalData?.avgExternalTime || 0) < 500 ? "success" : (externalData?.avgExternalTime || 0) < 2000 ? "default" : "warning"}
                className="mt-2 text-xs"
              >
                {(externalData?.avgExternalTime || 0) < 500 ? "Fast" : (externalData?.avgExternalTime || 0) < 2000 ? "OK" : "Slow"}
              </Badge>
            )}
            <p className="mt-2 text-xs text-muted-foreground">Last 24 hours</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Calls</p>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{externalData?.totalCalls.toLocaleString() || 0}</p>
            <p className="mt-2 text-xs text-muted-foreground">Stripe, OpenAI, etc.</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Slow Calls</p>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{externalData?.slowCalls || 0}</p>
            {(externalData?.slowCalls || 0) > 0 && (
              <Badge variant="warning" className="mt-2 text-xs">
                Monitor latency
              </Badge>
            )}
            <p className="mt-2 text-xs text-muted-foreground">&gt; 2 seconds</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Service Health</p>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">
              {(externalData?.totalCalls || 0) === 0 ? (
                <span className="text-gray-500">N/A</span>
              ) : (externalData?.slowCalls || 0) === 0 ? (
                <span className="text-green-600">Excellent</span>
              ) : ((externalData?.slowCalls || 0) / (externalData?.totalCalls || 1)) < 0.05 ? (
                <span className="text-green-600">Good</span>
              ) : (
                <span className="text-yellow-600">Review</span>
              )}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {(externalData?.totalCalls || 0) > 0 &&
                `${(((externalData?.slowCalls || 0) / (externalData?.totalCalls || 1)) * 100).toFixed(2)}% slow`
              }
            </p>
          </Card>
        </div>
      </div>

      {/* New Relic Notice */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
          📊 New Relic APM Data
        </p>
        <p className="mt-1 text-xs text-blue-800 dark:text-blue-300">
          {(apmData?.avgResponseTime || 0) === 0 ? (
            <>
              <strong>Status:</strong> New Relic not configured or no data available yet.<br/>
              Add <code>NEW_RELIC_API_KEY</code> (User API Key starting with "NRAK-") to .env for real-time performance monitoring.
            </>
          ) : (
            <>
              <strong>Status:</strong> Connected to New Relic APM. Showing real-time performance data from last 24 hours.
            </>
          )}
        </p>
      </Card>
    </div>
  )
}
