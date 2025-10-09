/**
 * @fileoverview Footer component with copyright and license information
 * Displays open source credits and links
 */

import { Github } from 'lucide-react';

/**
 * Footer Component
 * Shows copyright, license info, and social links
 * 
 * @component
 * @returns {JSX.Element} Application footer
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright & License */}
          <div className="text-center sm:text-left">
            <p className="text-slate-400 text-sm">
              © {currentYear} TL;DRx - Commands Made Simple
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Open Source •{' '}
              <a 
                href="https://github.com/vladbortnik/TLDRx/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                MIT License
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/vladbortnik/TLDRx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              aria-label="View source on GitHub"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm hidden sm:inline">View on GitHub</span>
            </a>
            
            <a
              href="https://vladbortnik.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              By Vlad Bortnik
            </a>
          </div>
        </div>

        {/* Optional: Community message */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Made with <span className="text-red-400">❤️</span> for the developer community
          </p>
        </div>
      </div>
    </footer>
  );
}
