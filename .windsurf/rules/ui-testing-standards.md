---
trigger: always_on
---

<ui_testing_standards>
  <visual_verification>
    - MUST take screenshot after any UI/visual change before proceeding to next task
    - MUST compare screenshots to expected design specifications or mockups
    - MUST document visual differences found during comparison
    - CANNOT mark UI tasks as complete without visual proof attached
  </visual_verification>
  
  <testing_workflow>
    - Take "before" screenshot prior to making changes
    - Take "after" screenshot immediately following UI modifications
    - Compare both screenshots against design requirements
    - Document any deviations or unexpected visual changes
    - Include screenshots in task completion documentation
  </testing_workflow>
  
  <quality_assurance>
    - Test UI changes across different screen sizes/viewports
    - Verify accessibility standards are maintained
    - Check for visual regressions in related components
    - Validate responsive design behavior
  </quality_assurance>
</ui_testing_standards>