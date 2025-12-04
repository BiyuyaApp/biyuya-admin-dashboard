"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { analyticsService, UserListItem } from "@/lib/analytics-service"

export function UsersPageConnected() {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [segmentFilter, setSegmentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        setError(null)

        const response = await analyticsService.getUsersList({
          segment: segmentFilter as any,
          status: statusFilter as any,
        })

        setUsers(response)
        setFilteredUsers(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [segmentFilter, statusFilter])

  // Search filter
  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchTerm, users])

  const getHealthScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Healthy", variant: "default" as const, color: "text-green-600" }
    if (score >= 50) return { label: "OK", variant: "secondary" as const, color: "text-yellow-600" }
    return { label: "At Risk", variant: "destructive" as const, color: "text-red-600" }
  }

  const getActivityLevelBadge = (level: string) => {
    const levelMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      high: { label: "Daily", variant: "default" },
      medium: { label: "Weekly", variant: "secondary" },
      low: { label: "Low", variant: "outline" },
    }
    return levelMap[level] || levelMap.low
  }

  const getOnboardingBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      Completed: { label: "Completed", variant: "default" },
      "In Progress": { label: "In Progress", variant: "secondary" },
      "Not Started": { label: "Not Started", variant: "outline" },
    }
    return statusMap[status] || { label: status, variant: "outline" }
  }

  const getInitials = (name: string) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
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
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading users</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">User list with health scores and onboarding status</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Healthy Users</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.healthScore >= 80).length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">At Risk</p>
          <p className="text-2xl font-bold text-yellow-600">
            {users.filter((u) => u.healthScore < 80 && u.healthScore >= 50).length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Critical</p>
          <p className="text-2xl font-bold text-red-600">
            {users.filter((u) => u.healthScore < 50).length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={segmentFilter} onValueChange={setSegmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All segments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All segments</SelectItem>
                <SelectItem value="new">New users</SelectItem>
                <SelectItem value="at-risk">At risk</SelectItem>
                <SelectItem value="power">Power users</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="incomplete">Incomplete onboarding</SelectItem>
                <SelectItem value="no-categories">No categories</SelectItem>
                <SelectItem value="no-transactions">No transactions</SelectItem>
                <SelectItem value="inactive-14d">Inactive 14d</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your filters</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Signup Date</TableHead>
                  <TableHead>Onboarding</TableHead>
                  <TableHead>First Transaction</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Health Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const healthBadge = getHealthScoreBadge(user.healthScore)
                  const activityBadge = getActivityLevelBadge(user.activityLevel)
                  const onboardingBadge = getOnboardingBadge(user.onboardingStatus)

                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(user.name || "")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name || "Unknown"}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{formatDate(user.signupDate.toString())}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={onboardingBadge.variant}>{onboardingBadge.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.firstTransaction ? "default" : "outline"}>
                          {user.firstTransaction ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={activityBadge.variant}>{activityBadge.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${healthBadge.color}`}>
                            {user.healthScore}
                          </span>
                          <Badge variant={healthBadge.variant} className="text-xs">
                            {healthBadge.label}
                          </Badge>
                        </div>
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
          📊 Real User Data
        </p>
        <p className="mt-1 text-xs text-blue-800 dark:text-blue-300">
          Showing real users from database with health scores, onboarding status, and activity levels calculated from actual user behavior.
        </p>
      </Card>
    </div>
  )
}
