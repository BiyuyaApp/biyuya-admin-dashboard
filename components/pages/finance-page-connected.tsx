"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  analyticsService,
  StripeMRR,
  StripeSubscriptionMetrics,
  StripeRevenueMetrics,
  MercuryRunway,
  MercurySummary
} from "@/lib/analytics-service"

export function FinancePageConnected() {
  const [mrrData, setMrrData] = useState<StripeMRR | null>(null)
  const [subscriptions, setSubscriptions] = useState<StripeSubscriptionMetrics | null>(null)
  const [revenue, setRevenue] = useState<StripeRevenueMetrics | null>(null)
  const [mercuryRunway, setMercuryRunway] = useState<MercuryRunway | null>(null)
  const [mercurySummary, setMercurySummary] = useState<MercurySummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        // Calculate date range (last 30 days)
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 30)

        const [mrrResponse, subscriptionsResponse, revenueResponse, runwayResponse, summaryResponse] = await Promise.all([
          analyticsService.getStripeMRR(),
          analyticsService.getStripeSubscriptions(),
          analyticsService.getStripeRevenue(
            startDate.toISOString().split('T')[0],
            endDate.toISOString().split('T')[0]
          ),
          analyticsService.getMercuryRunway(),
          analyticsService.getMercurySummary(),
        ])

        setMrrData(mrrResponse)
        setSubscriptions(subscriptionsResponse)
        setRevenue(revenueResponse)
        setMercuryRunway(runwayResponse)
        setMercurySummary(summaryResponse)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load finance data')
        console.error('Error fetching finance data:', err)
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
          <p className="text-muted-foreground">Loading finance data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading finance data</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  // Calculate ARR (Annual Recurring Revenue)
  const arr = mrrData ? mrrData.mrr * 12 : 0

  // Calculate ARPU (Average Revenue Per User)
  const arpu = subscriptions?.activeSubscriptions
    ? (mrrData?.mrr || 0) / subscriptions.activeSubscriptions
    : 0

  // Calculate churn rate display value
  const churnRateDisplay = subscriptions?.churnRate || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Finance</h1>
        <p className="text-muted-foreground">Revenue, subscriptions (Stripe) and cash flow tracking (Mercury)</p>
      </div>

      {/* Revenue & Subscription Metrics */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Revenue & Subscriptions</h2>

        {/* KPI Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">MRR (Monthly Recurring Revenue)</p>
            <p className="mt-1 text-2xl font-bold">${mrrData?.mrr.toFixed(2) || '0.00'}</p>
            <p className="mt-2 text-xs text-muted-foreground">Real-time from Stripe</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">ARR (Annual Recurring Revenue)</p>
            <p className="mt-1 text-2xl font-bold">${arr.toFixed(2)}</p>
            <p className="mt-2 text-xs text-muted-foreground">MRR × 12</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Active Subscriptions</p>
            <p className="mt-1 text-2xl font-bold">{subscriptions?.activeSubscriptions || 0}</p>
            <p className="mt-2 text-xs text-green-600">
              {subscriptions?.newThisMonth || 0} new this month
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">ARPU (Avg Revenue Per User)</p>
            <p className="mt-1 text-2xl font-bold">${arpu.toFixed(2)}</p>
            <p className="mt-2 text-xs text-muted-foreground">MRR / Active Subs</p>
          </Card>
        </div>

        {/* Subscription Health */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">New Subscriptions (This Month)</p>
            <p className="mt-1 text-2xl font-bold">{subscriptions?.newThisMonth || 0}</p>
            <p className="mt-2 text-xs text-muted-foreground">New paying customers</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Churned Subscriptions (This Month)</p>
            <p className="mt-1 text-2xl font-bold">{subscriptions?.churnedThisMonth || 0}</p>
            <p className="mt-2 text-xs text-muted-foreground">Canceled subscriptions</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Churn Rate</p>
            <p className="mt-1 text-2xl font-bold">{churnRateDisplay.toFixed(2)}%</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {churnRateDisplay === 0 ? (
                <span className="text-green-600">No churn this month! 🎉</span>
              ) : churnRateDisplay < 5 ? (
                <span className="text-green-600">Healthy churn rate</span>
              ) : (
                <span className="text-yellow-600">Monitor churn</span>
              )}
            </p>
          </Card>
        </div>
      </div>

      {/* Revenue & Payments (Last 30 Days) */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Revenue & Payments (Last 30 Days)</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="mt-1 text-2xl font-bold">${revenue?.totalRevenue.toFixed(2) || '0.00'}</p>
            <p className="mt-2 text-xs text-muted-foreground">Last 30 days</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Successful Payments</p>
            <p className="mt-1 text-2xl font-bold">{revenue?.successfulPayments || 0}</p>
            <p className="mt-2 text-xs text-green-600">Completed transactions</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Failed Payments</p>
            <p className="mt-1 text-2xl font-bold">{revenue?.failedPayments || 0}</p>
            <p className="mt-2 text-xs text-destructive">Needs attention</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Payment Failure Rate</p>
            <p className="mt-1 text-2xl font-bold">{revenue?.failureRate.toFixed(2) || '0.00'}%</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {(revenue?.failureRate || 0) === 0 ? (
                <span className="text-green-600">Perfect success rate! 🎉</span>
              ) : (revenue?.failureRate || 0) < 2 ? (
                <span className="text-green-600">Excellent</span>
              ) : (
                <span className="text-yellow-600">Monitor payment failures</span>
              )}
            </p>
          </Card>
        </div>
      </div>

      {/* Cash Flow & Runway (Mercury) */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Cash Flow & Runway (Mercury Bank)</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Cash Balance</p>
            <p className="mt-1 text-2xl font-bold">${mercurySummary?.totalBalance.toFixed(2) || '0.00'}</p>
            <p className="mt-2 text-xs text-muted-foreground">All Mercury accounts</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Monthly Burn Rate</p>
            <p className="mt-1 text-2xl font-bold">${mercurySummary?.monthlyBurn.toFixed(2) || '0.00'}</p>
            <p className="mt-2 text-xs text-muted-foreground">Based on last 30 days</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Runway</p>
            <p className="mt-1 text-2xl font-bold">
              {mercurySummary?.runwayMonths !== null
                ? `${mercurySummary.runwayMonths.toFixed(1)} months`
                : 'Infinite ∞'
              }
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {mercurySummary?.runwayMonths === null ? (
                <span className="text-green-600">Positive cash flow! 🎉</span>
              ) : mercurySummary.runwayMonths >= 12 ? (
                <span className="text-green-600">Healthy runway</span>
              ) : mercurySummary.runwayMonths >= 6 ? (
                <span className="text-yellow-600">Monitor runway</span>
              ) : (
                <span className="text-red-600">⚠️ Low runway!</span>
              )}
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Net Cash Flow (Last Month)</p>
            <p className={`mt-1 text-2xl font-bold ${
              (mercurySummary?.lastMonthCashFlow.netCashFlow || 0) >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {(mercurySummary?.lastMonthCashFlow.netCashFlow || 0) >= 0 ? '+' : ''}
              ${mercurySummary?.lastMonthCashFlow.netCashFlow.toFixed(2) || '0.00'}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Inflows - Outflows
            </p>
          </Card>
        </div>

        {/* Cash Flow Breakdown */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Inflows (Last Month)</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              +${mercurySummary?.lastMonthCashFlow.inflows.toFixed(2) || '0.00'}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Money received</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Outflows (Last Month)</p>
            <p className="mt-1 text-2xl font-bold text-red-600">
              -${mercurySummary?.lastMonthCashFlow.outflows.toFixed(2) || '0.00'}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Money spent</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Projected Zero Date</p>
            <p className="mt-1 text-2xl font-bold">
              {mercuryRunway?.projectedZeroDate
                ? new Date(mercuryRunway.projectedZeroDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'Never'
              }
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {mercuryRunway?.projectedZeroDate ? (
                <span className="text-yellow-600">If burn continues</span>
              ) : (
                <span className="text-green-600">Cash positive</span>
              )}
            </p>
          </Card>
        </div>
      </div>

      {/* Data Source Notice */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
          📊 Data Sources
        </p>
        <p className="mt-1 text-xs text-blue-800 dark:text-blue-300">
          <strong>Stripe:</strong> Test environment data (switch to production key for real customer data)<br/>
          <strong>Mercury:</strong> Production banking data from connected accounts
        </p>
      </Card>
    </div>
  )
}
