# TL;DRx Deployment Guide

## 🌐 Current Deployment

**Live URL:** https://tldrx.vladbortnik.dev
**Platform:** Vercel
**Framework:** Vite 7.1 (React 19.1)
**Domain:** Custom domain via Vercel DNS

---

## 📋 Deployment Architecture

### Infrastructure Stack
- **Hosting Platform:** Vercel (Serverless Edge Network)
- **Build Tool:** Vite 7.1
- **Framework:** React 19.1
- **CDN:** Vercel Edge Network (Global)
- **Service Worker:** Workbox 7.3 (PWA caching)
- **Analytics:** Umami Analytics (Privacy-friendly)
- **Error Tracking:** Sentry (Performance monitoring + Session replay)

### Key Features
- ✅ **Progressive Web App** - Offline-first with service workers
- ✅ **Auto-updates** - Service worker auto-updates on new deployments
- ✅ **Security Headers** - X-Frame-Options, CSP, CORS configured
- ✅ **Performance** - Edge caching, code splitting, virtual scrolling
- ✅ **Monitoring** - Sentry error tracking + performance insights

---

## 🚀 Deployment Process

### 1. Build Configuration

**vercel.json:**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── data-chunks-[hash].js
├── icons/
├── sw.js (Service Worker)
└── manifest.json (PWA Manifest)
```

### 2. Environment Variables

**Sentry Configuration** (if enabled):
```bash
SENTRY_DSN=<your-sentry-dsn>
SENTRY_ORG=<your-org>
SENTRY_PROJECT=<your-project>
```

**Analytics** (Umami):
- Analytics script loaded from: `https://analytics.vladbortnik.dev/script.js`
- Website ID configured in `index.html`

### 3. Deployment Steps

#### Option A: Git-based Auto Deployment (Recommended)

1. **Connect Repository to Vercel:**
   ```bash
   # Vercel automatically deploys on push to main branch
   git push origin main
   ```

2. **Automatic Process:**
   - Vercel detects push to main branch
   - Runs `npm install`
   - Executes `npm run build`
   - Deploys to production
   - Invalidates CDN cache
   - Service worker updates automatically

#### Option B: Manual Deployment via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy to Production:**
   ```bash
   # First time setup
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Deploy to Preview:**
   ```bash
   vercel
   ```

### 4. Custom Domain Setup

**Current Domain:** `tldrx.vladbortnik.dev`

**DNS Configuration:**
- Type: CNAME
- Name: tldrx
- Value: cname.vercel-dns.com
- TTL: Auto

**SSL/TLS:**
- Automatic HTTPS via Vercel (Let's Encrypt)
- Force HTTPS redirect enabled
- TLS 1.3 supported

---

## 🔒 Security Configuration

### HTTP Security Headers

Configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

### Service Worker Headers

Special caching for PWA assets:
- Service Worker: `Cache-Control: public, max-age=0, must-revalidate`
- Manifest: `Content-Type: application/manifest+json`

---

## ⚡ Performance Optimizations

### Build Optimizations

**vite.config.js:**
- **Code Splitting:** Large data files separated into `data-chunks`
- **Source Maps:** Excluded in production for faster builds
- **Manual Chunks:** Strategic chunking for optimal caching

```javascript
rollupOptions: {
  output: {
    manualChunks: (id) => {
      if (id.includes('src/data/')) {
        return 'data-chunks'
      }
    }
  }
}
```

### PWA Caching Strategy

**Workbox Configuration:**
- **Static Assets:** Cache-first strategy (JS, CSS, HTML, images)
- **Runtime Caching:** Google Fonts cached for 1 year
- **Auto-update:** Service worker updates on new deployments

### CDN & Edge Network

- **Global Distribution:** Vercel Edge Network
- **Cache-Control:** Optimized headers for static assets
- **Compression:** Automatic Brotli/Gzip compression

---

## 📊 Monitoring & Analytics

### Sentry Error Tracking

**Configuration:**
```javascript
Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Features:**
- Real-time error tracking
- Performance monitoring (INP, LCP, FCP, CLS)
- Session replay for debugging
- Release tracking

### Umami Analytics

**Privacy-Friendly Analytics:**
- No cookies, GDPR compliant
- Page views, unique visitors
- Referrer tracking
- Geographic data (country-level)
- Real-time dashboard

**Integration:**
```html
<script
  defer
  src="https://analytics.vladbortnik.dev/script.js"
  data-website-id="76386949-a6c8-4d47-910f-a78d8087f7eb"
></script>
```

---

## 🧪 Pre-Deployment Checklist

Before deploying to production:

- [ ] Run tests: `npm run test`
- [ ] Lint code: `npm run lint`
- [ ] Build locally: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Check bundle size
- [ ] Verify PWA manifest
- [ ] Test service worker
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices
- [ ] Verify SEO meta tags
- [ ] Test offline functionality

---

## 🔧 Troubleshooting

### Common Issues

**1. Service Worker Not Updating**
```bash
# Clear cache and re-register
# In browser console:
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(reg => reg.unregister()))
```

**2. Build Fails on Vercel**
- Check Node.js version (requires Node 18+)
- Verify all dependencies are in package.json
- Check build logs in Vercel dashboard

**3. PWA Not Installing**
- Verify manifest.json is accessible
- Check HTTPS is enabled
- Ensure service worker is registered
- Validate manifest with Chrome DevTools

**4. Performance Issues**
- Check bundle size: `npm run build -- --report`
- Profile with Chrome DevTools Performance tab
- Verify virtual scrolling is working
- Check Sentry performance insights

---

## 📈 Performance Metrics

### Target Metrics (2025 Web Standards)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| INP | <200ms | 47ms | ✅ |
| FCP | <1.8s | ~1.0s | ✅ |
| LCP | <2.5s | ~1.5s | ✅ |
| CLS | <0.1 | 0.02 | ✅ |
| TTI | <3.8s | ~2.0s | ✅ |

### Lighthouse Scores

- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100
- **PWA:** 100

---

## 🔄 Rollback Procedure

If a deployment causes issues:

**Via Vercel Dashboard:**
1. Go to Deployments tab
2. Find previous working deployment
3. Click "Promote to Production"

**Via Vercel CLI:**
```bash
vercel rollback
```

---

## 📝 Deployment History

### Version 2.7.0 (Current)
- Added Sentry error tracking
- Performance optimizations (INP: 47ms)
- Updated to React 19.1
- Enhanced PWA capabilities

### Version 2.6.0
- Virtual scrolling with React Virtuoso
- 93.4% INP improvement
- Optimized search debouncing

### Version 2.0.0
- Initial Vercel deployment
- PWA implementation
- Custom domain setup

---

## 📞 Support & Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

### Tools
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Sentry Dashboard](https://sentry.io)
- [Umami Analytics](https://analytics.vladbortnik.dev)

### Contact
- **GitHub Issues:** [TLDRx Issues](https://github.com/vladbortnik/TLDRx/issues)
- **Email:** Contact via [vladbortnik.dev](https://vladbortnik.dev/contact.html)

---

**Last Updated:** 2025-01-17
**Deployment Platform:** Vercel
**Status:** ✅ Production
