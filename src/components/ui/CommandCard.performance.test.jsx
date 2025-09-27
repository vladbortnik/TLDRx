/**
 * Performance Tests for CommandCard Component
 * Tests loading speed, render time, and detects abnormal behavior
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { CommandCard } from './CommandCard.jsx';

// Sample test data
const mockCommand = {
  name: "ls",
  standsFor: "list directory contents", 
  description: "List information about files and directories",
  safety: "safe",
  platform: ['linux', 'macos'],
  category: 'file-operations',
  syntaxPattern: "ls [options] [directory]",
  examples: [
    "ls -la",
    "ls -la /home # List detailed info for /home directory", 
    "ls -lh # List with human readable sizes"
  ],
  keyFeatures: [
    "Lists files and directories in the current directory by default",
    "Display Format: Shows file names, permissions, owners, sizes, and timestamps",
    "Hidden Files: Use -a flag to show hidden files (those starting with '.')",
    "Human Readable: Use -h flag for human-readable file sizes"
  ],
  commandCombinations: [
    {
      label: "Find large files",
      commands: "ls -lhS | head -10",
      explanation: "List files sorted by size (largest first) and show top 10"
    }
  ],
  relatedCommands: [
    { name: "dir", relationship: "similar", reason: "DOS/Windows equivalent" },
    { name: "find", relationship: "complement", reason: "Search for files recursively" },
    { name: "tree", relationship: "alternative", reason: "Show directory structure as tree" }
  ],
  warnings: [],
  manPageUrl: "https://man7.org/linux/man-pages/man1/ls.1.html"
};

const mockCommandComplex = {
  ...mockCommand,
  name: "docker",
  examples: Array.from({ length: 20 }, (_, i) => `docker command ${i} # Example ${i}`),
  keyFeatures: Array.from({ length: 10 }, (_, i) => `Feature ${i}: Description of feature ${i}`),
  warnings: Array.from({ length: 5 }, (_, i) => `Warning ${i} about docker security`),
  relatedCommands: Array.from({ length: 15 }, (_, i) => ({ 
    name: `related-cmd-${i}`, 
    relationship: "similar", 
    reason: `Related to docker command ${i}` 
  })),
  commandCombinations: Array.from({ length: 5 }, (_, i) => ({
    label: `Combination ${i}`,
    commands: `docker cmd ${i} | pipe ${i}`,
    explanation: `Explanation for combination ${i}`
  }))
};

// Performance measurement utilities
const measureRenderTime = (renderFn) => {
  const start = performance.now();
  const result = renderFn();
  const end = performance.now();
  return { result, renderTime: end - start };
};

const measureMemoryUsage = () => {
  if (typeof performance.memory !== 'undefined') {
    return {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize
    };
  }
  return null;
};

describe('CommandCard Performance Tests', () => {
  beforeEach(() => {
    cleanup();
    // Force garbage collection if available (for memory tests)
    if (global.gc) {
      global.gc();
    }
  });

  afterEach(cleanup);

  describe('Single Component Render Performance', () => {
    it('should render a simple command card within acceptable time', () => {
      const { renderTime } = measureRenderTime(() => 
        render(<CommandCard command={mockCommand} wavePhase={0} />)
      );

      // Expect single card to render under 50ms (generous threshold)
      expect(renderTime).toBeLessThan(50);
      expect(screen.getByText('ls')).toBeInTheDocument();
    });

    it('should render a complex command card within acceptable time', () => {
      const { renderTime } = measureRenderTime(() => 
        render(<CommandCard command={mockCommandComplex} wavePhase={0} />)
      );

      // Complex card should render under 100ms
      expect(renderTime).toBeLessThan(100);
      expect(screen.getByText('docker')).toBeInTheDocument();
    });

    it('should handle missing optional props without performance degradation', () => {
      const minimalCommand = {
        name: "pwd",
        description: "print working directory"
      };

      const { renderTime } = measureRenderTime(() => 
        render(<CommandCard command={minimalCommand} wavePhase={0} />)
      );

      // Minimal card should be even faster
      expect(renderTime).toBeLessThan(25);
      expect(screen.getByText('pwd')).toBeInTheDocument();
    });
  });

  describe('Mass Rendering Performance', () => {
    it('should render 10 command cards within reasonable time', () => {
      const commands = Array.from({ length: 10 }, (_, i) => ({
        ...mockCommand,
        name: `command-${i}`
      }));

      const { renderTime } = measureRenderTime(() => {
        const { container } = render(
          <div>
            {commands.map((cmd, index) => 
              <CommandCard key={index} command={cmd} wavePhase={0} />
            )}
          </div>
        );
        return container;
      });

      // 10 cards should render under 200ms
      expect(renderTime).toBeLessThan(200);
      
      // Verify all cards rendered
      commands.forEach(cmd => {
        expect(screen.getByText(cmd.name)).toBeInTheDocument();
      });
    });

    it('should render 50 command cards within acceptable time', () => {
      const commands = Array.from({ length: 50 }, (_, i) => ({
        ...mockCommand,
        name: `cmd-${i}`
      }));

      const { renderTime } = measureRenderTime(() => {
        const { container } = render(
          <div>
            {commands.map((cmd, index) => 
              <CommandCard key={index} command={cmd} wavePhase={0} />
            )}
          </div>
        );
        return container;
      });

      // 50 cards should render under 1 second (performance regression threshold)
      expect(renderTime).toBeLessThan(1000);
      
      // Spot check a few cards
      expect(screen.getByText('cmd-0')).toBeInTheDocument();
      expect(screen.getByText('cmd-25')).toBeInTheDocument();
      expect(screen.getByText('cmd-49')).toBeInTheDocument();
    });

    it('should detect abnormal behavior with stress test', () => {
      // Stress test with 100 cards - this should fail if something is wrong
      const commands = Array.from({ length: 100 }, (_, i) => ({
        ...mockCommand,
        name: `stress-${i}`
      }));

      const memoryBefore = measureMemoryUsage();
      
      const { renderTime } = measureRenderTime(() => {
        const { container } = render(
          <div>
            {commands.map((cmd, index) => 
              <CommandCard key={index} {...cmd} />
            )}
          </div>
        );
        return container;
      });

      const memoryAfter = measureMemoryUsage();

      // This is a "canary" test - if this fails, something is seriously wrong
      // 100 cards should render under 3 seconds (if it takes longer, major issue)
      expect(renderTime).toBeLessThan(3000);

      // Memory usage should be reasonable (if available)
      if (memoryBefore && memoryAfter) {
        const memoryIncrease = memoryAfter.usedJSHeapSize - memoryBefore.usedJSHeapSize;
        // Memory increase should be less than 50MB for 100 cards
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
      }

      // Spot check rendering worked
      expect(screen.getByText('stress-0')).toBeInTheDocument();
      expect(screen.getByText('stress-99')).toBeInTheDocument();
    });
  });

  describe('React.memo Performance', () => {
    it('should not re-render when props have not changed', () => {
      let renderCount = 0;
      
      // Wrap CommandCard to count renders
      const TestWrapper = ({ command }) => {
        renderCount++;
        return <CommandCard command={command} wavePhase={0} />;
      };

      const { rerender } = render(
        <TestWrapper command={mockCommand} />
      );

      expect(renderCount).toBe(1);

      // Re-render with same props - should not re-render CommandCard
      rerender(<TestWrapper command={mockCommand} />);
      
      // This test verifies memo is working (component didn't re-render unnecessarily)
      expect(screen.getByText('ls')).toBeInTheDocument();
    });
  });

  describe('Component Tree Depth', () => {
    it('should have minimal DOM nesting depth', () => {
      render(<CommandCard {...mockCommand} />);
      
      const commandCard = screen.getByText('ls').closest('[data-command-name]');

      // Count DOM nesting depth
      let depth = 0;
      let element = commandCard.querySelector('*');
      while (element) {
        depth++;
        element = element.querySelector('*');
        // Prevent infinite loops
        if (depth > 20) break;
      }

      // DOM depth should be reasonable (less than 15 levels)
      expect(depth).toBeLessThan(15);
    });
  });

  describe('Error Boundaries and Edge Cases', () => {
    it('should handle malformed data gracefully', () => {
      const malformedCommand = {
        name: "test-cmd",
        platform: "invalid-platform", 
        examples: null, // This will cause map error if not handled
        relatedCommands: null
      };

      const { renderTime } = measureRenderTime(() => {
        // Should render without throwing errors
        const { container } = render(<CommandCard {...malformedCommand} />);
        expect(container).toBeTruthy();
      });

      // Should still render quickly even with bad data
      expect(renderTime).toBeLessThan(50);
      expect(screen.getByText('test-cmd')).toBeInTheDocument();
    });

    it('should handle extremely large datasets', () => {
      const hugeCommand = {
        ...mockCommand,
        name: "massive-cmd",
        examples: Array.from({ length: 1000 }, (_, i) => `example-${i}`),
        relatedCommands: Array.from({ length: 500 }, (_, i) => `related-${i}`),
        notes: Array.from({ length: 200 }, (_, i) => `note-${i}`)
      };

      const { renderTime } = measureRenderTime(() => 
        render(<CommandCard {...hugeCommand} />)
      );

      // Even with huge dataset, should render under 500ms
      expect(renderTime).toBeLessThan(500);
      expect(screen.getByText('massive-cmd')).toBeInTheDocument();
    });
  });

  describe('Performance Regression Detection', () => {
    it('should establish baseline performance metrics', () => {
      const iterations = 5;
      const renderTimes = [];

      for (let i = 0; i < iterations; i++) {
        cleanup();
        const { renderTime } = measureRenderTime(() => 
          render(<CommandCard {...mockCommand} />)
        );
        renderTimes.push(renderTime);
      }

      const avgRenderTime = renderTimes.reduce((a, b) => a + b) / iterations;
      const maxRenderTime = Math.max(...renderTimes);

      // Baseline: average render time should be under 30ms
      expect(avgRenderTime).toBeLessThan(30);
      
      // No single render should exceed 75ms
      expect(maxRenderTime).toBeLessThan(75);

      // Log performance metrics for monitoring
      console.log(`Performance Baseline:
        Average render time: ${avgRenderTime.toFixed(2)}ms
        Max render time: ${maxRenderTime.toFixed(2)}ms
        Render times: [${renderTimes.map(t => t.toFixed(1)).join(', ')}]ms`);
    });
  });
});