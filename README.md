# Biyuya Admin Analytics Dashboard

A comprehensive Next.js-based admin dashboard for monitoring Biyuya platform analytics, business metrics, system health, and user behavior. All pages connected to live backend APIs with real-time data.

## ✅ Status: 100% Complete - All Pages Connected with Real Data

### 🎯 Features

#### **1. Overview Page** (✅ Connected)
- **12 Real-time KPI Cards:**
  - Retention metrics (D1, D7, D30)
  - DAU/WAU/MAU tracking
  - DAU/WAU stickiness ratio
  - Time to First Value (TTFV)
  - Power users count
  - Churn rate
  - Activation rate
  - System health metrics (job success rate)
- **Onboarding Funnel Visualization**
  - Real conversion data from user activities
  - Drop-off analysis between steps
- **System Health Monitoring**
  - Failed jobs (24h)
  - Job success rate

#### **2. Finance Page** (✅ Connected)
- **Stripe Integration:**
  - Monthly Recurring Revenue (MRR): $20
  - Annual Recurring Revenue (ARR)
  - Active subscriptions: 1
  - Average Revenue Per User (ARPU)
  - Churn rate
  - Total revenue: $413
- **Mercury Banking Integration:**
  - Total cash balance: $143.09
  - Monthly burn rate
  - Runway calculation (months until zero balance)
  - Net cash flow: +$100.10/month
  - Inflows vs outflows breakdown
  - Projected zero date

#### **3. Operations Page** (✅ Connected)
- **New Relic APM Metrics:**
  - Average response time (ms)
  - Request throughput (rpm)
  - Error rate (%)
  - Apdex score (user satisfaction)
- **Error Tracking:**
  - Total errors (24h)
  - Error rate trends
  - Health status indicator
- **Database Performance:**
  - Average query time
  - Total queries executed
  - Slow query count
  - Query health status
- **External Services:**
  - Average external call time
  - Total external calls
  - Slow call count
  - Service health status

#### **4. Users Page** (✅ Connected)
- **User List with Real Data:**
  - Name, email, signup date
  - Onboarding status
  - First transaction status
  - Activity level (active/moderate/low)
  - Health score (0-100)
- **Advanced Filters:**
  - Segment: All / New / At-Risk / Power Users
  - Status: All / Incomplete Onboarding / No Categories / No Transactions / Inactive 14d
- **Summary Statistics:**
  - Total users
  - Healthy users
  - At-risk users
  - Critical users

#### **5. Product Usage Page** (✅ Connected)
- **Feature Adoption Metrics:**
  - Adoption rate per feature (% of users)
  - Unique users per feature
  - Total usage count
  - Average uses per user
  - First/last used timestamps
- **Adoption Badges:**
  - High (≥75% adoption)
  - Good (≥50% adoption)
  - Medium (≥25% adoption)
  - Low (<25% adoption)
- **Empty State:**
  - Graceful messaging when no data exists yet
  - Explains automatic feature tracking

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (uses Node 20 via nvm-run.zsh)
- Backend running on `http://localhost:3000`
- PostHog configured in backend
- Stripe API keys configured (for Finance page)
- Mercury API key configured (for Finance page)
- New Relic configured (for Operations page)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:3000

# Start development server
npm run dev
```

Dashboard will be available at: **http://localhost:3003**

---

## ⚙️ Configuration

### Environment Variables

Create `.env.local` with:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Backend Requirements

The backend must have:
1. **Admin Analytics API** running on `/api/v1/admin/analytics`
2. **CORS configured** to accept `http://localhost:3003`
3. **PostHog** configured and tracking events
4. **Stripe API keys** (for Finance page)
5. **Mercury API key** (for Finance page)
6. **New Relic agent** (for Operations page)

---

## 📁 Project Structure

```
biyuya-admin-dashboard/
├── app/
│   ├── favicon.ico
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main dashboard router
├── components/
│   ├── pages/              # Dashboard page components
│   │   ├── overview-page-connected.tsx      # ✅ Overview (real data)
│   │   ├── finance-page-connected.tsx       # ✅ Finance (Stripe + Mercury)
│   │   ├── operations-page-connected.tsx    # ✅ Operations (New Relic)
│   │   ├── users-page-connected.tsx         # ✅ Users (list + filters)
│   │   └── product-usage-page-connected.tsx # ✅ Product Usage (features)
│   ├── ui/                 # shadcn/ui components
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   ├── sidebar.tsx         # Navigation sidebar
│   └── top-bar.tsx         # Top navigation bar
├── lib/
│   ├── api-client.ts       # Generic HTTP client with error handling
│   ├── analytics-service.ts # Type-safe API service (14 methods)
│   └── utils.ts            # Utilities (cn, etc.)
├── styles/
│   └── globals.css         # Tailwind CSS imports
├── .env.example            # Environment template
├── .env.local              # Local environment config (not in git)
├── .gitignore              # Git ignore rules
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── README.md               # This file
```

