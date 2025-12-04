"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { analyticsService, FeatureAdoption } from "@/lib/analytics-service"

export function ProductUsagePageConnected() {
  const [features, setFeatures] = useState<FeatureAdoption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeatures() {
      try {
        setLoading(true)
        setError(null)

        const response = await analyticsService.getFeatureAdoption()
        setFeatures(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load feature adoption data')
        console.error('Error fetching features:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatures()
  }, [])

  const getAdoptionBadge = (rate: number) => {
    if (rate >= 75) return { label: "High", variant: "default" as const, color: "text-green-600" }
    if (rate >= 50) return { label: "Good", variant: "secondary" as const, color: "text-blue-600" }
    if (rate >= 25) return { label: "Medium", variant: "secondary" as const, color: "text-yellow-600" }
    return { label: "Low", variant: "outline" as const, color: "text-red-600" }
  }

  const formatFeatureName = (name: string) => {
    return name
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading feature adoption data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading feature adoption data</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  const highAdoptionFeatures = features.filter((f) => f.adoptionRate >= 75).length
  const mediumAdoptionFeatures = features.filter((f) => f.adoptionRate >= 25 && f.adoptionRate < 75).length
  const lowAdoptionFeatures = features.filter((f) => f.adoptionRate < 25).length
  const totalUsages = features.reduce((sum, f) => sum + f.totalUsages, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Product Usage</h1>
        <p className="text-muted-foreground">Feature adoption rates and usage statistics</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Features</p>
          <p className="text-2xl font-bold">{features.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">Tracked features</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">High Adoption</p>
          <p className="text-2xl font-bold text-green-600">{highAdoptionFeatures}</p>
          <p className="mt-2 text-xs text-muted-foreground">≥ 75% users</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Medium Adoption</p>
          <p className="text-2xl font-bold text-yellow-600">{mediumAdoptionFeatures}</p>
          <p className="mt-2 text-xs text-muted-foreground">25-75% users</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Usages</p>
          <p className="text-2xl font-bold">{totalUsages.toLocaleString()}</p>
          <p className="mt-2 text-xs text-muted-foreground">All features combined</p>
        </Card>
      </div>

      {/* Features Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feature Adoption Rates</CardTitle>
        </CardHeader>
        <CardContent>
          {features.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">No feature data yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Feature adoption data will appear here as users start using the app.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Features are tracked automatically when users interact with them.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Adoption Rate</TableHead>
                  <TableHead>Unique Users</TableHead>
                  <TableHead>Total Usages</TableHead>
                  <TableHead>Avg Uses / User</TableHead>
                  <TableHead>First Used</TableHead>
                  <TableHead>Last Used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature, index) => {
                  const badge = getAdoptionBadge(feature.adoptionRate)

                  return (
                    <TableRow key={feature.featureName}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formatFeatureName(feature.featureName)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${badge.color}`}>
                            {feature.adoptionRate}%
                          </span>
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">{feature.uniqueUsers}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono">{feature.totalUsages.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono">{feature.avgUsagesPerUser}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(feature.firstUsedAt)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(feature.lastUsedAt)}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Info Notice */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
          📊 Feature Usage Tracking
        </p>
        <p className="mt-1 text-xs text-blue-800 dark:text-blue-300">
          {features.length === 0 ? (
            <>
              <strong>No data yet:</strong> Feature usage is tracked automatically. Data will appear as users interact with features.
              The system records first use, last use, and usage counts for each feature per user.
            </>
          ) : (
            <>
              <strong>Real-time data:</strong> Showing feature adoption rates calculated from the <code>user_features</code> table.
              Adoption rate = (unique users who used feature / total users) × 100%.
            </>
          )}
        </p>
      </Card>
    </div>
  )
}
