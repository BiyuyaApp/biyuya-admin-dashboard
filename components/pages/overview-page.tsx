"use client"

import type React from "react"

import { KpiCard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Funnel,
  FunnelChart,
  LabelList,
  BarChart,
  Bar,
} from "recharts"
import {
  Repeat,
  Calendar,
  Timer,
  Star,
  AlertTriangle,
  Clock,
  Bug,
  Server,
  Users,
  Activity,
  Target,
  UserMinus,
  UserCheck,
} from "lucide-react"

const newUsersData = [
  { date: "Mon", newUsers: 42, firstTransaction: 28, activationRate: 67 },
  { date: "Tue", newUsers: 38, firstTransaction: 25, activationRate: 66 },
  { date: "Wed", newUsers: 55, firstTransaction: 38, activationRate: 69 },
  { date: "Thu", newUsers: 48, firstTransaction: 32, activationRate: 67 },
  { date: "Fri", newUsers: 62, firstTransaction: 45, activationRate: 73 },
  { date: "Sat", newUsers: 35, firstTransaction: 22, activationRate: 63 },
  { date: "Sun", newUsers: 30, firstTransaction: 18, activationRate: 60 },
]

const dauWauData = [
  { date: "Mon", dau: 1250, wau: 4800, mau: 12500 },
  { date: "Tue", dau: 1320, wau: 4850, mau: 12600 },
  { date: "Wed", dau: 1180, wau: 4900, mau: 12700 },
  { date: "Thu", dau: 1450, wau: 5100, mau: 12800 },
  { date: "Fri", dau: 1380, wau: 5200, mau: 12900 },
  { date: "Sat", dau: 980, wau: 5100, mau: 13000 },
  { date: "Sun", dau: 850, wau: 5000, mau: 13100 },
]

const funnelData = [
  { name: "Sign up", value: 1000, fill: "oklch(0.55 0.2 250)", dropOff: 0 },
  { name: "Started onboarding", value: 820, fill: "oklch(0.6 0.18 250)", dropOff: 18 },
  { name: "Profile questions", value: 680, fill: "oklch(0.65 0.16 250)", dropOff: 17 },
  { name: "Selected categories", value: 520, fill: "oklch(0.7 0.14 250)", dropOff: 24 },
  { name: "First account", value: 380, fill: "oklch(0.75 0.12 250)", dropOff: 27 },
  { name: "First transaction", value: 290, fill: "oklch(0.8 0.1 250)", dropOff: 24 },
]

const attentionItems = [
  {
    type: "Activation",
    description: "23 users sin categorías seleccionadas",
    severity: "high",
    age: "Ongoing",
    action: "Ver usuarios",
    count: 23,
  },
  {
    type: "Activation",
    description: "15 usuarios con 0 ingresos cargados",
    severity: "high",
    age: "Ongoing",
    action: "Ver usuarios",
    count: 15,
  },
  {
    type: "AI",
    description: "8 usuarios con >5 correcciones de IA esta semana",
    severity: "medium",
    age: "This week",
    action: "Ver usuarios",
    count: 8,
  },
  {
    type: "Retention",
    description: "12 usuarios inactivos 7+ días luego de activarse",
    severity: "high",
    age: "7+ days",
    action: "Ver usuarios",
    count: 12,
  },
  {
    type: "Job",
    description: "5 usuarios con recurrencias fallidas",
    severity: "medium",
    age: "24h",
    action: "Ver usuarios",
    count: 5,
  },
  {
    type: "Onboarding",
    description: "9 usuarios stuck en onboarding > 7 días",
    severity: "low",
    age: "7+ days",
    action: "Ver usuarios",
    count: 9,
  },
  {
    type: "Error",
    description: "AI categorizer timeout errors spike",
    severity: "high",
    age: "15m ago",
    action: "Ver logs",
    count: 3,
  },
]

const retentionData = [
  { cohort: "Nov W1", d1: 45, d7: 28, d30: 18 },
  { cohort: "Nov W2", d1: 42, d7: 25, d30: 16 },
  { cohort: "Nov W3", d1: 48, d7: 30, d30: 20 },
  { cohort: "Nov W4", d1: 44, d7: 26, d30: null },
]

const returningUsersData = [
  { date: "Mon", returning7d: 320, returning30d: 580 },
  { date: "Tue", returning7d: 345, returning30d: 612 },
  { date: "Wed", returning7d: 298, returning30d: 545 },
  { date: "Thu", returning7d: 378, returning30d: 640 },
  { date: "Fri", returning7d: 356, returning30d: 625 },
  { date: "Sat", returning7d: 245, returning30d: 480 },
  { date: "Sun", returning7d: 210, returning30d: 420 },
]

const costPerFeatureData = [
  { feature: "AI Categorizer", cost: 245.8, percentage: 48 },
  { feature: "AI Assistant", cost: 142.3, percentage: 28 },
  { feature: "Notifications", cost: 68.5, percentage: 13 },
  { feature: "Recurring Jobs", cost: 56.2, percentage: 11 },
]

