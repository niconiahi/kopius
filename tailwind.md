```tsx
import {
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react"
import { twMerge } from "tailwind-merge"

export function PrimaryButton({
  children,
  className,
  ...buttonProps
}: {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge([
        "flex bg-black items-center justify-between text-white p-2 min-w-12 h-12 border border-black",
        "outline outline-2 outline-offset-2 outline-gray-700",
        "disabled:opacity-60 disabled:outline-none",
        className,
      ])}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
```

