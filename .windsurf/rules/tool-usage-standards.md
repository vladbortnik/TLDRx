---
trigger: always_on
---

<tool_usage_standards>
  <sequential_thinking_requirements>
    - MUST use sequential-thinking tool for any task involving:
      * Multiple code files or cross-file dependencies
      * UI integration and component interactions
      * Debugging complex issues or error investigation
      * Component replacement or refactoring across files
      * Data transformation with multiple steps or validation
      * Planning mode tasks requiring step-by-step execution
    - ONLY simple single-answer questions are exempt from this requirement
  </sequential_thinking_requirements>
  
  <complex_task_indicators>
    - Tasks requiring more than 15 tool calls (use Auto-Continue setting)
    - Multi-step workflows that span multiple files
    - Integration between frontend and backend components
    - Database schema changes affecting multiple models
    - API endpoint modifications requiring client updates
  </complex_task_indicators>
  
  <workflow_optimization>
    - Use planning mode for tasks with 3+ interconnected steps
    - Break down large tasks into smaller, manageable chunks
    - Leverage @-mentions for proper context inclusion
    - Offer to create workflows for repetitive multi-step processes (to the user)
  </workflow_optimization>
</tool_usage_standards>