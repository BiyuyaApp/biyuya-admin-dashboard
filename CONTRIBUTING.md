# Contributing to Biyuya Admin Dashboard

Thank you for contributing to the Biyuya Admin Dashboard! This document provides guidelines for development.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm (comes with Node.js)
- Access to Biyuya backend repository
- Backend running locally on port 3000

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/BiyuyaApp/biyuya-admin-dashboard.git
cd biyuya-admin-dashboard

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:3000

# Start development server
npm run dev
```

Dashboard runs on: http://localhost:3003

---

## 📁 Project Structure

```
biyuya-admin-dashboard/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── pages/       # Dashboard page components
│   └── ui/          # shadcn/ui components
├── lib/             # Utilities and services
│   ├── api-client.ts       # HTTP client
│   ├── analytics-service.ts # API service layer
│   └── utils.ts            # Helper functions
├── styles/          # Global styles
└── public/          # Static assets
```

---

## 🎨 Code Style

### TypeScript
- Use TypeScript for all new files
- Define interfaces for all API responses
- Use strict type checking (avoid `any`)
- Export types from service files

Example:
```typescript
// lib/analytics-service.ts
export interface UserMetrics {
  userId: string;
  healthScore: number;
  activityLevel: 'active' | 'moderate' | 'low';
}

export class AnalyticsService {
  async getUserMetrics(): Promise<UserMetrics[]> {
    return apiClient.get<UserMetrics[]>('/api/v1/admin/analytics/users')
  }
}
```

### React Components
- Use functional components with hooks
- Implement loading and error states
- Add empty states for data-dependent UI
- Use `"use client"` directive for client components

Example:
```typescript
"use client"

import { useState, useEffect } from "react"
import { analyticsService } from "@/lib/analytics-service"

export function MetricsPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const result = await analyticsService.getMetrics()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (data.length === 0) return <div>No data available</div>

  return <div>{/* Render data */}</div>
}
```

### Styling
- Use Tailwind CSS utility classes
- Follow existing component patterns
- Use shadcn/ui components when possible
- Maintain responsive design (mobile-first)

---

## 🔌 Adding New API Endpoints

### 1. Add Interface to `analytics-service.ts`
```typescript
export interface NewMetric {
  id: string;
  value: number;
  timestamp: Date;
}
```

### 2. Add Method to AnalyticsService
```typescript
async getNewMetric(): Promise<NewMetric> {
  return apiClient.get<NewMetric>('/api/v1/admin/analytics/new-metric')
}
```

### 3. Use in Component
```typescript
const metric = await analyticsService.getNewMetric()
```

---

## 🧪 Testing

### Run Linting
```bash
npm run lint
```

### Type Check
```bash
npx tsc --noEmit
```

### Build Test
```bash
npm run build
```

### Manual Testing
1. Start backend on port 3000
2. Start dashboard: `npm run dev`
3. Test all pages for loading states, errors, data display
4. Test filters and interactions
5. Check browser console for errors
6. Verify API calls in network tab

---

## 🚢 Deployment

### Pre-deployment Checklist
- [ ] All TypeScript errors resolved
- [ ] Linting passes
- [ ] Build succeeds
- [ ] All pages tested manually
- [ ] Environment variables documented
- [ ] README updated if needed

### Deployment Steps
See [README.md](./README.md#-deployment) for deployment options (Vercel, Netlify, Docker).

---

## 🐛 Reporting Issues

When reporting bugs, please include:
1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - How to trigger the bug
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Screenshots** - If applicable
6. **Environment** - OS, Node version, browser
7. **Console Errors** - Browser console output
8. **Network Logs** - Failed API calls from network tab

---

## 📝 Pull Request Process

1. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Follow existing patterns
   - Add types for new interfaces
   - Test thoroughly

3. **Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

   Commit message format:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation only
   - `style:` Formatting, missing semicolons, etc.
   - `refactor:` Code restructuring
   - `test:` Adding tests
   - `chore:` Maintenance

4. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Create Pull Request on GitHub
   - Fill out PR template
   - Link related issues
   - Request review

5. **Code Review**
   - Address review comments
   - Push updates to the same branch
   - PR will auto-update

6. **Merge**
   - Maintainer will merge when approved
   - Delete branch after merge

---

## 🔐 Security

### Sensitive Data
- Never commit `.env.local` files
- Never commit API keys or secrets
- Use environment variables for configuration
- Don't log sensitive user data

### API Security
- Backend endpoints should use `@RequiresAuthToken()` in production
- Implement proper CORS configuration
- Use HTTPS in production

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Recharts Documentation](https://recharts.org)

---

## 💬 Communication

- **Issues** - Use GitHub Issues for bugs and feature requests
- **Discussions** - Use GitHub Discussions for questions
- **PRs** - Use Pull Requests for code contributions

---

## 📄 License

Proprietary - Biyuya Platform

---

## 🙏 Thank You!

Thank you for contributing to the Biyuya Admin Dashboard! Your contributions help make Biyuya better for everyone.
