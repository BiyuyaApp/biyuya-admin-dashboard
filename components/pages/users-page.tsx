"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Search, X, UserPlus, LogIn, CreditCard, RefreshCw, Download, AlertCircle, Bell, Bot } from "lucide-react"

const usersData = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    avatar: "/sarah-chen-avatar.jpg",
    signupDate: "2024-01-15",
    lastSeen: "2 hours ago",
    onboardingStatus: "Completed",
    firstTransaction: { done: true, date: "2024-01-16" },
    activityLevel: "Daily",
    associates: 3,
    flags: [],
    plan: "Pro",
    accounts: 4,
    totalTransactions: 1248,
    healthScore: 92,
    cohort: "Week 3 Jan 2024",
    cohortSurvival: "Active",
    aiCorrections: 2,
    lastTrigger: "notification",
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.j@example.com",
    avatar: "/mike-johnson-avatar.jpg",
    signupDate: "2024-01-20",
    lastSeen: "1 day ago",
    onboardingStatus: "In progress",
    firstTransaction: { done: false },
    activityLevel: "Weekly",
    associates: 0,
    flags: ["No categories"],
    plan: "Free",
    accounts: 1,
    totalTransactions: 0,
    healthScore: 28,
    cohort: "Week 4 Jan 2024",
    cohortSurvival: "At risk",
    aiCorrections: 0,
    lastTrigger: null,
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    avatar: "/emma-wilson-avatar.jpg",
    signupDate: "2024-01-18",
    lastSeen: "5 hours ago",
    onboardingStatus: "Completed",
    firstTransaction: { done: true, date: "2024-01-19" },
    activityLevel: "Daily",
    associates: 2,
    flags: [],
    plan: "Pro",
    accounts: 3,
    totalTransactions: 856,
    healthScore: 85,
    cohort: "Week 3 Jan 2024",
    cohortSurvival: "Active",
    aiCorrections: 5,
    lastTrigger: "recurrence",
  },
  {
    id: 4,
    name: "Alex Rivera",
    email: "alex.r@example.com",
    avatar: "/alex-rivera-avatar.jpg",
    signupDate: "2024-01-22",
    lastSeen: "3 days ago",
    onboardingStatus: "Not started",
    firstTransaction: { done: false },
    activityLevel: "Low",
    associates: 0,
    flags: ["Many errors", "No categories"],
    plan: "Free",
    accounts: 0,
    totalTransactions: 0,
    healthScore: 12,
    cohort: "Week 4 Jan 2024",
    cohortSurvival: "Churned",
    aiCorrections: 0,
    lastTrigger: null,
  },
  {
    id: 5,
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    avatar: "/jordan-lee-avatar.jpg",
    signupDate: "2024-01-10",
    lastSeen: "12 hours ago",
    onboardingStatus: "Completed",
    firstTransaction: { done: true, date: "2024-01-11" },
    activityLevel: "Monthly",
    associates: 1,
    flags: [],
    plan: "Pro",
    accounts: 2,
    totalTransactions: 342,
    healthScore: 58,
    cohort: "Week 2 Jan 2024",
    cohortSurvival: "Active",
    aiCorrections: 12,
    lastTrigger: "reminder",
  },
  {
    id: 6,
    name: "Lisa Park",
    email: "lisa.p@example.com",
    avatar: "/placeholder.svg",
    signupDate: "2024-01-25",
    lastSeen: "14 days ago",
    onboardingStatus: "Completed",
    firstTransaction: { done: true, date: "2024-01-26" },
    activityLevel: "Low",
    associates: 0,
    flags: ["Inactive 14d"],
    plan: "Free",
    accounts: 1,
    totalTransactions: 23,
    healthScore: 35,
    cohort: "Week 4 Jan 2024",
    cohortSurvival: "At risk",
    aiCorrections: 3,
    lastTrigger: "notification",
  },
]

const timelineEvents = [
  { icon: UserPlus, label: "Signed up", time: "Jan 15, 2024 at 10:32 AM" },
  { icon: LogIn, label: "Started onboarding", time: "Jan 15, 2024 at 10:35 AM" },
  { icon: LogIn, label: "Completed onboarding", time: "Jan 15, 2024 at 10:48 AM" },
  { icon: CreditCard, label: "Created first transaction", time: "Jan 16, 2024 at 2:15 PM" },
  { icon: RefreshCw, label: "Set up recurring transaction", time: "Jan 18, 2024 at 11:20 AM" },
  { icon: Download, label: "Exported data", time: "Jan 20, 2024 at 4:45 PM" },
]

const featureUsageData = [
  { name: "Inflation view", usage: 45 },
  { name: "AI categorizer", usage: 82 },
  { name: "Recurring", usage: 38 },
  { name: "Shared accounts", usage: 15 },
  { name: "Exports", usage: 28 },
]

const userErrors = [
  { message: "API timeout on transaction sync", severity: "warning", time: "2h ago" },
  { message: "Failed recurring job execution", severity: "error", time: "1d ago" },
]

const triggerEvents = [
  { type: "notification", icon: Bell, label: "Push notification", count: 12 },
  { type: "reminder", icon: RefreshCw, label: "Reminder", count: 8 },
  { type: "recurrence", icon: CreditCard, label: "Recurrence executed", count: 15 },
  { type: "ai", icon: Bot, label: "AI suggestion", count: 5 },
]

export function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<(typeof usersData)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [segmentFilter, setSegmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = usersData.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())

    let matchesSegment = true
    if (segmentFilter === "at-risk") matchesSegment = u.healthScore < 40
    if (segmentFilter === "power") matchesSegment = u.healthScore >= 80
    if (segmentFilter === "new")
      matchesSegment = new Date(u.signupDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    let matchesStatus = true
    if (statusFilter === "no-categories") matchesStatus = u.flags.includes("No categories")
    if (statusFilter === "no-transactions") matchesStatus = !u.firstTransaction.done
    if (statusFilter === "inactive-14d") matchesStatus = u.flags.includes("Inactive 14d")
    if (statusFilter === "incomplete") matchesStatus = u.onboardingStatus !== "Completed"

    return matchesSearch && matchesSegment && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={segmentFilter} onValueChange={setSegmentFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All users</SelectItem>
                <SelectItem value="new">New (7d)</SelectItem>
                <SelectItem value="at-risk">At risk (&lt;40)</SelectItem>
                <SelectItem value="power">Power users (&gt;80)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="incomplete">Onboarding incomplete</SelectItem>
                <SelectItem value="no-categories">No categories selected</SelectItem>
                <SelectItem value="no-transactions">No transactions</SelectItem>
                <SelectItem value="inactive-14d">Inactive 14+ days</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Badge variant="outline" className="text-xs">
              {filteredUsers.length} users
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="w-[100px]">Health</TableHead>
                <TableHead>Signup date</TableHead>
                <TableHead>Last seen</TableHead>
                <TableHead>Onboarding</TableHead>
                <TableHead>First transaction</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Flags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="cursor-pointer hover:bg-secondary/50"
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <HealthScoreBadge score={user.healthScore} />
                  </TableCell>
                  <TableCell className="text-sm">{user.signupDate}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastSeen}</TableCell>
                  <TableCell>
                    <OnboardingBadge status={user.onboardingStatus} />
                  </TableCell>
                  <TableCell className="text-sm">
                    {user.firstTransaction.done ? (
                      <span className="text-success">Yes</span>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <ActivityBadge level={user.activityLevel} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.flags.map((flag, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs bg-destructive/10 text-destructive border-destructive/20"
                        >
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Drawer */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedUser && (
            <>
              <SheetHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <SheetTitle className="text-left">{selectedUser.name}</SheetTitle>
                      <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedUser(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Badge variant={selectedUser.plan === "Pro" ? "default" : "secondary"}>{selectedUser.plan}</Badge>
                  <OnboardingBadge status={selectedUser.onboardingStatus} />
                  <HealthScoreBadge score={selectedUser.healthScore} />
                </div>
              </SheetHeader>

              {/* KPI Strip */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-md bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">Accounts</p>
                  <p className="text-lg font-semibold">{selectedUser.accounts}</p>
                </div>
                <div className="rounded-md bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">Transactions</p>
                  <p className="text-lg font-semibold">{selectedUser.totalTransactions.toLocaleString()}</p>
                </div>
                <div className="rounded-md bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">AI corrections</p>
                  <p className="text-lg font-semibold">{selectedUser.aiCorrections}</p>
                </div>
              </div>

              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground">Cohort info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cohort</span>
                    <span className="text-sm font-medium">{selectedUser.cohort}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status vs cohort</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        selectedUser.cohortSurvival === "Active"
                          ? "bg-success/10 text-success"
                          : selectedUser.cohortSurvival === "At risk"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {selectedUser.cohortSurvival}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="timeline" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="timeline" className="flex-1">
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex-1">
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="triggers" className="flex-1">
                    Triggers
                  </TabsTrigger>
                  <TabsTrigger value="errors" className="flex-1">
                    Errors
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-4">
                  <div className="space-y-4">
                    {timelineEvents.map((event, i) => {
                      const Icon = event.icon
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{event.label}</p>
                            <p className="text-xs text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="features" className="mt-4">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={featureUsageData} layout="vertical">
                        <XAxis type="number" stroke="oklch(0.5 0 0)" fontSize={12} />
                        <YAxis type="category" dataKey="name" stroke="oklch(0.5 0 0)" fontSize={11} width={100} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "oklch(0.14 0 0)",
                            border: "1px solid oklch(0.22 0 0)",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="usage" fill="oklch(0.55 0.2 250)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="triggers" className="mt-4">
                  <p className="text-xs text-muted-foreground mb-3">Why this user returned (last 30 days)</p>
                  <div className="space-y-3">
                    {triggerEvents.map((trigger, i) => {
                      const Icon = trigger.icon
                      const isLastTrigger = selectedUser.lastTrigger === trigger.type
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between rounded-md p-3 ${
                            isLastTrigger ? "bg-info/10 border border-info/20" : "bg-secondary"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`h-4 w-4 ${isLastTrigger ? "text-info" : "text-muted-foreground"}`} />
                            <span className="text-sm">{trigger.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{trigger.count}x</span>
                            {isLastTrigger && (
                              <Badge variant="outline" className="text-xs bg-info/10 text-info">
                                Last
                              </Badge>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="errors" className="mt-4">
                  {userErrors.length > 0 ? (
                    <div className="space-y-3">
                      {userErrors.map((error, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-md bg-secondary p-3">
                          <AlertCircle
                            className={`h-4 w-4 mt-0.5 ${error.severity === "error" ? "text-destructive" : "text-warning"}`}
                          />
                          <div className="flex-1">
                            <p className="text-sm">{error.message}</p>
                            <p className="text-xs text-muted-foreground">{error.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No errors found</p>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function HealthScoreBadge({ score }: { score: number }) {
  let colorClass = "bg-destructive/10 text-destructive border-destructive/20"
  if (score >= 80) colorClass = "bg-success/10 text-success border-success/20"
  else if (score >= 40) colorClass = "bg-warning/10 text-warning border-warning/20"

  return (
    <Badge variant="outline" className={`text-xs font-mono ${colorClass}`}>
      {score}
    </Badge>
  )
}

function OnboardingBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Not started": "bg-muted text-muted-foreground",
    "In progress": "bg-warning/10 text-warning",
    Completed: "bg-success/10 text-success",
  }
  return (
    <Badge variant="outline" className={`text-xs ${styles[status]}`}>
      {status}
    </Badge>
  )
}

function ActivityBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    Daily: "bg-success/10 text-success",
    Weekly: "bg-info/10 text-info",
    Monthly: "bg-warning/10 text-warning",
    Low: "bg-muted text-muted-foreground",
  }
  return (
    <Badge variant="outline" className={`text-xs ${styles[level]}`}>
      {level}
    </Badge>
  )
}
