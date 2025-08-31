# Figma Make UI-Only Prompt Template for Command Lookup Interface

**PURPOSE:** Generate visual UI components only - no functionality or business logic.
These components will be integrated with existing application logic.

## Base UI Design Prompt

### Core UI Generation Prompt:

```
Please create a visual interface design for a command reference lookup tool. 
I need UI components only - focus purely on visual design and layout, not functionality.

**VISUAL INTERFACE REQUIREMENTS:**
Design a modern [STYLE_CHOICE] interface with these visual components:

**LAYOUT STRUCTURE:**
- Header section with logo/title area
- Search input field with visual styling and icon
- Platform filter buttons (Linux/macOS/Windows) - visual only
- Results counter display ("Showing X commands")
- Command cards arranged in responsive grid/list
- Clean, organized visual hierarchy

**VISUAL COMPONENTS NEEDED:**
1. **Header Component** - Logo space, title text, clean top navigation
2. **Search Input** - Styled search field with search icon and clear button
3. **Filter Buttons** - Toggle-style platform filter buttons
4. **Results Counter** - Simple text display for count
5. **Command Cards** - Card layout for individual commands
6. **Container Layout** - Overall page structure and spacing

**VISUAL STYLING:**
[STYLE_SPECIFIC_REQUIREMENTS]

**MOCK DATA FOR VISUAL CONTEXT:**
Display 6-8 sample command cards with placeholder content:
- "ls" - List directory contents
- "grep" - Search text patterns  
- "find" - Search for files
- "chmod" - Change file permissions
- "tar" - Archive files
- "ssh" - Secure shell connection

**VISUAL STATES:**
- Default component appearance
- Hover states for interactive elements
- Focus states for accessibility
- Visual feedback for button interactions

**RESPONSIVE DESIGN:**
- Mobile layout (single column cards)
- Desktop layout (multi-column grid)
- Tablet breakpoint adjustments
```

## Style-Specific Variations:

**NOTE: User will discuss style preferences directly with Figma Agent. The following are reference examples only.**

### Style 1: Command Palette Minimalism (Raycast-inspired)

```
**VISUAL DESIGN SPECIFICATIONS:**
- Centered search interface with blur backdrop overlay
- Dark theme with subtle gradients (#1a1a1a to #2d2d2d)
- Rounded corners (8-12px border radius) on all components
- San Francisco/Inter typography system
- Floating card design with subtle drop shadows
- Minimal color palette: grays, blues, single accent color
- Visual keyboard navigation indicators (focus rings)
```

### Style 2: Terminal-Inspired Modern (cheat.sh-inspired)

```
**VISUAL DESIGN SPECIFICATIONS:**
- Monospace typography for command text (JetBrains Mono/Fira Code)
- Dark terminal background colors (#1a1a1a, #2d2d2d)
- Syntax highlighting colors for code examples (green, cyan, yellow)
- Geometric header design with clean lines
- Code block visual styling for command examples
- Green/cyan accent colors for buttons and interactive elements
- Structured grid layout with consistent spacing
```

### Style 3: Documentation Hub Style (clig.dev-inspired)

```
**VISUAL DESIGN SPECIFICATIONS:**
- Clean, professional documentation layout
- Light background with optional dark mode toggle
- Card-based visual organization for commands
- Excellent typography hierarchy (headings, body, code)
- Professional color palette (blues, grays, white)
- Generous whitespace and consistent padding
- Clean visual transitions and hover effects
- Sidebar-style navigation visual treatment
```

## Additional Visual Specifications:

### Enhanced Visual Details:

```
**VISUAL ENHANCEMENTS:**
- Smooth CSS transitions for hover states (0.2s ease)
- CSS Grid and Flexbox for responsive layouts
- Subtle micro-animations for button interactions
- Visual keyboard focus indicators for accessibility
- Consistent visual spacing system (8px grid)
- Loading state visual design (skeleton or spinner)
```

### Accessibility Visual Requirements:

```
**VISUAL ACCESSIBILITY:**
- High contrast color ratios (WCAG AA compliant)
- Clear visual focus indicators (2px solid border)
- Readable typography sizes (16px minimum body text)
- Color-blind friendly palette choices
- Visual hierarchy through typography and spacing
- Clear visual affordances for interactive elements
```

## Visual Mock Data Structure:

```javascript
// Sample data for visual design context only
const mockCommands = [
  {
    name: "ls",
    description: "List directory contents",
    platform: "Linux, macOS",
    example: "ls -la",
    explanation: "List all files with detailed info"
  },
  {
    name: "grep",
    description: "Search text patterns",
    platform: "Linux, macOS", 
    example: "grep 'pattern' file.txt",
    explanation: "Search for pattern in file"
  },
  // ... 6-8 total commands for visual context
];
```

## Follow-up Visual Refinement Prompts:

After initial UI generation, use these to refine visual design:

1. **Color adjustments:** "Please adjust the color scheme to use [specific hex colors]"
2. **Typography refinements:** "Please increase font sizes and improve visual hierarchy"
3. **Spacing improvements:** "Please add more spacing between command cards"
4. **Visual effects:** "Please enhance hover states with subtle elevation effects"
5. **Responsive adjustments:** "Please improve mobile layout spacing for smaller screens"

## Usage Instructions:

- Replace [STYLE_CHOICE] with chosen visual style name
- Replace [STYLE_SPECIFIC_REQUIREMENTS] with appropriate style specifications
- Focus purely on visual design - avoid mentioning functionality
- Use clear, specific visual design language
- Request iterative visual improvements as needed
- Remember: This generates UI components for integration, not working apps
