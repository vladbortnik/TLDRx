import { useState, useEffect, useRef } from 'react';

/**
 * INTEGRATION INSTRUCTIONS:
 * 
 * In your App.jsx, add this to use the wave animation:
 * 
 * 1. Import the hook:
 *    import { useWaveAnimation } from './hooks/useWaveAnimation';
 * 
 * 2. Inside your App component, initialize with a preset:
 *    const { getBackgroundWave } = useWaveAnimation('deep-ocean');
 * 
 *    Available presets:
 *    - 'deep-ocean': 7-second waves, powerful and majestic (DEFAULT)
 *    - 'stormy-seas': 5.5-second waves, intense and dramatic
 *    - 'calm-shore': 8.5-second waves, peaceful and rhythmic
 *    - 'tidal-surge': 10-second waves, rare but overwhelming
 *    - 'rhythmic-pulse': 6-second waves, steady and predictable
 * 
 * 3. Apply to your main container div:
 *    <div
 *      className="min-h-screen text-white font-inter relative"
 *      style={getBackgroundWave()}
 *    >
 * 
 * 4. For components, use other wave functions:
 *    - getPrimaryWave(): For main sections
 *    - getSecondaryWave(): For headers
 *    - getAccentWave(offset): For special elements with offset timing
 * 
 * 5. To debug or display wave stats:
 *    const { getWaveStats } = useWaveAnimation('deep-ocean');
 *    console.log(getWaveStats()); // Shows intensity, position, next wave timing
 */

/**
 * Ocean Wave Animation Hook
 * Creates a powerful, realistic wave effect that sweeps across the UI
 * Wave arrives every 6-7 seconds with strong impact and gentle recession
 */
