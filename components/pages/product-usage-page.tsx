"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts"
import { KpiCard } from "@/components/ui/kpi-card"
import {
  RefreshCw,
  TrendingUp,
  Download,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  DollarSign,
  Brain,
  ShieldCheck,
} from "lucide-react"

const featureAdoptionData = [
  { name: "Recurring", adoption: 68 },
  { name: "Inflation", adoption: 45 },
  { name: "Shared accounts", adoption: 32 },
  { name: "Exports", adoption: 58 },
  { name: "AI assistant", adoption: 72 },
  { name: "PWA install", adoption: 28 },
]

const featureMetrics = [
  {
    name: "Recurring",
    users: 8520,
    sessions: 24500,
    medianEvents: 12,
    trend: "up",
    weeklyRetention: 78,
    monthlyRetention: 62,
    discoveryDay: 5,
    returnRate: 45,
  },
  {
    name: "Inflation view",
    users: 5640,
    sessions: 15200,
    medianEvents: 8,
    trend: "up",
    weeklyRetention: 42,
    monthlyRetention: 28,
    discoveryDay: 12,
    returnRate: 18,
  },
  {
    name: "AI assistant",
    users: 9020,
    sessions: 31000,
    medianEvents: 18,
    trend: "up",
    weeklyRetention: 85,
    monthlyRetention: 72,
    discoveryDay: 2,
    returnRate: 68,
  },
  {
    name: "Exports",
    users: 7280,
    sessions: 12400,
    medianEvents: 3,
    trend: "down",
    weeklyRetention: 25,
    monthlyRetention: 15,
    discoveryDay: 18,
    returnRate: 8,
  },
  {
    name: "Shared accounts",
    users: 4010,
    sessions: 8900,
    medianEvents: 6,
    trend: "up",
    weeklyRetention: 55,
    monthlyRetention: 42,
    discoveryDay: 21,
    returnRate: 32,
  },
]

const categoryUsageData = [
  { name: "Food & Dining", count: 45200 },
  { name: "Transportation", count: 32100 },
  { name: "Shopping", count: 28900 },
  { name: "Bills & Utilities", count: 24500 },
  { name: "Entertainment", count: 18200 },
]

const problematicCategories = [
  { name: "Entertainment", aiOverridden: 28, avgAmount: 45, usersAffected: 1240, dropOffRate: 12 },
  { name: "Shopping", aiOverridden: 22, avgAmount: 120, usersAffected: 2100, dropOffRate: 8 },
  { name: "Health & Fitness", aiOverridden: 18, avgAmount: 85, usersAffected: 890, dropOffRate: 15 },
  { name: "Gifts & Donations", aiOverridden: 35, avgAmount: 200, usersAffected: 420, dropOffRate: 22 },
  { name: "Miscellaneous", aiOverridden: 45, avgAmount: 75, usersAffected: 1800, dropOffRate: 18 },
]

const categoryOpportunities = {
  unused: ["Pet Insurance", "Gambling", "Tobacco", "Fines & Fees", "Legal Services"],
  overused: ["Food & Dining", "Shopping", "Transportation", "Bills", "Entertainment"],
  confusing: ["Miscellaneous", "Other Income", "Transfers", "Adjustments", "Fees"],
}

const aiSuggestionsData = [
  { date: "Mon", accepted: 820, rejected: 180 },
  { date: "Tue", accepted: 910, rejected: 150 },
  { date: "Wed", accepted: 780, rejected: 220 },
  { date: "Thu", accepted: 950, rejected: 140 },
  { date: "Fri", accepted: 1020, rejected: 130 },
  { date: "Sat", accepted: 680, rejected: 95 },
  { date: "Sun", accepted: 520, rejected: 80 },
]

const aiCostData = [
  { type: "Categorizer", avgCostPerUser: 0.012, totalCost: 156.8 },
  { type: "Assistant", avgCostPerUser: 0.045, totalCost: 589.5 },
  { type: "Reports", avgCostPerUser: 0.028, totalCost: 366.8 },
]

