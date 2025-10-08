/**
 * @fileoverview Reusable Button component with multiple variants
 * Implements accessible button patterns with Radix UI
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn, buttonVariants } from "./utils";

/**
 * Button Component
 * Versatile button component with multiple variants and sizes
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant] - Button variant (default, destructive, outline, secondary, ghost, link)
 * @param {string} [props.size] - Button size (default, sm, lg, icon)
 * @param {boolean} [props.asChild=false] - Render as child component using Slot
 * @param {string} [props.type="button"] - Button type attribute
 * @param {React.Ref} ref - Forward ref for button element
 * @returns {JSX.Element} Button component
 */
const Button = React.forwardRef(({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };