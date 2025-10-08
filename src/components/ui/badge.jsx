/**
 * @fileoverview Reusable Badge component with multiple variants
 * Implements styled badge patterns with Radix UI
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn, badgeVariants } from "./utils";

/**
 * Badge Component
 * Versatile badge component for labels and status indicators
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant] - Badge variant (default, secondary, destructive, outline)
 * @param {boolean} [props.asChild=false] - Render as child component using Slot
 * @param {React.Ref} ref - Forward ref for badge element
 * @returns {JSX.Element} Badge component
 */
const Badge = React.forwardRef(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