const accuracyByAmount = [
  { range: "$0-$100", accuracy: 94, corrections: 245, trend: "up" },
  { range: "$100-$500", accuracy: 88, corrections: 420, trend: "down" },
  { range: "$500+", accuracy: 72, corrections: 180, trend: "down" },
]

const aiCategoryPerformance = [
  {
    category: "Food & Dining",
    suggestions: 4520,
    accepted: 4200,
    overridden: 320,
    rate: 93,
    weeklyTrend: -2,
    usersAffected: 850,
  },
  {
    category: "Shopping",
    suggestions: 3280,
    accepted: 2950,
    overridden: 330,
    rate: 90,
    weeklyTrend: 1,
    usersAffected: 720,
  },
  {
    category: "Transportation",
    suggestions: 2890,
    accepted: 2720,
    overridden: 170,
    rate: 94,
    weeklyTrend: 3,
    usersAffected: 380,
  },
  {
    category: "Entertainment",
    suggestions: 1820,
    accepted: 1540,
    overridden: 280,
    rate: 85,
    weeklyTrend: -5,
    usersAffected: 620,
  },
  {
    category: "Bills",
    suggestions: 2450,
    accepted: 2350,
    overridden: 100,
    rate: 96,
    weeklyTrend: 2,
    usersAffected: 210,
  },
]

