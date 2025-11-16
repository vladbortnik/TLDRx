/**
 * @fileoverview Minimal Vitest smoke test for the TL;DRx root App component.
 * Ensures the app renders without crashing when provided with mock commands.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

/**
 * Creates a minimal set of mock commands that satisfies App's data requirements.
 *
 * @returns {Array<Object>} Small command list for testing
 */
function createMockCommands() {
  return [
    {
      name: 'ls',
      standsFor: 'list',
      description: 'List directory contents',
      keyFeatures: [],
      examples: ['ls  # List files in the current directory'],
      platform: ['linux'],
      category: 'file-operations',
      safety: 'safe',
      syntaxPattern: 'ls [options] [file]',
      prerequisites: {
        foundational_concepts: '',
        prior_commands: '',
        risk_awareness: '',
      },
      commandCombinations: [],
      relatedCommands: [],
      warnings: [],
      manPageUrl: 'https://man7.org/linux/man-pages/man1/ls.1.html',
    },
  ];
}

describe('App', () => {
  it('renders header and basic layout with mock commands', () => {
    const mockCommands = createMockCommands();

    render(<App mockCommands={mockCommands} />);

    // Header branding text from Header component
    expect(screen.getByRole('heading', { name: 'TL;DRx' })).toBeInTheDocument();
    expect(screen.getByText('Commands Made Simple')).toBeInTheDocument();
  });
});
