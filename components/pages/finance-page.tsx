"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type FinanceTab = "revenue" | "cash" | "bridge"

const revenueData = [
  { month: "Jan", mrr: 12500, arr: 150000, newMRR: 2500, churnedMRR: -800 },
  { month: "Feb", mrr: 15200, arr: 182400, newMRR: 3500, churnedMRR: -800 },
  { month: "Mar", mrr: 18900, arr: 226800, newMRR: 4200, churnedMRR: -1100 },
  { month: "Apr", mrr: 22400, arr: 268800, newMRR: 4500, churnedMRR: -1000 },
  { month: "May", mrr: 26800, arr: 321600, newMRR: 5200, churnedMRR: -900 },
  { month: "Jun", mrr: 31500, arr: 378000, newMRR: 5500, churnedMRR: -800 },
]

const cashData = [
  { month: "Jan", income: 12500, opex: 18000, cashBurn: -5500, runway: 8.2 },
  { month: "Feb", income: 15200, opex: 18500, cashBurn: -3300, runway: 12.1 },
  { month: "Mar", income: 18900, opex: 19200, cashBurn: -300, runway: 125.0 },
  { month: "Apr", income: 22400, opex: 19500, cashBurn: 2900, runway: "Positive" },
  { month: "May", income: 26800, opex: 20000, cashBurn: 6800, runway: "Positive" },
  { month: "Jun", income: 31500, opex: 20500, cashBurn: 11000, runway: "Positive" },
]

const bridgeData = [
  { segment: "Power Users", paidPercentage: 78, mrr: 18500, cac: 85, ltv: 2400 },
  { segment: "Casual Users", paidPercentage: 42, mrr: 8200, cac: 45, ltv: 950 },
  { segment: "Trials", paidPercentage: 0, mrr: 0, cac: 0, ltv: 0 },
  { segment: "Enterprise", paidPercentage: 95, mrr: 5300, cac: 200, ltv: 8500 },
]

export function FinancePage() {
  const [activeTab, setActiveTab] = useState<FinanceTab>("revenue")

  const tabs: { id: FinanceTab; label: string }[] = [
    { id: "revenue", label: "Revenue & Clientes" },
    { id: "cash", label: "Cash & Runway" },
    { id: "bridge", label: "Product-Business Bridge" },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-accent text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Revenue Tab */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">MRR Actual</p>
              <p className="mt-1 text-2xl font-bold">$31,500</p>
              <p className="mt-2 text-xs text-green-600">+19% vs May</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">ARR</p>
              <p className="mt-1 text-2xl font-bold">$378,000</p>
              <p className="mt-2 text-xs text-green-600">+19% vs May</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Active Customers</p>
              <p className="mt-1 text-2xl font-bold">342</p>
              <p className="mt-2 text-xs text-green-600">+8 new this month</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">ARPU</p>
              <p className="mt-1 text-2xl font-bold">$92.11</p>
              <p className="mt-2 text-xs text-green-600">+5% vs May</p>
            </Card>
          </div>

          {/* MRR Breakdown */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-sm font-semibold">MRR Composition</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>New MRR</span>
                    <span className="font-semibold text-green-600">$5,500</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded bg-green-200">
                    <div className="h-full w-2/3 rounded bg-green-600" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Churned MRR</span>
                    <span className="font-semibold text-red-600">-$800</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded bg-red-200">
                    <div className="h-full w-1/12 rounded bg-red-600" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Expansion MRR</span>
                    <span className="font-semibold text-blue-600">$1,200</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded bg-blue-200">
                    <div className="h-full w-1/4 rounded bg-blue-600" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-semibold">Conversion & Health</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Trial → Paid Conversion</span>
                  <span className="font-semibold">24.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Failed Payments (recoverable)</span>
                  <span className="font-semibold text-orange-600">12 / 18</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Failed Payments (irrecoverable)</span>
                  <span className="font-semibold text-red-600">6</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Refunds (last 30d)</span>
                  <span className="font-semibold">$2,100 (3 requests)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dunning Recovery Rate</span>
                  <span className="font-semibold text-green-600">67%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* MRR Trend Chart */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold">MRR Trend & Components</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-sidebar-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="mrr" stroke="var(--color-accent)" strokeWidth={2} name="MRR" />
                <Line type="monotone" dataKey="newMRR" stroke="var(--color-success)" strokeWidth={2} name="New MRR" />
                <Line
                  type="monotone"
                  dataKey="churnedMRR"
                  stroke="var(--color-error)"
                  strokeWidth={2}
                  name="Churned MRR"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Plan Breakdown */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-4">MRR by Plan</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Starter</p>
                <p className="mt-1 text-xl font-bold">$8,400</p>
                <p className="mt-1 text-xs text-muted-foreground">124 customers</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Pro</p>
                <p className="mt-1 text-xl font-bold">$16,800</p>
                <p className="mt-1 text-xs text-muted-foreground">168 customers</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Enterprise</p>
                <p className="mt-1 text-xl font-bold">$6,300</p>
                <p className="mt-1 text-xs text-muted-foreground">50 customers</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Cash & Runway Tab */}
      {activeTab === "cash" && (
        <div className="space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Cash Available</p>
              <p className="mt-1 text-2xl font-bold">$287,400</p>
              <p className="mt-2 text-xs text-green-600">+11k vs May</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Monthly Burn</p>
              <p className="mt-1 text-2xl font-bold">-$3,300</p>
              <p className="mt-2 text-xs text-orange-600">Improving (was -5.5k)</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Runway</p>
              <p className="mt-1 text-2xl font-bold">Positive ✓</p>
              <p className="mt-2 text-xs text-green-600">Profitable since Apr</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Investor Cash</p>
              <p className="mt-1 text-2xl font-bold">$250,000</p>
              <p className="mt-2 text-xs text-muted-foreground">Seed round</p>
            </Card>
          </div>

          {/* Income vs OpEx */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold">Income vs OpEx Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-sidebar-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="income" fill="var(--color-success)" name="Stripe Revenue" />
                <Bar dataKey="opex" fill="var(--color-error)" name="OpEx" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Expense Breakdown */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-sm font-semibold">Expense Distribution</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Infrastructure</span>
                  <span className="font-semibold">$6,800 (34%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Salaries</span>
                  <span className="font-semibold">$8,500 (42%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Marketing</span>
                  <span className="font-semibold">$2,200 (11%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Legal & Compliance</span>
                  <span className="font-semibold">$1,100 (5%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Other</span>
                  <span className="font-semibold">$900 (8%)</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-semibold">Runway Projection</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Current Trajectory</p>
                  <p className="mt-1 text-lg font-semibold text-green-600">Cash Positive (Month 4)</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <p className="text-xs font-semibold text-green-900">Reached profitability in April</p>
                  <p className="text-xs text-green-700 mt-1">Revenue now exceeds all operational costs</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">At current burn rate (if negative)</p>
                  <p className="mt-1 text-sm">Would have ~8.2 months of runway</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Product-Business Bridge Tab */}
      {activeTab === "bridge" && (
        <div className="space-y-6">
          {/* Global Metrics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">% Paid Users</p>
              <p className="mt-1 text-2xl font-bold">54.2%</p>
              <p className="mt-2 text-xs text-green-600">+8.3% vs May</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Paid Retention D30</p>
              <p className="mt-1 text-2xl font-bold">78.4%</p>
              <p className="mt-2 text-xs text-green-600">vs 62% free users</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Avg Cost per User</p>
              <p className="mt-1 text-2xl font-bold">$58.30</p>
              <p className="mt-2 text-xs text-muted-foreground">Including AI costs</p>
            </Card>
          </div>

          {/* Segment Analysis */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-4">User Segment Economics</h3>
            <div className="space-y-4">
              {bridgeData.map((segment, idx) => (
                <div key={idx} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{segment.segment}</p>
                      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-xs text-muted-foreground">% Paid</p>
                          <p className="mt-1 text-sm font-semibold">{segment.paidPercentage}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Segment MRR</p>
                          <p className="mt-1 text-sm font-semibold">${segment.mrr.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">CAC</p>
                          <p className="mt-1 text-sm font-semibold">${segment.cac}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">LTV</p>
                          <p className="mt-1 text-sm font-semibold">${segment.ltv.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Feature Cost Breakdown */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-4">Cost per Feature</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-semibold">AI Features</p>
                <p className="mt-2 text-lg font-bold text-accent">$18.50</p>
                <p className="text-xs text-muted-foreground mt-1">per user/month</p>
                <p className="text-xs text-orange-600 mt-2">48% of cost base</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-semibold">Recurring Jobs</p>
                <p className="mt-2 text-lg font-bold">$6.20</p>
                <p className="text-xs text-muted-foreground mt-1">per user/month</p>
                <p className="text-xs text-blue-600 mt-2">16% of cost base</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-semibold">Notifications</p>
                <p className="mt-2 text-lg font-bold">$4.80</p>
                <p className="text-xs text-muted-foreground mt-1">per user/month</p>
                <p className="text-xs text-purple-600 mt-2">12% of cost base</p>
              </div>
            </div>
          </Card>

          {/* Revenue per Feature */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-4">Revenue Concentration</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Core Product (Transactions)</span>
                  <span className="font-semibold">62%</span>
                </div>
                <div className="h-2 w-full rounded bg-gray-200">
                  <div className="h-full w-[62%] rounded bg-accent" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AI Add-on</span>
                  <span className="font-semibold">28%</span>
                </div>
                <div className="h-2 w-full rounded bg-gray-200">
                  <div className="h-full w-[28%] rounded bg-orange-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Premium Add-ons</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="h-2 w-full rounded bg-gray-200">
                  <div className="h-full w-[10%] rounded bg-blue-500" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
