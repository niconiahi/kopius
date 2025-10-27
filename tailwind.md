# Tailwind

## Description

This library allows us to apply CSS using pre-determined classes, which each apply a very specific CSS style

## How it works

Tailwind creates a process that will read _all your codebase_ and generate one big CSS file that will contain all the Tailwind classes that you used across your whole application. It's generated automatically by Vite

## Example

In this example `tailwind-merge` is used to concatenate several Tailwind classes. If it finds the same class being applied, it will apply the last

```tsx
<button
  className={twMerge([
    "bg-green-500",
    "bg-red-500", // this will be applied
  ])}
>
  I'm a button
</button>
```

This is a complete example

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

