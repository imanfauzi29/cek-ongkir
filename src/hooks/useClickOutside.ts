'use client'

import { useEffect, useRef } from 'react'

export default function useClickOutside({
  action,
  not,
}: {
  action: () => void
  not?: boolean
}) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const current = ref.current?.contains(event.target as Node)

      if (not) {
        if (!current) action()
      } else {
        if (current) action()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [action, not])

  return { ref }
}
