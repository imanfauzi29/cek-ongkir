import React from 'react'
import styles from '@/app/login/page.module.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.container}>
      <div className={styles.pageContainer}>{children}</div>
    </div>
  )
}
