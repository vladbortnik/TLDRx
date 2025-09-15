import React, { useState, useEffect } from 'react';
import { X, Filter, Monitor, Tag } from 'lucide-react';
import { PlatformFilter } from './PlatformFilter.jsx';
import { CategoryFilter } from './CategoryFilter.jsx';

export function InlineExpandableFilter({ 
  isOpen = false, 
  onToggle = () => {},
  selectedPlatform = "all", 
  selectedCategory = "all",
  onPlatformChange = () => {},
  onCategoryChange = () => {}
}) {
  const [pulseAnimation, setPulseAnimation] = useState(0);

  // Subtle pulse animation for borders
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getPulseOpacity = () => {
    return 0.3 + Math.sin(pulseAnimation * 0.1) * 0.1;
  };

  if (!isOpen) return null;

  const activeFiltersCount = (selectedPlatform !== "all" ? 1 : 0) + (selectedCategory !== "all" ? 1 : 0);

  return (
    <div className="w-full mb-6">
      {/* Main Filter Panel - Structured Card Design */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-lg overflow-hidden shadow-2xl">
        
        {/* Header Bar - Clean and Structured */}
        <div className="bg-slate-800/90 border-b border-slate-600/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-8 h-8 bg-blue-600/20 border border-blue-500/40 rounded-md flex items-center justify-center"
                style={{
                  borderColor: `rgba(59, 130, 246, ${getPulseOpacity()})`
                }}
              >
                <Filter className="w-4 h-4 text-blue-400" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white tracking-wide">
                  Filter Commands
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Narrow down results by platform and category
                </p>
              </div>
              
              {activeFiltersCount > 0 && (
                <div className="ml-4 px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full">
                  <span className="text-xs font-medium text-blue-300">
                    {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                  </span>
                </div>
              )}
            </div>
            
            <button
              onClick={onToggle}
              className="w-8 h-8 bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/50 rounded-md flex items-center justify-center transition-all duration-200 group"
            >
              <X className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:rotate-90 transition-all duration-200" />
            </button>
          </div>
        </div>

        {/* Filter Grid Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Platform Selection Card */}
            <div className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-emerald-600/20 border border-emerald-500/40 rounded flex items-center justify-center">
                  <Monitor className="w-3 h-3 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Platform
                  </h4>
                  <p className="text-xs text-slate-400">
                    Operating system compatibility
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-md p-4">
                <PlatformFilter
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={onPlatformChange}
                />
              </div>
            </div>

            {/* Category Selection Card */}
            <div className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-purple-600/20 border border-purple-500/40 rounded flex items-center justify-center">
                  <Tag className="w-3 h-3 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Category
                  </h4>
                  <p className="text-xs text-slate-400">
                    Command functionality type
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-md p-4">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onCategoryChange={onCategoryChange}
                />
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(selectedPlatform !== "all" || selectedCategory !== "all") && (
            <div className="mt-6 pt-6 border-t border-slate-600/30">
              <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-300">
                      Active Filters:
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {selectedPlatform !== "all" && (
                        <div className="px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-md">
                          <span className="text-xs font-medium text-emerald-300">
                            {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                          </span>
                        </div>
                      )}
                      
                      {selectedCategory !== "all" && (
                        <div className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-md">
                          <span className="text-xs font-medium text-purple-300">
                            {selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      onPlatformChange("all");
                      onCategoryChange("all");
                    }}
                    className="px-4 py-2 bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/50 rounded-md text-xs font-medium text-slate-300 hover:text-white transition-all duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}