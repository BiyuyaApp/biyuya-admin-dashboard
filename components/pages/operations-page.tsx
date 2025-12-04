"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { KpiCard } from "@/components/ui/kpi-card"
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Cpu,
  Timer,
  Users,
  TrendingUp,
  TrendingDown,
  Server,
  Zap,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const queuesData = [
  {
    name: "recurring-payments",
    active: 12,
    waiting: 45,
    failed: 2,
    avgTime: "1.2s",
    status: "healthy",
    cost: 12.5,
    usersImpacted: 2,
  },
  {
    name: "ai-threads",
    active: 8,
    waiting: 23,
    failed: 5,
    avgTime: "3.8s",
    status: "warning",
    cost: 48.2,
    usersImpacted: 4,
  },
  {
    name: "notifications",
    active: 3,
    waiting: 156,
    failed: 0,
    avgTime: "0.4s",
    status: "healthy",
    cost: 8.4,
    usersImpacted: 0,
  },
  {
    name: "data-exports",
    active: 2,
    waiting: 8,
    failed: 1,
    avgTime: "12.5s",
    status: "healthy",
    cost: 15.8,
    usersImpacted: 1,
  },
  {
    name: "sync-jobs",
    active: 5,
    waiting: 34,
    failed: 3,
    avgTime: "2.1s",
    status: "warning",
    cost: 22.1,
    usersImpacted: 3,
  },
]

const recurringRuns = [
  { user: "sarah.chen@example.com", type: "Monthly bills", lastRun: "2 hours ago", status: "Success", attempts: 1 },
  { user: "mike.j@example.com", type: "Weekly savings", lastRun: "3 hours ago", status: "Failed", attempts: 3 },
  { user: "emma.w@example.com", type: "Daily tracking", lastRun: "30 min ago", status: "Success", attempts: 1 },
  { user: "alex.r@example.com", type: "Subscription sync", lastRun: "1 hour ago", status: "Skipped", attempts: 0 },
  { user: "jordan.lee@example.com", type: "Monthly bills", lastRun: "4 hours ago", status: "Success", attempts: 1 },
]

const aiThreads = [
  {
    user: "sarah.chen@example.com",
    type: "categorizer",
    duration: "1.2s",
    cost: "$0.002",
    status: "Completed",
    startedAt: "10:32 AM",
  },
  {
    user: "mike.j@example.com",
    type: "assistant",
    duration: "4.5s",
    cost: "$0.008",
    status: "Error",
    startedAt: "10:28 AM",
  },
  {
    user: "emma.w@example.com",
    type: "report",
    duration: "8.2s",
    cost: "$0.015",
    status: "Completed",
    startedAt: "10:25 AM",
  },
  {
    user: "alex.r@example.com",
    type: "categorizer",
    duration: "0.8s",
    cost: "$0.001",
    status: "Completed",
    startedAt: "10:22 AM",
  },
  {
    user: "jordan.lee@example.com",
    type: "assistant",
    duration: "—",
    cost: "—",
    status: "Cancelled",
    startedAt: "10:18 AM",
  },
]

const trendsData = [
  { date: "W1", threadsFailed: 12, recurringFailed: 8, backlog: 45, avgQueueTime: 2.1 },
  { date: "W2", threadsFailed: 8, recurringFailed: 12, backlog: 62, avgQueueTime: 2.8 },
  { date: "W3", threadsFailed: 15, recurringFailed: 6, backlog: 38, avgQueueTime: 1.9 },
  { date: "W4", threadsFailed: 5, recurringFailed: 8, backlog: 52, avgQueueTime: 2.4 },
]

const jobCosts = [
  { type: "Recurrences", cost: 45.2, percentage: 28, trend: "up" },
  { type: "Notifications", cost: 22.4, percentage: 14, trend: "down" },
  { type: "AI Processing", cost: 68.5, percentage: 42, trend: "up" },
  { type: "Exports", cost: 26.1, percentage: 16, trend: "stable" },
]

