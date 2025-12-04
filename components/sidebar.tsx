"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import type { Page } from "@/app/page"
import { LayoutDashboard, Users, BarChart3, Settings2, TrendingUp } from "lucide-react"

interface SidebarProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "product-usage", label: "Product Usage", icon: BarChart3 },
  { id: "operations", label: "Operations", icon: Settings2 },
  { id: "finance", label: "Finance", icon: TrendingUp },
]

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="flex h-full w-[220px] flex-col border-r border-sidebar-border bg-sidebar-bg">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent">
          <span className="text-sm font-bold text-accent-foreground">B</span>
        </div>
        <span className="text-sm font-semibold text-sidebar-foreground-active">Biyuya</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent/10 text-sidebar-foreground-active"
                      : "text-sidebar-foreground hover:bg-sidebar-border hover:text-sidebar-foreground-active",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <p className="text-xs text-sidebar-foreground">v1.0.0</p>
      </div>
    </aside>
  )
}
