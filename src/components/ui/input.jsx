/**
 * @fileoverview Reusable Input component with consistent styling
 * Implements accessible input patterns with focus states
 */

import * as React from "react";

import { cn } from "./utils";

/**
 * Input Component
 * Styled input field with focus states and accessibility features
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type] - Input type attribute
 * @param {React.Ref} ref - Forward ref for input element
 * @returns {JSX.Element} Input component
 */
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };