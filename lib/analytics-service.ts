/**
 * Analytics Service
 *
 * Wrapper for admin analytics API endpoints
 */

import { apiClient } from './api-client';

export interface OverviewMetrics {
  retention: {
    d1: number;
    d7: number;
    d30: number;
  };
  dau: number;
  wau: number;
  mau: number;
  dauWauRatio: string;
  ttfv: number; // in minutes
  powerUsers: number;
  churnRate: number;
  activationRate: number;
}

export interface FunnelStep {
  name: string;
  value: number;
  dropOff: number;
}

export interface SystemHealth {
  failedJobs24h: number;
  totalJobs24h: number;
  successRate: number;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  signupDate: Date;
  onboardingStatus: string;
  firstTransaction: boolean;
  activityLevel: string;
  healthScore: number;
}

export interface StripeMRR {
  mrr: number;
}

export interface StripeSubscriptionMetrics {
  activeSubscriptions: number;
  newThisMonth: number;
  churnedThisMonth: number;
  churnRate: number;
}

export interface StripeRevenueMetrics {
  totalRevenue: number;
  successfulPayments: number;
  failedPayments: number;
  failureRate: number;
}

export interface MercuryAccount {
  id: string;
  name: string;
  balance: number;
  type: string;
}

export interface MercuryCashFlow {
  inflows: number;
  outflows: number;
  netCashFlow: number;
  transactionCount: number;
}

export interface MercuryRunway {
  totalBalance: number;
  monthlyBurn: number;
  runwayMonths: number | null;
  projectedZeroDate: string | null;
}

export interface MercurySummary {
  totalBalance: number;
  monthlyBurn: number;
  runwayMonths: number | null;
  lastMonthCashFlow: {
    inflows: number;
    outflows: number;
    netCashFlow: number;
  };
}

export interface NewRelicAPM {
  avgResponseTime: number;
  errorRate: number;
  throughput: number;
  apdexScore: number;
}

export interface NewRelicErrors {
  totalErrors: number;
  errorRate: number;
  topErrors: any[];
}

export interface NewRelicDatabase {
  avgQueryTime: number;
  slowQueries: number;
  totalQueries: number;
}

export interface NewRelicExternal {
  avgExternalTime: number;
  totalCalls: number;
  slowCalls: number;
}

export interface FeatureAdoption {
  featureName: string;
  uniqueUsers: number;
  adoptionRate: number;
  totalUsages: number;
  avgUsagesPerUser: number;
  firstUsedAt: Date;
  lastUsedAt: Date;
}

export interface FeatureTimeline {
  date: string;
  featureName: string;
  users: number;
  usages: number;
}

export class AnalyticsService {
  /**
   * Get overview metrics (retention, DAU/WAU/MAU, TTFV, etc.)
   */
  async getOverviewMetrics(days: number = 7): Promise<OverviewMetrics> {
    return apiClient.get<OverviewMetrics>(`/api/v1/admin/analytics?days=${days}`);
  }

  /**
   * Get onboarding funnel data
   */
  async getOnboardingFunnel(): Promise<FunnelStep[]> {
    return apiClient.get<FunnelStep[]>('/api/v1/admin/analytics/funnel');
  }

  /**
   * Get system health metrics
   */
  async getSystemHealth(): Promise<SystemHealth> {
    return apiClient.get<SystemHealth>('/api/v1/admin/analytics/system-health');
  }

  /**
   * Get users list with filters
   */
  async getUsersList(filters?: {
    segment?: 'all' | 'new' | 'at-risk' | 'power';
    status?: 'all' | 'incomplete' | 'no-categories' | 'no-transactions' | 'inactive-14d';
  }): Promise<UserListItem[]> {
    const params = new URLSearchParams();

    if (filters?.segment && filters.segment !== 'all') {
      params.append('segment', filters.segment);
    }
    if (filters?.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }

    const queryString = params.toString();
    const endpoint = `/api/v1/admin/analytics/users${queryString ? `?${queryString}` : ''}`;

    return apiClient.get<UserListItem[]>(endpoint);
  }

  /**
   * Get Stripe MRR (Monthly Recurring Revenue)
   */
  async getStripeMRR(): Promise<StripeMRR> {
    return apiClient.get<StripeMRR>('/api/v1/admin/analytics/stripe/mrr');
  }

  /**
   * Get Stripe subscription metrics
   */
  async getStripeSubscriptions(): Promise<StripeSubscriptionMetrics> {
    return apiClient.get<StripeSubscriptionMetrics>('/api/v1/admin/analytics/stripe/subscriptions');
  }

  /**
   * Get Stripe revenue metrics for a date range
   */
  async getStripeRevenue(startDate: string, endDate: string): Promise<StripeRevenueMetrics> {
    return apiClient.get<StripeRevenueMetrics>(
      `/api/v1/admin/analytics/stripe/revenue?startDate=${startDate}&endDate=${endDate}`
    );
  }

  /**
   * Get Mercury account balances
   */
  async getMercuryBalances(): Promise<MercuryAccount[]> {
    return apiClient.get<MercuryAccount[]>('/api/v1/admin/analytics/mercury/balances');
  }

  /**
   * Get Mercury cash flow for a date range
   */
  async getMercuryCashFlow(startDate: string, endDate: string): Promise<MercuryCashFlow> {
    return apiClient.get<MercuryCashFlow>(
      `/api/v1/admin/analytics/mercury/cash-flow?startDate=${startDate}&endDate=${endDate}`
    );
  }

  /**
   * Get Mercury runway calculation
   */
  async getMercuryRunway(): Promise<MercuryRunway> {
    return apiClient.get<MercuryRunway>('/api/v1/admin/analytics/mercury/runway');
  }

  /**
   * Get Mercury financial summary
   */
  async getMercurySummary(): Promise<MercurySummary> {
    return apiClient.get<MercurySummary>('/api/v1/admin/analytics/mercury/summary');
  }

  /**
   * Get New Relic APM metrics
   */
  async getNewRelicAPM(): Promise<NewRelicAPM> {
    return apiClient.get<NewRelicAPM>('/api/v1/admin/analytics/newrelic/apm');
  }

  /**
   * Get New Relic error metrics
   */
  async getNewRelicErrors(): Promise<NewRelicErrors> {
    return apiClient.get<NewRelicErrors>('/api/v1/admin/analytics/newrelic/errors');
  }

  /**
   * Get New Relic database metrics
   */
  async getNewRelicDatabase(): Promise<NewRelicDatabase> {
    return apiClient.get<NewRelicDatabase>('/api/v1/admin/analytics/newrelic/database');
  }

  /**
   * Get New Relic external service metrics
   */
  async getNewRelicExternal(): Promise<NewRelicExternal> {
    return apiClient.get<NewRelicExternal>('/api/v1/admin/analytics/newrelic/external');
  }

  /**
   * Get feature adoption metrics
   */
  async getFeatureAdoption(): Promise<FeatureAdoption[]> {
    return apiClient.get<FeatureAdoption[]>('/api/v1/admin/analytics/features');
  }

  /**
   * Get feature usage timeline (last 30 days)
   */
  async getFeatureTimeline(featureName?: string): Promise<FeatureTimeline[]> {
    const queryParam = featureName ? `?featureName=${featureName}` : '';
    return apiClient.get<FeatureTimeline[]>(`/api/v1/admin/analytics/features/timeline${queryParam}`);
  }
}

export const analyticsService = new AnalyticsService();
