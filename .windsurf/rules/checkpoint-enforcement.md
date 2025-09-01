---
trigger: always_on
---

<checkpoint_enforcement>
  <manual_verification>
    - MUST include checkpoint for manual verification after each development phase
    - MUST request manual testing for any interactive features or UI changes
    - MUST pause for user confirmation before proceeding to next major phase
    - CANNOT mark development phases complete without explicit user approval
  </manual_verification>
  
  <development_phases>
    - Backend API implementation and testing
    - Frontend component development and integration
    - Database schema changes and migrations
    - Authentication and authorization features
    - Third-party service integrations
    - Performance optimizations
  </development_phases>
  
  <verification_requirements>
    - Take screenshots for UI/visual changes before requesting verification
    - Provide clear testing instructions for interactive features
    - Document what was implemented and what needs manual testing
    - Include relevant URLs, commands, or steps for user verification
    - Wait for explicit "proceed" or "continue" confirmation from user
  </verification_requirements>
</checkpoint_enforcement>