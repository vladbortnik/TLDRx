/**
 * Search Performance Tests for App Component
 * Tests fuzzy search algorithm speed and detects performance regressions
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.jsx';

// Mock commands data for testing
const generateMockCommands = (count) => {
  const commands = [];
  const commandNames = ['ls', 'grep', 'find', 'awk', 'sed', 'cat', 'docker', 'git', 'npm', 'curl'];
  const platforms = ['linux', 'macos', 'windows'];
  const categories = ['file-operations', 'text-processing', 'networking', 'development'];

  for (let i = 0; i < count; i++) {
    const baseName = commandNames[i % commandNames.length];
    commands.push({
      name: i === 0 ? baseName : `${baseName}-${i}`,
      standsFor: `${baseName} command variant ${i}`,
      description: `Description for ${baseName} command ${i}`,
      platform: [platforms[i % platforms.length]],
      category: categories[i % categories.length],
      examples: [`${baseName} example ${i}`, `${baseName} -flag ${i}`],
      relatedCommands: [`related-${i}`],
      syntaxPattern: `${baseName} [options]`,
      safety: 'safe'
    });
  }
  return commands;
};

// Performance measurement utility
const measureSearchTime = async (searchFn) => {
  const start = performance.now();
  await searchFn();
  const end = performance.now();
  return end - start;
};

describe('App Search Performance Tests', () => {
  beforeEach(() => {
    // Clear any performance marks
    if (typeof performance.clearMarks === 'function') {
      performance.clearMarks();
    }
  });

  describe('Fuzzy Search Algorithm Performance', () => {
    it('should handle search on 100 commands within 100ms', async () => {
      const mockCommands = generateMockCommands(100);
      
      render(<App mockCommands={mockCommands} />);
      
      // Wait for initial load
      await waitFor(() => {
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search commands...');

      const searchTime = await measureSearchTime(async () => {
        fireEvent.change(searchInput, { target: { value: 'ls' } });
        // Wait for search to complete
        await waitFor(() => {
          const counter = screen.getByText(/found/);
          expect(counter).toBeInTheDocument();
        }, { timeout: 1000 });
      });

      // Search should complete within 100ms for 100 commands
      expect(searchTime).toBeLessThan(100);
    });

    it('should handle search on 500 commands within 200ms', async () => {
      const mockCommands = generateMockCommands(500);
      
      render(<App mockCommands={mockCommands} />);
      
      await waitFor(() => {
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search commands...');

      const searchTime = await measureSearchTime(async () => {
        fireEvent.change(searchInput, { target: { value: 'grep' } });
        await waitFor(() => {
          // Look for the results counter instead of specific command
          const counter = screen.getByText(/found/);
          expect(counter).toBeInTheDocument();
        }, { timeout: 1000 });
      });

      // Search should complete within 200ms for 500 commands
      expect(searchTime).toBeLessThan(200);
    });

    it('should handle rapid typing without performance degradation', async () => {
      const mockCommands = generateMockCommands(300);
      
      render(<App mockCommands={mockCommands} />);
      
      await waitFor(() => {
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search commands...');

      // Simulate rapid typing
      const searchQueries = ['d', 'do', 'doc', 'dock', 'docke', 'docker'];
      const searchTimes = [];

      for (const query of searchQueries) {
        const searchTime = await measureSearchTime(async () => {
          fireEvent.change(searchInput, { target: { value: query } });
          // Small delay to simulate typing speed
          await new Promise(resolve => setTimeout(resolve, 10));
        });
        searchTimes.push(searchTime);
      }

      // Each search should be reasonably fast (under 100ms)
      searchTimes.forEach((time, index) => {
        expect(time).toBeLessThan(100);
      });

      // Average search time should be reasonable  
      const avgSearchTime = searchTimes.reduce((a, b) => a + b) / searchTimes.length;
      expect(avgSearchTime).toBeLessThan(60);
    });

    it('should handle edge case searches efficiently', async () => {
      const mockCommands = generateMockCommands(200);
      
      render(<App mockCommands={mockCommands} />);
      
      await waitFor(() => {
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search commands...');

      // Test edge cases
      const edgeCases = [
        '', // Empty search
        'a', // Single character
        'xyz123', // No matches expected
        'very-long-search-query-that-probably-matches-nothing', // Very long query
        '!@#$%', // Special characters
      ];

      for (const query of edgeCases) {
        const searchTime = await measureSearchTime(async () => {
          fireEvent.change(searchInput, { target: { value: query } });
          await new Promise(resolve => setTimeout(resolve, 50));
        });

        // Even edge cases should be reasonably fast
        expect(searchTime).toBeLessThan(200);
      }
    });
  });

  describe('Memory Usage and Cleanup', () => {
    it('should not cause memory leaks during repeated searches', async () => {
      const mockCommands = generateMockCommands(100);
      
      render(<App mockCommands={mockCommands} />);
      
      await waitFor(() => {
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search commands...');

      const memoryBefore = typeof performance.memory !== 'undefined' ? 
        performance.memory.usedJSHeapSize : null;

      // Perform 50 searches
      for (let i = 0; i < 50; i++) {
        fireEvent.change(searchInput, { target: { value: `search-${i}` } });
        await new Promise(resolve => setTimeout(resolve, 5));
      }

      // Force cleanup
      fireEvent.change(searchInput, { target: { value: '' } });
      
      const memoryAfter = typeof performance.memory !== 'undefined' ? 
        performance.memory.usedJSHeapSize : null;

      if (memoryBefore && memoryAfter) {
        const memoryIncrease = memoryAfter - memoryBefore;
        // Memory increase should be minimal (less than 10MB)
        expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
      }
    });
  });

  describe('Performance Regression Detection', () => {
    it('should establish search performance baselines', async () => {
      const mockCommands = generateMockCommands(250);
      
      render(<App mockCommands={mockCommands} />);
      
      await waitFor(() => {
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search commands...');

      const searchQueries = ['ls', 'docker', 'git', 'npm', 'find'];
      const searchTimes = [];

      for (const query of searchQueries) {
        const searchTime = await measureSearchTime(async () => {
          fireEvent.change(searchInput, { target: { value: query } });
          await waitFor(() => {
            // Wait for search to process (results counter should update)
            const counter = screen.getByText(/found/);
            expect(counter).toBeInTheDocument();
          }, { timeout: 1000 });
        });
        searchTimes.push(searchTime);
      }

      const avgSearchTime = searchTimes.reduce((a, b) => a + b) / searchTimes.length;
      const maxSearchTime = Math.max(...searchTimes);

      // Performance baselines
      expect(avgSearchTime).toBeLessThan(75); // Average under 75ms
      expect(maxSearchTime).toBeLessThan(150); // Max under 150ms

      console.log(`Search Performance Baseline (250 commands):
        Average search time: ${avgSearchTime.toFixed(2)}ms
        Max search time: ${maxSearchTime.toFixed(2)}ms
        Search times: [${searchTimes.map(t => t.toFixed(1)).join(', ')}]ms`);
    });

    it('should detect catastrophic performance regressions', async () => {
      const mockCommands = generateMockCommands(500);
      
      const renderStart = performance.now();
      render(<App mockCommands={mockCommands} />);
      const renderEnd = performance.now();
      
      const initialRenderTime = renderEnd - renderStart;
      
      await waitFor(() => {
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search commands...');

      // This is a "canary test" - if this fails, something is catastrophically wrong
      const catastrophicSearchTime = await measureSearchTime(async () => {
        fireEvent.change(searchInput, { target: { value: 'test' } });
        await waitFor(() => {
          // Just wait for any response
          expect(searchInput.value).toBe('test');
        });
      });

      // If initial render takes more than 2 seconds, major problem
      expect(initialRenderTime).toBeLessThan(2000);
      
      // If search takes more than 1 second, major problem  
      expect(catastrophicSearchTime).toBeLessThan(1000);

      console.log(`Catastrophic Regression Check:
        Initial render: ${initialRenderTime.toFixed(2)}ms
        Search time: ${catastrophicSearchTime.toFixed(2)}ms`);
    });
  });

  describe('StrictMode Double Execution Impact', () => {
    it('should measure impact of React StrictMode on performance', async () => {
      const mockCommands = generateMockCommands(100);
      
      render(<App mockCommands={mockCommands} />);
      
      await waitFor(() => {
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search commands...');

      // Measure search performance under StrictMode conditions
      const iterations = 3;
      const searchTimes = [];

      for (let i = 0; i < iterations; i++) {
        const searchTime = await measureSearchTime(async () => {
          fireEvent.change(searchInput, { target: { value: `test-${i}` } });
          await new Promise(resolve => setTimeout(resolve, 20));
        });
        searchTimes.push(searchTime);
      }

      const avgTime = searchTimes.reduce((a, b) => a + b) / searchTimes.length;
      
      // Even with StrictMode double-execution, should be reasonable
      expect(avgTime).toBeLessThan(100);

      console.log(`StrictMode Performance Impact:
        Average search time: ${avgTime.toFixed(2)}ms
        Individual times: [${searchTimes.map(t => t.toFixed(1)).join(', ')}]ms`);
    });
  });
});