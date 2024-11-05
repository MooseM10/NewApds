import * as React from "react"

const Label = React.forwardRef(({ className, ...props }, ref) => {
  const baseClassName = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName

  return (
    <label
      ref={ref}
      className={combinedClassName}
      {...props}
    />
  )
})

Label.displayName = "Label"

export { Label }