export function OperationsPage() {
  const totalUsersImpacted = queuesData.reduce((sum, q) => sum + q.usersImpacted, 0)
  const totalCost = jobCosts.reduce((sum, j) => sum + j.cost, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard title="Jobs processed" value="12,458" subtitle="Last 24h" icon={Cpu} />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Failed jobs"
            value="23"
            subtitle="Last 24h"
            badge={{ label: "0.18%", variant: "warning" }}
            icon={XCircle}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="p99 Latency"
            value="342ms"
            subtitle="Backend response"
            badge={{ label: "OK", variant: "success" }}
            icon={Server}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Rate Limits"
            value="12"
            subtitle="Throttled (24h)"
            trend={{ value: 25, direction: "down" }}
            icon={Zap}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Users impacted"
            value={totalUsersImpacted.toString()}
            subtitle="By failures (24h)"
            icon={Users}
            badge={{ label: "Critical", variant: "destructive" }}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard title="Avg queue time" value="2.4s" subtitle="Last 24h" icon={Timer} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <KpiCard title="Failed recurring" value="8" subtitle="Last 24h" icon={AlertTriangle} />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <KpiCard title="Threads with errors" value="5" subtitle="Last 24h" icon={AlertTriangle} />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <KpiCard
            title="p95 Latency"
            value="142ms"
            subtitle="Backend response"
            badge={{ label: "Good", variant: "success" }}
            icon={Server}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <KpiCard
            title="Throttling Events"
            value="3"
            subtitle="API rate-limit hits (1h)"
            trend={{ value: 40, direction: "down" }}
            icon={Zap}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Job costs (24h)</CardTitle>
              <Badge variant="outline" className="text-xs">
                ${totalCost.toFixed(2)} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {jobCosts.map((job, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: `oklch(0.${55 + i * 10} 0.2 ${200 + i * 40})` }}
                    />
                    <span className="text-sm">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono">${job.cost.toFixed(2)}</span>
                    <Badge variant="outline" className="text-xs w-12 justify-center">
                      {job.percentage}%
                    </Badge>
                    {job.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-destructive" />
                    ) : job.trend === "down" ? (
                      <TrendingDown className="h-3 w-3 text-success" />
                    ) : (
                      <span className="h-3 w-3 text-muted-foreground">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trends (last 4 weeks)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
                  <XAxis dataKey="date" stroke="oklch(0.5 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.5 0 0)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="threadsFailed"
                    name="Threads failed"
                    stroke="oklch(0.55 0.22 27)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="recurringFailed"
                    name="Recurring failed"
                    stroke="oklch(0.75 0.15 80)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="backlog"
                    name="Backlog"
                    stroke="oklch(0.55 0.2 250)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queues & Jobs - Enhanced with cost and users impacted */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Queues & jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Queue</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Waiting</TableHead>
                <TableHead>Failed (24h)</TableHead>
                <TableHead>Users impacted</TableHead>
                <TableHead>Avg time</TableHead>
                <TableHead>Cost (24h)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queuesData.map((q, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-sm">{q.name}</TableCell>
                  <TableCell>{q.active}</TableCell>
                  <TableCell>{q.waiting}</TableCell>
                  <TableCell>
                    <span className={q.failed > 0 ? "text-destructive" : ""}>{q.failed}</span>
                  </TableCell>
                  <TableCell>
                    {q.usersImpacted > 0 ? (
                      <Badge
                        variant="outline"
                        className="bg-destructive/10 text-destructive border-destructive/20 text-xs"
                      >
                        {q.usersImpacted}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell>{q.avgTime}</TableCell>
                  <TableCell className="font-mono text-sm">${q.cost.toFixed(2)}</TableCell>
                  <TableCell>
                    <QueueStatus status={q.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recurring Runs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent recurring executions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attempts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recurringRuns.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{r.user}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell className="text-muted-foreground">{r.lastRun}</TableCell>
                  <TableCell>
                    <RunStatus status={r.status} />
                  </TableCell>
                  <TableCell>{r.attempts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Threads */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent AI threads</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Thread type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Est. cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Started at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aiThreads.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{t.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{t.duration}</TableCell>
                  <TableCell className="font-mono text-sm">{t.cost}</TableCell>
                  <TableCell>
                    <ThreadStatus status={t.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.startedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function QueueStatus({ status }: { status: string }) {
  if (status === "healthy") {
    return (
      <div className="flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-success" />
        <span className="text-xs text-success">Healthy</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-2 w-2 rounded-full bg-warning" />
      <span className="text-xs text-warning">Warning</span>
    </div>
  )
}

function RunStatus({ status }: { status: string }) {
  const styles: Record<string, { icon: React.ElementType; className: string }> = {
    Success: { icon: CheckCircle, className: "text-success" },
    Failed: { icon: XCircle, className: "text-destructive" },
    Skipped: { icon: Clock, className: "text-muted-foreground" },
  }
  const config = styles[status]
  const Icon = config.icon
  return (
    <div className="flex items-center gap-1.5">
      <Icon className={`h-3.5 w-3.5 ${config.className}`} />
      <span className={`text-xs ${config.className}`}>{status}</span>
    </div>
  )
}

function ThreadStatus({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed: "bg-success/10 text-success",
    Error: "bg-destructive/10 text-destructive",
    Cancelled: "bg-muted text-muted-foreground",
  }
  return (
    <Badge variant="outline" className={`text-xs ${styles[status]}`}>
      {status}
    </Badge>
  )
}