export function OverviewPage() {
  const maxDropOff = funnelData.reduce((max, step) => (step.dropOff > max.dropOff ? step : max), funnelData[0])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Retention D1"
            value="42%"
            subtitle="Vuelven día siguiente"
            trend={{ value: 3, direction: "up" }}
            icon={Repeat}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Retention D7"
            value="24%"
            subtitle="Activo 1 semana después"
            trend={{ value: 1, direction: "up" }}
            icon={Calendar}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Retention D30"
            value="16%"
            subtitle="Activo 1 mes después"
            trend={{ value: 2, direction: "down" }}
            icon={Calendar}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="DAU/WAU"
            value="0.26"
            subtitle="Stickiness ratio"
            trend={{ value: 4, direction: "up" }}
            icon={Activity}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="TTFV"
            value="47min"
            subtitle="Time to First Value"
            trend={{ value: 8, direction: "down" }}
            icon={Timer}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Power Users"
            value="18%"
            subtitle="3+ días/semana"
            trend={{ value: 2, direction: "up" }}
            icon={Star}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Churn Rate"
            value="8.2%"
            subtitle="Month-over-month"
            trend={{ value: 1.5, direction: "down" }}
            icon={UserMinus}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Returning (7d)"
            value="2,152"
            subtitle="Usuarios que volvieron"
            trend={{ value: 5, direction: "up" }}
            icon={UserCheck}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="Returning (30d)"
            value="4,380"
            subtitle="Usuarios que volvieron"
            trend={{ value: 3, direction: "up" }}
            icon={UserCheck}
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
            subtitle="Throttled requests (24h)"
            badge={{ label: "Low", variant: "default" }}
            icon={AlertTriangle}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <KpiCard
            title="5 Txn Activation"
            value="34%"
            subtitle="Completan 5+ txns"
            trend={{ value: 2, direction: "up" }}
            icon={Target}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <KpiCard
            title="Engagement Score"
            value="62"
            subtitle="Promedio (0-100)"
            trend={{ value: 4, direction: "up" }}
            icon={Activity}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Cost per Feature (24h)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1.5">
                {costPerFeatureData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground truncate">{item.feature}</span>
                    <span className="font-mono">${item.cost.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Returning Users Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={returningUsersData}>
                    <XAxis dataKey="date" stroke="oklch(0.5 0 0)" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.14 0 0)",
                        border: "1px solid oklch(0.22 0 0)",
                        borderRadius: "6px",
                        fontSize: "11px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="returning7d"
                      name="7d"
                      stroke="oklch(0.55 0.2 250)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="returning30d"
                      name="30d"
                      stroke="oklch(0.7 0.15 180)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New users vs First transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={newUsersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
                  <XAxis dataKey="date" stroke="oklch(0.5 0 0)" fontSize={12} />
                  <YAxis yAxisId="left" stroke="oklch(0.5 0 0)" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="oklch(0.5 0 0)" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="newUsers"
                    name="New users"
                    stroke="oklch(0.55 0.2 250)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="firstTransaction"
                    name="First transaction"
                    stroke="oklch(0.7 0.15 180)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="activationRate"
                    name="% Activation"
                    stroke="oklch(0.75 0.15 80)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Retention by Cohort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={retentionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" horizontal={false} />
                  <XAxis type="number" stroke="oklch(0.5 0 0)" fontSize={12} domain={[0, 50]} unit="%" />
                  <YAxis type="category" dataKey="cohort" stroke="oklch(0.5 0 0)" fontSize={11} width={70} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      borderRadius: "6px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                  <Legend />
                  <Bar dataKey="d1" name="D1" fill="oklch(0.55 0.2 250)" radius={[0, 2, 2, 0]} />
                  <Bar dataKey="d7" name="D7" fill="oklch(0.65 0.17 220)" radius={[0, 2, 2, 0]} />
                  <Bar dataKey="d30" name="D30" fill="oklch(0.75 0.14 190)" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel & System Health */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Onboarding funnel</CardTitle>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
              Max drop: {maxDropOff.name} ({maxDropOff.dropOff}%)
            </Badge>
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
                  <Funnel dataKey="value" data={funnelData} isAnimationActive>
                    <LabelList position="right" fill="oklch(0.7 0 0)" stroke="none" fontSize={11} />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <HealthMetric icon={AlertTriangle} label="Failed jobs (24h)" value="3" status="warning" />
              <HealthMetric icon={Clock} label="Failed recurring (24h)" value="12" status="error" />
              <HealthMetric icon={Bug} label="Threads with errors" value="5" status="warning" />
              <HealthMetric icon={Server} label="p95 latency" value="142ms" status="success" />
              <HealthMetric icon={Server} label="p99 latency" value="342ms" status="success" />
              <HealthMetric icon={AlertTriangle} label="Rate-limit spikes (24h)" value="12" status="warning" />
              <div className="col-span-2">
                <div className="flex items-center gap-3 rounded-md bg-destructive/10 p-3">
                  <Users className="h-4 w-4 text-destructive" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Users affected (24h)</p>
                    <p className="text-sm font-semibold text-destructive">6 usuarios distintos</p>
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

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    Activation: "bg-info/10 text-info border-info/20",
    Retention: "bg-warning/10 text-warning border-warning/20",
    AI: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Job: "bg-muted text-muted-foreground border-border",
    Onboarding: "bg-success/10 text-success border-success/20",
    Error: "bg-destructive/10 text-destructive border-destructive/20",
    User: "bg-muted text-muted-foreground border-border",
  }
  return (
    <Badge variant="outline" className={`text-xs ${styles[type] || styles.User}`}>
      {type}
    </Badge>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  const variants: Record<string, string> = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-muted text-muted-foreground border-border",
  }
  return (
    <Badge variant="outline" className={`text-xs ${variants[severity]}`}>
      {severity}
    </Badge>
  )
}
