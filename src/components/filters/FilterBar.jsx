import React, { useState, useEffect } from 'react';
import { PlatformFilter } from './PlatformFilter.jsx';
import { CategoryFilter } from './CategoryFilter.jsx';

export function FilterBar({ 
  selectedPlatform, 
  selectedCategory, 
  onPlatformChange, 
  onCategoryChange 
}) {
  const [filterWave, setFilterWave] = useState(0);

  // Wave animation for filter background
  useEffect(() => {
    const interval = setInterval(() => {
      setFilterWave(prev => (prev + 0.5) % 360);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const getFilterBackground = () => {
    const r1 = Math.floor(25 + Math.sin(filterWave * 0.02) * 15);
    const g1 = Math.floor(35 + Math.cos(filterWave * 0.025) * 20);
    const b1 = Math.floor(70 + Math.sin(filterWave * 0.015) * 25);
    
    const r2 = Math.floor(35 + Math.cos(filterWave * 0.03) * 20);
    const g2 = Math.floor(45 + Math.sin(filterWave * 0.02) * 15);
    const b2 = Math.floor(90 + Math.cos(filterWave * 0.018) * 30);

    return {
      background: `linear-gradient(90deg, rgba(${r1},${g1},${b1},0.4), rgba(${r2},${g2},${b2},0.3), rgba(${r1},${g1},${b1},0.4))`,
      transition: 'background 0.3s ease'
    };
  };

  return (
    <div 
      className="mb-6 p-6 rounded-xl border border-white/20 backdrop-blur-sm"
      style={getFilterBackground()}
    >
      <div className="space-y-4">
        <PlatformFilter
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
}
