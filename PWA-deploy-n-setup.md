# PWA Deployment & Setup Guide

## **1. What to Deploy**

Deploy everything from your `dist/` folder to your nginx web root:

**Deploy these files:**
```bash
# All files from dist/ go to your nginx root (e.g., /var/www/tldr.vladbortnik.dev/)
- index.html
- manifest.webmanifest  
- sw.js (service worker)
- registerSW.js
- workbox-*.js
- assets/ folder (CSS, JS)
- icons/ folder (PWA icons)
- favicon.svg
```

## **2. Nginx Configuration for PWA (2025)**

Your nginx config needs PWA-specific settings:

```nginx
server {
    listen 443 ssl http2;
    server_name tldr.vladbortnik.dev;
    
    # Your SSL config here...
    
    root /var/www/tldr.vladbortnik.dev;
    index index.html;
    
    # PWA MIME Types (Critical for 2025)
    location ~* \.(webmanifest|json)$ {
        add_header Content-Type application/json;
        add_header Cache-Control "public, max-age=86400";  # 1 day cache
    }
    
    # Service Worker - NO CACHE (Critical!)
    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
    
    location = /registerSW.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # Static Assets - Long Cache (hashed filenames)
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # Icons Cache
    location /icons/ {
        add_header Cache-Control "public, max-age=2592000";  # 30 days
    }
    
    # SPA Fallback for React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security Headers for PWA
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

## **3. Key Differences from Regular Static Site**

**Critical PWA Requirements:**
1. **HTTPS Only** - PWAs require SSL certificate
2. **Service Worker No-Cache** - `sw.js` must never be cached
3. **Manifest MIME Type** - `.webmanifest` needs `application/json`
4. **SPA Routing** - `try_files` for React client-side routing

## **4. Deployment Command**

```bash
# Build locally
npm run build

# Deploy to your server
scp -r dist/* user@your-server:/var/www/tldr.vladbortnik.dev/

# Or using rsync
rsync -avz --delete dist/ user@your-server:/var/www/tldr.vladbortnik.dev/
```

The main difference from a regular static site is the **service worker caching rules** and **manifest MIME types**. Without these, PWA installation will fail.