'use client'

import styles from './styles.module.css'
import { cn } from '@/lib/utils/cn'
import React, { useState } from 'react'
import useClickOutside from '@/hooks/useClickOutside'

export type AutocompleteOptions = {
  text: string
  value: string
  additionalValue?: Record<string, unknown>
}

interface AutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options: AutocompleteOptions[]
  onSelectAction: (value: AutocompleteOptions) => void
  // choose show options when onClick or inChange.
  // onClick = true, onChange = false
  showOptionsOnClick?: boolean
  // showOptionsRange work when showOptionsOnClick is false
  showOptionsRange?: number
}
export default function Autocomplete({
  className,
  options,
  onSelectAction,
  showOptionsOnClick,
  showOptionsRange = 1,
  ...props
}: AutocompleteProps) {
  const [list, setList] = useState<AutocompleteOptions[]>(options)
  const [isShow, setIsShow] = useState(false)
  const [selected, setSelected] = useState('')

  const { ref } = useClickOutside({ action: () => setIsShow(false), not: true })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSelected(value)

    const filteredData = options.filter((city) =>
      city.text.toLowerCase().includes(value.toLowerCase()),
    )

    setList(filteredData)

    setIsShow(value.length >= showOptionsRange && !showOptionsOnClick)
    if (value.length >= showOptionsRange) {
      setIsShow(true)
      return
    } else {
      setIsShow(false)
    }
  }

  const handleShowOptions = () => {
    if (showOptionsOnClick) return setIsShow(true)
  }

  const handleSetSelected = (id: string) => {
    const filteredData = options.find((item) => item.value === id)

    if (filteredData) {
      onSelectAction(filteredData)
      setSelected(filteredData.text.toUpperCase())
      setIsShow(false)
    }
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      <input
        type='text'
        className={cn(styles.input, className)}
        {...props}
        onChange={handleSearch}
        onClick={handleShowOptions}
        value={selected}
      />

      <div className={cn(styles.listWrapper, isShow ? styles.show : '')}>
        <ul>
          {list.map((item) => (
            <li key={item.value}>
              <button
                type='button'
                onClick={() => handleSetSelected(item.value)}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
