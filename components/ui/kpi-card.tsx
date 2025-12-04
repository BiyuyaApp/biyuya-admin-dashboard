import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  subtitle: string
  trend?: { value: number; direction: "up" | "down" }
  badge?: { label: string; variant: "success" | "warning" | "error" }
  progress?: number
  icon?: React.ElementType
}

export function KpiCard({ title, value, subtitle, trend, badge, progress, icon: Icon }: KpiCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground truncate">{title}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-2xl font-semibold tracking-tight">{value}</p>
              {trend && (
                <span
                  className={cn(
                    "flex items-center text-xs font-medium",
                    trend.direction === "up" ? "text-success" : "text-destructive",
                  )}
                >
                  {trend.direction === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {trend.value}%
                </span>
              )}
              {badge && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    badge.variant === "success" && "bg-success/10 text-success border-success/20",
                    badge.variant === "warning" && "bg-warning/10 text-warning border-warning/20",
                    badge.variant === "error" && "bg-destructive/10 text-destructive border-destructive/20",
                  )}
                >
                  {badge.label}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            {progress !== undefined && (
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
          {Icon && (
            <div className="ml-3 flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
