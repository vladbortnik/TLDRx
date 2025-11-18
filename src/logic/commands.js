/**
 * Shared command loading utilities for TL;DRx.
 * Extracted from App.jsx so logic can be reused by multiple UIs.
 */

/**
 * Normalize raw command objects for UI consumption.
 * Ensures platform and category fields are always present.
 *
 * @param {Array<Object>} rawCommands - Raw commands loaded from the data module.
 * @returns {Array<Object>} Enhanced commands with safe defaults.
 */
export const enhanceCommands = (rawCommands) => {
  if (!Array.isArray(rawCommands)) {
    return [];
  }

  return rawCommands.map((command) => ({
    ...command,
    platform: command.platform || ["linux"],
    category: command.category || "general",
  }));
};

/**
 * Load and normalize commands from the main data module.
 *
 * @returns {Promise<Array<Object>>} Promise that resolves to enhanced command list.
 */
export const loadCommandsFromModule = async () => {
  const module = await import("../data/commands.js");
  const rawCommands = module.commands || module.default;
  return enhanceCommands(rawCommands);
};
