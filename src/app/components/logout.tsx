'use client'

import { AiOutlineLogout } from 'react-icons/ai'
import styles from '@/app/page.module.css'
import { logoutAction } from '@/app/actions/check-action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()
  const handleLogout = async () => {
    await toast
      .promise(logoutAction(), {
        success: 'Logout successfully',
        error: 'Could not logout, please try again',
        pending: 'Please wait to logout',
      })
      .then(() => router.push('/'))
  }
  return (
    <button type='button' onClick={handleLogout} className={styles.btnLogout}>
      <AiOutlineLogout style={{ fontSize: '18px' }} />
      <span>Logout</span>
    </button>
  )
}