---

## 🔌 API Integration

### Analytics Service

The dashboard uses a type-safe API service (`lib/analytics-service.ts`) with 14 methods:

```typescript
import { analyticsService } from '@/lib/analytics-service'

// Overview metrics
const metrics = await analyticsService.getOverviewMetrics(7) // 7 days
const funnel = await analyticsService.getOnboardingFunnel()
const health = await analyticsService.getSystemHealth()

// Users
const users = await analyticsService.getUsersList({
  segment: 'at-risk',
  status: 'no-transactions'
})

// Stripe
const mrr = await analyticsService.getStripeMRR()
const subs = await analyticsService.getStripeSubscriptions()
const revenue = await analyticsService.getStripeRevenue('2024-01-01', '2024-12-31')

// Mercury
const balances = await analyticsService.getMercuryBalances()
const cashFlow = await analyticsService.getMercuryCashFlow('2024-01-01', '2024-12-31')
const runway = await analyticsService.getMercuryRunway()
const summary = await analyticsService.getMercurySummary()

// New Relic
const apm = await analyticsService.getNewRelicAPM()
const errors = await analyticsService.getNewRelicErrors()
const database = await analyticsService.getNewRelicDatabase()
const external = await analyticsService.getNewRelicExternal()

// Feature adoption
const features = await analyticsService.getFeatureAdoption()
const timeline = await analyticsService.getFeatureTimeline('transaction_create')
```

### API Endpoints (13 Total)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/admin/analytics` | GET | Overview metrics (retention, DAU/WAU/MAU, TTFV) |
| `/api/v1/admin/analytics/funnel` | GET | Onboarding funnel conversion data |
| `/api/v1/admin/analytics/system-health` | GET | System health metrics (jobs, errors) |
| `/api/v1/admin/analytics/users` | GET | User list with health scores & filters |
| `/api/v1/admin/analytics/stripe/mrr` | GET | Monthly Recurring Revenue |
| `/api/v1/admin/analytics/stripe/subscriptions` | GET | Subscription metrics |
| `/api/v1/admin/analytics/stripe/revenue` | GET | Revenue for date range |
| `/api/v1/admin/analytics/mercury/balances` | GET | All account balances |
| `/api/v1/admin/analytics/mercury/cash-flow` | GET | Cash flow analysis |
| `/api/v1/admin/analytics/mercury/runway` | GET | Runway calculation |
| `/api/v1/admin/analytics/mercury/summary` | GET | Financial summary |
| `/api/v1/admin/analytics/newrelic/apm` | GET | APM metrics |
| `/api/v1/admin/analytics/newrelic/errors` | GET | Error tracking metrics |
| `/api/v1/admin/analytics/newrelic/database` | GET | Database performance |
| `/api/v1/admin/analytics/newrelic/external` | GET | External service metrics |
| `/api/v1/admin/analytics/features` | GET | Feature adoption rates |
| `/api/v1/admin/analytics/features/timeline` | GET | Feature usage over time |

---

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** Radix UI + shadcn/ui
- **Styling:** Tailwind CSS 3
- **Charts:** Recharts
- **Icons:** Lucide React
- **Type Safety:** TypeScript 5
- **HTTP Client:** Custom API client with error handling
- **Package Manager:** npm

---

## 🔐 Authentication (TODO)

Currently, the admin API endpoints are **not authenticated** (for development).

**Before production:**
1. Uncomment `@RequiresAuthToken()` in `AdminAnalyticsController` (backend)
2. Implement admin login flow
3. Add JWT token handling in `api-client.ts`
4. Implement role-based access control (RBAC)
5. Add session management

---

## 🚢 Deployment

### Option A: Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://api.biyuya.com
```

### Option B: Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod

# Set environment variable:
# NEXT_PUBLIC_API_URL=https://api.biyuya.com
```

### Option C: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📊 Available Metrics

### User Metrics
- **Retention:** D1, D7, D30 cohort retention rates
- **DAU/WAU/MAU:** Daily, weekly, monthly active users
- **Stickiness:** DAU/WAU ratio
- **Power Users:** Highly engaged users (3+ days/week)
- **Health Scores:** 0-100 score based on activity + engagement
- **Onboarding Status:** Completion tracking

