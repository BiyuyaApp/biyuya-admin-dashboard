"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { OverviewPageConnected } from "@/components/pages/overview-page-connected"
import { UsersPageConnected } from "@/components/pages/users-page-connected"
import { ProductUsagePageConnected } from "@/components/pages/product-usage-page-connected"
import { OperationsPageConnected } from "@/components/pages/operations-page-connected"
import { FinancePageConnected } from "@/components/pages/finance-page-connected"

export type Page = "overview" | "users" | "product-usage" | "operations" | "finance"
export type DateRange = "7d" | "30d" | "90d" | "custom"

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<Page>("overview")
  const [dateRange, setDateRange] = useState<DateRange>("7d")

  const pageTitle = {
    overview: "Overview",
    users: "Users",
    "product-usage": "Product Usage",
    operations: "Operations",
    finance: "Finance",
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title={pageTitle[currentPage]} dateRange={dateRange} onDateRangeChange={setDateRange} />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-[1600px]">
            {currentPage === "overview" && <OverviewPageConnected />}
            {currentPage === "users" && <UsersPageConnected />}
            {currentPage === "product-usage" && <ProductUsagePageConnected />}
            {currentPage === "operations" && <OperationsPageConnected />}
            {currentPage === "finance" && <FinancePageConnected />}
          </div>
        </main>
      </div>
    </div>
  )
}
