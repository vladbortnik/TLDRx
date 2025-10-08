# TL;DRx

[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5a0fc8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Commands Made Simple** - An interactive Unix/Linux command reference Progressive Web App featuring 500+ commands with fuzzy search, platform filtering, and blazing-fast performance.

---

## Live Demo

**Try it now:** [https://tldrx.vladbortnik.dev](https://tldrx.vladbortnik.dev)

Experience instant command lookup with sub-50ms response times and intelligent search that understands what you're looking for.

---

## Features

### Core Functionality
- **500+ Commands** - Comprehensive library of Unix/Linux commands with detailed examples, syntax patterns, and use cases
- **Intelligent Fuzzy Search** - 4-tier priority system with consecutive match bonuses for accurate results
- **Platform Filtering** - Multi-select filters for Linux, macOS, and Windows with OR logic
- **11 Categories** - Organized by System, Security, Shell, File Operations, Text Processing, Networking, Development, and more
- **Virtual Scrolling** - React Virtuoso implementation rendering only visible cards for optimal performance

### User Experience
- **Matrix Terminal Theme** - Dark UI with green accent glows and animated backgrounds
- **Scroll-Based Search Transition** - Seamless switch between full and mini search interfaces
- **Click-to-Copy Examples** - One-click copying of command examples
- **Related Commands** - Discover similar, alternative, and complementary commands
- **Collapsible Sections** - Expandable key features, warnings, and advanced options
- **PWA Support** - Installable, offline-capable, with service worker caching

### Performance
- **<50ms INP** - 93.4% improvement from 710ms (virtual scrolling optimization)
- **150ms Search Debounce** - Instant-feeling search with optimized re-render prevention
- **IntersectionObserver** - Performant scroll detection without event listener overhead
- **GPU-Accelerated Animations** - Smooth CSS transitions and wave effects

---

## Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tldrx.git
   cd tldrx
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## Usage

### Basic Search
1. Type any command name (e.g., "grep", "docker", "ssh") in the search bar
2. Fuzzy search automatically finds matches as you type
3. Results are ranked by relevance with exact matches prioritized

### Filtering
- **Platform Filters**: Click Linux, macOS, or Windows badges to filter commands by platform
- **Category Filters**: Click "Advanced filters" to select from 11 command categories
- **Combine Filters**: Use multiple filters simultaneously for precise results

### Command Cards
Each command card displays:
- **Command Name** - With Matrix-style green glow
- **Stands For** - What the command acronym means (with rolling description)
- **Syntax Pattern** - Cyan-colored usage syntax
- **Key Features** - Collapsible section with detailed capabilities
- **Examples** - Terminal-style examples with click-to-copy
- **Warnings** - Important safety information (for destructive commands)
- **Related Commands** - Similar, alternative, or complementary commands
- **Man Page Link** - Direct link to official documentation

### Keyboard Shortcuts
- Click anywhere on search container to focus input
- Scroll down to trigger mini search mode (compact header)
- Click logo to reset all filters and return to top

---

## Tech Stack

### Core Framework
- **React 19.1** - Latest React with Compiler optimizations
- **Vite 7.1** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Key Libraries
- **React Virtuoso 4.14** - Virtual scrolling for optimal performance
- **React Icons 5.5** - Comprehensive icon library
- **Radix UI** - Accessible component primitives (Accordion, Dialog, Tooltip)
- **Lucide React** - Beautiful, consistent icon set

### Development Tools
- **ESLint 9.29** - Code linting and quality enforcement
- **Vitest 3.2** - Unit testing framework
- **Playwright 1.53** - End-to-end testing
- **Vite PWA Plugin** - Progressive Web App generation

### Performance Optimizations
- **React.memo** - Component memoization for CommandCard and CommandCardHeader
- **useMemo** - Multi-stage filter pipeline memoization
- **IntersectionObserver API** - Efficient scroll detection
- **RequestAnimationFrame** - Throttled scroll handlers
- **Debouncing** - 150ms search input debounce

---

## Performance Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **INP (Interaction to Next Paint)** | 47ms | <200ms | ✅ Excellent |
| **Search Debounce** | 150ms | <200ms | ✅ Optimal |
| **Virtual Rendering** | ~15 cards visible | N/A | ✅ Efficient |
| **Production Commands** | 500+ | N/A | ✅ Full Dataset |
| **Development Commands** | 100 | N/A | ✅ Fast DevTools |

**Virtual Scrolling Impact:**
- **Before**: 710ms INP, 500 cards rendered
- **After**: 47ms INP, ~15 cards rendered
- **Improvement**: 93.4% reduction in processing time

---

## Project Structure

```
refactor-app-jsx/
├── src/
│   ├── main.jsx                 # React initialization
│   ├── App.jsx                  # Main orchestrator (593 lines)
│   ├── components/
│   │   ├── commands/            # CommandGrid, CommandCard, CommandCardHeader
│   │   ├── filters/             # FilterBar, PlatformFilterButton, CategoryFilters
│   │   ├── search/              # SearchInterface, SearchInput, SearchInterfaceMini
│   │   └── ui/                  # LoadingState, ErrorState
│   ├── data/
│   │   ├── commands.js          # 500+ commands (production)
│   │   ├── dev-loader.js        # Development data optimizer
│   │   └── chunks/              # Command category modules
│   ├── hooks/
│   │   ├── useWaveAnimation.js  # Synchronized RGB animations
│   │   └── useScrollBehavior.js # Header hide/show logic
│   └── utils/
│       ├── ui-icons.js          # Platform/category configuration
│       └── copyToClipboard.js   # Clipboard utilities
├── public/                      # Static assets and PWA icons
├── vite.config.js               # Vite configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### Reporting Issues
- Use the GitHub issue tracker
- Provide clear reproduction steps
- Include browser/OS information
- Attach screenshots if relevant

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style
4. Test thoroughly (run `npm run test` and `npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request with a clear description

### Development Guidelines
- Follow the component architecture patterns in `CLAUDE.md`
- Use React.memo for expensive components
- Implement proper error handling
- Write tests for new features
- Update documentation as needed

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 TL;DRx Development Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See the [LICENSE](LICENSE) file for full details.

---

## Acknowledgments

- **Command Data** - Curated from official documentation and community resources
- **Icons** - React Icons, Lucide React, and custom Matrix-themed designs
- **Inspiration** - tldr-pages project and modern terminal UIs

---

## Contact & Support

- **Live Demo**: [https://tldrx.vladbortnik.dev](https://tldrx.vladbortnik.dev)
- **Documentation**: See [CLAUDE.md](CLAUDE.md) for comprehensive technical documentation
- **Issues**: [GitHub Issues](https://github.com/yourusername/tldrx/issues)

---

**Built with ❤️ by the TL;DRx Development Team**

*Making command-line mastery accessible to everyone.*