### Product Metrics
- **TTFV:** Time to First Value (minutes from signup to first transaction)
- **Activation Rate:** % users who complete first transaction
- **Churn Rate:** % inactive users (30+ days)
- **Feature Adoption:** % users who used each feature
- **Feature Usage:** Total usages, avg uses per user

### Business Metrics
- **MRR/ARR:** Monthly/Annual Recurring Revenue (Stripe)
- **Subscriptions:** Active, new, churned counts
- **Revenue:** Total revenue, payment success/failure rates
- **Cash Balance:** Total available cash (Mercury)
- **Runway:** Months until zero balance
- **Cash Flow:** Inflows, outflows, net cash flow

### System Health
- **APM:** Response time, throughput, error rate, apdex (New Relic)
- **Database:** Query time, slow queries, total queries
- **External Services:** External call time, slow calls
- **Job Success Rate:** % successful background jobs (24h)
- **Failed Jobs:** Count of failed jobs (24h)

### Onboarding Metrics
- **Funnel:** Signup → Onboarding → First Transaction
- **Drop-off Points:** Where users abandon onboarding
- **Conversion Rates:** Per funnel step

---

## 🛠️ Development

### Run Development Server
```bash
npm run dev
# Dashboard: http://localhost:3003
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### "Cannot GET /api/v1/admin/analytics"
- ✅ Ensure backend is running on `http://localhost:3000`
- ✅ Check `NEXT_PUBLIC_API_URL` in `.env.local`
- ✅ Verify CORS is configured in backend

### "CORS Error"
Backend must include admin dashboard URL in CORS origins:
```typescript
// In backend src/main.ts
app.enableCors({
  origin: [
    'http://localhost:5173',  // Main frontend
    'http://localhost:3003',  // Admin dashboard
  ],
  credentials: true,
})
```

### "Loading Forever"
- Check browser console for errors
- Verify API endpoints return data (test with curl):
  ```bash
  curl http://localhost:3000/api/v1/admin/analytics
  ```
- Check network tab for failed requests
- Ensure backend services are configured (PostHog, Stripe, Mercury, New Relic)

### "Empty Data / Zeros"
Some integrations require API keys:
- **Stripe:** Set `STRIPE_SECRET_KEY` in backend `.env`
- **Mercury:** Set `MERCURY_API_KEY` in backend `.env`
- **New Relic:** Set `NEW_RELIC_API_KEY` in backend `.env`
- **PostHog:** Already configured with `POSTHOG_API_KEY`

All services use graceful degradation (return zeros/empty arrays if not configured).

---

## 📚 Related Documentation

- [Backend Analytics Implementation](https://github.com/BiyuyaApp/biyuya-backend)
- [Integration Plan](../ANALYTICS_INTEGRATION_PLAN.md)
- [Task Tracking](../TASK_BIYD-472-Integrate-Analytics-Platform.md)

---

## 🏗️ Architecture

### Frontend Architecture
- **Next.js App Router** - React Server Components + Client Components
- **Type-safe API layer** - TypeScript interfaces for all responses
- **Error boundaries** - Graceful error handling on all pages
- **Loading states** - Spinners while fetching data
- **Empty states** - User-friendly messages when no data exists
- **Responsive design** - Mobile-friendly layouts

### Backend Integration
- **NestJS REST API** - TypeORM for database queries
- **Multi-destination tracking** - PostgreSQL + PostHog
- **External integrations** - Stripe, Mercury, New Relic
- **SQL aggregations** - Complex analytics queries
- **Graceful degradation** - Returns safe defaults if services not configured

---

## 📈 Performance

- **Parallel data fetching** - `Promise.all()` for independent requests
- **Type-safe contracts** - Compile-time checking prevents runtime errors
- **Efficient SQL** - Indexed queries with TypeORM QueryBuilder
- **Static generation** - Next.js optimizations where possible

---

## 📄 License

Proprietary - Biyuya Platform

---

## 🤝 Contributing

This dashboard is part of the Biyuya fullstack workspace. For development workflow:

1. Follow workspace conventions in `DEVELOPMENT_WORKFLOW.md`
2. Use `/pre-commit` before committing
3. Run tests: `npm run lint && npm run build`
4. Create PRs with `/pr` command

---

## 📞 Support

For issues or questions:
- Backend API: See `biyuya-backend/src/admin/analytics/`
- Frontend issues: Check browser console + network tab
- Data issues: Verify backend services are configured (Stripe, Mercury, New Relic)