export function ProductUsagePage() {
  return (
    <Tabs defaultValue="features" className="space-y-4">
      <TabsList>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="ai">AI</TabsTrigger>
      </TabsList>

      {/* Features Tab */}
      <TabsContent value="features" className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-4">
            <KpiCard
              title="% using Recurring"
              value="68%"
              subtitle="Active users"
              trend={{ value: 8, direction: "up" }}
              icon={RefreshCw}
            />
          </div>
          <div className="col-span-12 sm:col-span-4">
            <KpiCard
              title="% viewing Inflation"
              value="45%"
              subtitle="Active users"
              trend={{ value: 3, direction: "up" }}
              icon={TrendingUp}
            />
          </div>
          <div className="col-span-12 sm:col-span-4">
            <KpiCard
              title="% exporting data"
              value="58%"
              subtitle="Active users"
              trend={{ value: 2, direction: "down" }}
              icon={Download}
            />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feature adoption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureAdoptionData} layout="vertical">
                  <XAxis type="number" stroke="oklch(0.5 0 0)" fontSize={12} domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" stroke="oklch(0.5 0 0)" fontSize={12} width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      borderRadius: "6px",
                    }}
                    formatter={(value) => [`${value}%`, "Adoption"]}
                  />
                  <Bar dataKey="adoption" fill="oklch(0.55 0.2 250)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feature retention metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Weekly ret.</TableHead>
                  <TableHead>Monthly ret.</TableHead>
                  <TableHead>Discovery day</TableHead>
                  <TableHead>Return rate</TableHead>
                  <TableHead>7d trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureMetrics.map((f, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{f.name}</TableCell>
                    <TableCell>{f.users.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          f.weeklyRetention >= 50 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }
                      >
                        {f.weeklyRetention}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          f.monthlyRetention >= 40 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }
                      >
                        {f.monthlyRetention}%
                      </Badge>
                    </TableCell>
                    <TableCell>Day {f.discoveryDay}</TableCell>
                    <TableCell>{f.returnRate}%</TableCell>
                    <TableCell>
                      {f.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-destructive" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Categories Tab - Enhanced */}
      <TabsContent value="categories" className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <Card className="col-span-12 lg:col-span-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Most used categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryUsageData} layout="vertical">
                    <XAxis type="number" stroke="oklch(0.5 0 0)" fontSize={12} />
                    <YAxis type="category" dataKey="name" stroke="oklch(0.5 0 0)" fontSize={11} width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.14 0 0)",
                        border: "1px solid oklch(0.22 0 0)",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="count" fill="oklch(0.7 0.15 180)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-12 lg:col-span-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Simplification opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Almost no one uses</p>
                  <div className="flex flex-wrap gap-1">
                    {categoryOpportunities.unused.map((cat, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-muted">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Everyone uses</p>
                  <div className="flex flex-wrap gap-1">
                    {categoryOpportunities.overused.map((cat, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-success/10 text-success">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Generate confusion</p>
                  <div className="flex flex-wrap gap-1">
                    {categoryOpportunities.confusing.map((cat, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-warning/10 text-warning">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <CardTitle className="text-sm font-medium">Problematic categories</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>% AI overridden</TableHead>
                  <TableHead>Avg amount</TableHead>
                  <TableHead>Users affected</TableHead>
                  <TableHead>Drop-off rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {problematicCategories.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          c.aiOverridden > 25 ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                        }
                      >
                        {c.aiOverridden}%
                      </Badge>
                    </TableCell>
                    <TableCell>${c.avgAmount}</TableCell>
                    <TableCell>{c.usersAffected.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={c.dropOffRate > 15 ? "bg-destructive/10 text-destructive" : "bg-muted"}
                      >
                        {c.dropOffRate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* AI Tab - Enhanced */}
      <TabsContent value="ai" className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-3">
            <KpiCard
              title="AI accuracy"
              value="91%"
              subtitle="Accepted / suggested"
              trend={{ value: 2, direction: "up" }}
              icon={Brain}
            />
          </div>
          <div className="col-span-12 sm:col-span-3">
            <KpiCard
              title="Cost per user"
              value="$0.085"
              subtitle="Avg this period"
              trend={{ value: 5, direction: "down" }}
              icon={DollarSign}
            />
          </div>
          <div className="col-span-12 sm:col-span-3">
            <KpiCard
              title="Trusted AI rate"
              value="68%"
              subtitle="Stop correcting after 3 weeks"
              trend={{ value: 4, direction: "up" }}
              icon={ShieldCheck}
            />
          </div>
          <div className="col-span-12 sm:col-span-3">
            <KpiCard
              title="Threads with errors"
              value="8"
              subtitle="Last 7 days"
              badge={{ label: "Low", variant: "success" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Card className="col-span-12 lg:col-span-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">AI suggestions: accepted vs rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aiSuggestionsData}>
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
                      dataKey="accepted"
                      name="Accepted"
                      stroke="oklch(0.65 0.2 145)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="rejected"
                      name="Rejected"
                      stroke="oklch(0.55 0.22 27)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-12 lg:col-span-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">AI accuracy by transaction amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accuracyByAmount.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm w-24">{item.range}</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.accuracy >= 90 ? "bg-success" : item.accuracy >= 80 ? "bg-warning" : "bg-destructive"}`}
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono w-12">{item.accuracy}%</span>
                    <div className="flex items-center gap-1 w-20">
                      {item.trend === "up" ? (
                        <ArrowUp className="h-3 w-3 text-success" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-destructive" />
                      )}
                      <span className="text-xs text-muted-foreground">{item.corrections} corr.</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-md bg-warning/10 border border-warning/20">
                <p className="text-xs text-warning">High amounts ($500+) have 72% accuracy - financial risk area</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI cost breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {aiCostData.map((item, i) => (
                <div key={i} className="rounded-md bg-secondary p-4">
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                  <p className="text-xl font-semibold mt-1">${item.avgCostPerUser.toFixed(3)}</p>
                  <p className="text-xs text-muted-foreground mt-1">per user</p>
                  <p className="text-sm font-medium mt-2">${item.totalCost.toFixed(2)} total</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI performance by category</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Suggestions</TableHead>
                  <TableHead>Accepted</TableHead>
                  <TableHead>Overridden</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Weekly trend</TableHead>
                  <TableHead>Users affected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiCategoryPerformance.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{c.category}</TableCell>
                    <TableCell>{c.suggestions.toLocaleString()}</TableCell>
                    <TableCell>{c.accepted.toLocaleString()}</TableCell>
                    <TableCell>{c.overridden.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={c.rate >= 90 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}
                      >
                        {c.rate}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {c.weeklyTrend >= 0 ? (
                          <ArrowUp className="h-3 w-3 text-success" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-destructive" />
                        )}
                        <span className={`text-xs ${c.weeklyTrend >= 0 ? "text-success" : "text-destructive"}`}>
                          {c.weeklyTrend > 0 ? "+" : ""}
                          {c.weeklyTrend}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{c.usersAffected}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