export function useWaveAnimation(preset = 'deep-ocean') {
  const [waveIntensity, setWaveIntensity] = useState(0);
  const [wavePosition, setWavePosition] = useState(0);
  const animationFrameRef = useRef();
  const lastWaveTimeRef = useRef(Date.now());
  
  // Wave presets with different characteristics
  const presets = {
    'deep-ocean': {
      interval: 7000,      // 7 seconds between waves
      peakDuration: 800,   // Fast rise to peak
      recessionDuration: 3500, // Slow recession
      intensity: 1.0,      // Full power
      colorShift: 40,      // Medium color variation
      description: 'Deep ocean waves - powerful and majestic'
    },
    'stormy-seas': {
      interval: 5500,      // More frequent, aggressive waves
      peakDuration: 600,   // Very fast rise
      recessionDuration: 2800,
      intensity: 1.2,      // Extra powerful
      colorShift: 60,      // High color variation
      description: 'Storm waves - intense and dramatic'
    },
    'calm-shore': {
      interval: 8500,      // Less frequent, gentler
      peakDuration: 1200,  // Slower rise
      recessionDuration: 4500,
      intensity: 0.7,      // Gentler
      colorShift: 25,      // Subtle color variation
      description: 'Calm shore waves - peaceful and rhythmic'
    },
    'tidal-surge': {
      interval: 10000,     // Very infrequent but massive
      peakDuration: 1500,  // Slow, powerful build
      recessionDuration: 5000,
      intensity: 1.5,      // Maximum power
      colorShift: 80,      // Dramatic color shift
      description: 'Tidal waves - rare but overwhelming'
    },
    'rhythmic-pulse': {
      interval: 6000,      // Regular rhythm
      peakDuration: 700,
      recessionDuration: 3000,
      intensity: 0.9,
      colorShift: 35,
      description: 'Rhythmic waves - steady and predictable'
    }
  };

  const currentPreset = presets[preset] || presets['deep-ocean'];

  useEffect(() => {
    let waveState = 'waiting'; // 'waiting', 'rising', 'peak', 'receding'
    let waveStartTime = Date.now();
    let peakReachedTime = 0;
    
    const animate = () => {
      const now = Date.now();
      const timeSinceLastWave = now - lastWaveTimeRef.current;
      
      // Start a new wave when interval has passed
      if (waveState === 'waiting' && timeSinceLastWave >= currentPreset.interval) {
        waveState = 'rising';
        waveStartTime = now;
        lastWaveTimeRef.current = now;
      }
      
      if (waveState === 'rising') {
        const riseProgress = (now - waveStartTime) / currentPreset.peakDuration;
        
        if (riseProgress >= 1) {
          // Wave has reached peak
          setWaveIntensity(currentPreset.intensity);
          setWavePosition(100);
          waveState = 'peak';
          peakReachedTime = now;
        } else {
          // Exponential easing for powerful impact
          const easedProgress = 1 - Math.pow(1 - riseProgress, 3);
          setWaveIntensity(easedProgress * currentPreset.intensity);
          setWavePosition(easedProgress * 100);
        }
      }
      
      if (waveState === 'peak') {
        // Brief moment at peak before recession
        if (now - peakReachedTime > 200) {
          waveState = 'receding';
        }
      }
      
      if (waveState === 'receding') {
        const recedeProgress = (now - peakReachedTime - 200) / currentPreset.recessionDuration;
        
        if (recedeProgress >= 1) {
          // Wave has fully receded
          setWaveIntensity(0);
          setWavePosition(0);
          waveState = 'waiting';
        } else {
          // Logarithmic easing for gentle recession
          const easedProgress = 1 - Math.log10(1 + recedeProgress * 9) / Math.log10(10);
          setWaveIntensity(easedProgress * currentPreset.intensity);
          setWavePosition(easedProgress * 100);
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentPreset]);

  // Generate wave-affected colors based on intensity
  const getWaveColors = () => {
    const baseR = 15, baseG = 23, baseB = 42;  // Dark blue base
    const midR = 30, midG = 41, midB = 59;     // Medium blue
    const peakR = 49, peakG = 46, peakB = 129; // Purple peak
    
    const shift = waveIntensity * currentPreset.colorShift;
    
    // Calculate colors with wave influence
    const r1 = Math.floor(baseR + shift * 0.8);
    const g1 = Math.floor(baseG + shift * 0.9);
    const b1 = Math.floor(baseB + shift * 1.2);
    
    const r2 = Math.floor(midR + shift * 1.1);
    const g2 = Math.floor(midG + shift * 0.8);
    const b2 = Math.floor(midB + shift * 1.5);
    
    const r3 = Math.floor(peakR + shift * 0.6);
    const g3 = Math.floor(peakG + shift * 0.7);
    const b3 = Math.floor(peakB + shift * 0.9);
    
    return { r1, g1, b1, r2, g2, b2, r3, g3, b3 };
  };

  // Primary wave function for main backgrounds
  const getPrimaryWave = () => {
    const colors = getWaveColors();
    const gradientAngle = 135 + (wavePosition * 0.9); // Slight angle shift with wave
    
    return {
      background: `linear-gradient(${gradientAngle}deg, 
        rgba(${colors.r1},${colors.g1},${colors.b1},${0.8 + waveIntensity * 0.2}), 
        rgba(${colors.r2},${colors.g2},${colors.b2},${0.7 + waveIntensity * 0.2}), 
        rgba(${colors.r3},${colors.g3},${colors.b3},${0.8 + waveIntensity * 0.1}))`,
      transition: waveIntensity > 0.5 ? 'background 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'background 0.8s ease-out',
      transform: `translateZ(0)` // Hardware acceleration
    };
  };

  // Secondary wave for headers/sections
  const getSecondaryWave = () => {
    const colors = getWaveColors();
    const offset = wavePosition * 0.5; // Slightly delayed from primary
    
    return {
      background: `linear-gradient(90deg, 
        rgba(${colors.r1},${colors.g1},${colors.b1},${0.6 + waveIntensity * 0.2}), 
        rgba(${colors.r2 + 15},${colors.g2 + 10},${colors.b2 + 25},${0.5 + waveIntensity * 0.2}), 
        rgba(${colors.r1},${colors.g1},${colors.b1},${0.6 + waveIntensity * 0.2}))`,
      transition: waveIntensity > 0.5 ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.9s ease-out',
      transform: `translateX(${offset * 0.5}px) translateZ(0)`,
      filter: `brightness(${1 + waveIntensity * 0.15})`
    };
  };

  // Accent wave for special elements
  const getAccentWave = (offset = 0) => {
    const colors = getWaveColors();
    const phase = wavePosition + offset;
    
    return {
      background: `linear-gradient(115deg, 
        rgba(${colors.r1 - 5},${colors.g1},${colors.b1 - 5},${0.75 + waveIntensity * 0.15}), 
        rgba(${colors.r2 + 25},${colors.g2 + 15},${colors.b2 + 40},${0.65 + waveIntensity * 0.2}))`,
      transition: waveIntensity > 0.5 ? 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.85s ease-out',
      transform: `scale(${1 + waveIntensity * 0.02}) translateZ(0)`,
      boxShadow: waveIntensity > 0.3 
        ? `0 ${4 + waveIntensity * 8}px ${20 + waveIntensity * 30}px rgba(${colors.r3},${colors.g3},${colors.b3},${waveIntensity * 0.3})`
        : 'none'
    };
  };

  // Enhanced background wave for full-page backgrounds
  const getBackgroundWave = () => {
    const colors = getWaveColors();
    const waveGradientPosition = 50 - (wavePosition * 0.5); // Move gradient with wave
    
    return {
      background: `linear-gradient(45deg, 
        rgb(${colors.r1},${colors.g1},${colors.b1}), 
        rgb(${colors.r2},${colors.g2},${colors.b2}) ${waveGradientPosition}%, 
        rgb(${colors.r3},${colors.g3},${colors.b3}) ${waveGradientPosition + 30}%, 
        rgb(${colors.r1},${colors.g1},${colors.b1}))`,
      transition: waveIntensity > 0.5 
        ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
        : 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
      backgroundSize: `${100 + waveIntensity * 50}% ${100 + waveIntensity * 50}%`,
      backgroundPosition: `${50 - wavePosition * 0.3}% ${50 - wavePosition * 0.2}%`,
      filter: `contrast(${1 + waveIntensity * 0.1}) saturate(${1 + waveIntensity * 0.2})`
    };
  };

  // Get current wave stats for debugging/display
  const getWaveStats = () => {
    return {
      intensity: waveIntensity,
      position: wavePosition,
      preset: preset,
      presetInfo: currentPreset.description,
      nextWaveIn: Math.max(0, currentPreset.interval - (Date.now() - lastWaveTimeRef.current))
    };
  };

  return {
    wavePhase: wavePosition, // Backwards compatibility
    waveIntensity,
    wavePosition,
    getPrimaryWave,
    getSecondaryWave,
    getAccentWave,
    getBackgroundWave,
    getWaveStats,
    availablePresets: Object.keys(presets).map(key => ({
      id: key,
      description: presets[key].description
    }))
  };
}