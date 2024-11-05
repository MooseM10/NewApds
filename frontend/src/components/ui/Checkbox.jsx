import * as React from "react"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  const combinedClassName = `peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${className || ''}`

  return (
    <input
      type="checkbox"
      className={combinedClassName}
      ref={ref}
      {...props}
    />
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }