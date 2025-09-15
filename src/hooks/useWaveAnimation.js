import { useState, useEffect } from 'react';

export function useWaveAnimation(speed = 100) {
  const [wavePhase, setWavePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase(prev => (prev + 1) % 360);
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  // Primary wave function for main backgrounds
  const getPrimaryWave = () => {
    const r1 = Math.floor(30 + Math.sin(wavePhase * 0.03) * 25);
    const g1 = Math.floor(41 + Math.cos(wavePhase * 0.035) * 30);
    const b1 = Math.floor(59 + Math.sin(wavePhase * 0.02) * 40);
    
    const r2 = Math.floor(49 + Math.cos(wavePhase * 0.025) * 35);
    const g2 = Math.floor(46 + Math.sin(wavePhase * 0.04) * 25);
    const b2 = Math.floor(129 + Math.cos(wavePhase * 0.015) * 50);

    return {
      background: `linear-gradient(135deg, rgba(${r1},${g1},${b1},0.8), rgba(${r2},${g2},${b2},0.7), rgba(${r1},${g1},${b1},0.8))`,
      transition: 'background 0.2s ease'
    };
  };

  // Secondary wave for headers/sections
  const getSecondaryWave = () => {
    const r = Math.floor(25 + Math.sin(wavePhase * 0.04) * 30);
    const g = Math.floor(35 + Math.cos(wavePhase * 0.03) * 35);
    const b = Math.floor(80 + Math.sin(wavePhase * 0.035) * 45);

    return {
      background: `linear-gradient(90deg, rgba(${r},${g},${b},0.6), rgba(${r+15},${g+10},${b+25},0.5), rgba(${r},${g},${b},0.6))`,
      transition: 'background 0.25s ease'
    };
  };

  // Accent wave for special elements
  const getAccentWave = (offset = 0) => {
    const phase = wavePhase + offset;
    const r = Math.floor(20 + Math.sin(phase * 0.025) * 20);
    const g = Math.floor(35 + Math.cos(phase * 0.03) * 25);
    const b = Math.floor(55 + Math.sin(phase * 0.035) * 35);
    
    return {
      background: `linear-gradient(115deg, rgba(${r},${g},${b},0.75), rgba(${r+25},${g+15},${b+40},0.65))`,
      transition: 'background 0.25s ease'
    };
  };

  // Enhanced background wave for full-page backgrounds
  const getBackgroundWave = () => {
    const r1 = Math.floor(15 + Math.sin(wavePhase * 0.02) * 30);
    const g1 = Math.floor(23 + Math.cos(wavePhase * 0.025) * 35);
    const b1 = Math.floor(42 + Math.sin(wavePhase * 0.015) * 50);
    
    const r2 = Math.floor(30 + Math.cos(wavePhase * 0.03) * 40);
    const g2 = Math.floor(41 + Math.sin(wavePhase * 0.02) * 30);
    const b2 = Math.floor(59 + Math.cos(wavePhase * 0.01) * 60);
    
    const r3 = Math.floor(49 + Math.sin(wavePhase * 0.035) * 50);
    const g3 = Math.floor(46 + Math.cos(wavePhase * 0.04) * 40);
    const b3 = Math.floor(129 + Math.sin(wavePhase * 0.025) * 70);

    return {
      background: `linear-gradient(45deg, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}), rgb(${r3},${g3},${b3}), rgb(${r1},${g1},${b1}))`,
      transition: 'background 0.3s ease'
    };
  };

  return {
    wavePhase,
    getPrimaryWave,
    getSecondaryWave,
    getAccentWave,
    getBackgroundWave
  };
}
