export function cn(...args: unknown[]): string {
  const newClassName: string[] = []

  args.forEach((arg) => {
    if (typeof arg === 'string') newClassName.push(...arg.trim().split(/\s+/))

    if (Array.isArray(arg)) newClassName.push(...arg.map(cn))

    if (typeof arg === 'object' && arg !== null) {
      Object.keys(arg).forEach((key) => {
        const newArg = arg as Record<string, boolean>

        if (newArg[key]) newClassName.push(key)
      })
    }
  })

  return newClassName.join(' ')
}
