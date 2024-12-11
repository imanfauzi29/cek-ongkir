import styles from './page.module.css'
import { ResponseType } from '@/types/ResponseType'
import { CityType } from '@/types/RegionType'
import CheckPriceForm from '@/app/components/form'
import DetailCost from '@/app/components/detail-cost'
import Logout from '@/app/components/logout'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const getAllCity = async (): Promise<ResponseType<CityType[]>> => {
  try {
    const response = await fetch(`${process.env.RAJA_ONGKIR_API}/city`, {
      next: { revalidate: 86400 },
      headers: {
        'Content-Type': 'application/json',
        key: process.env.RAJA_ONGKIR_API_KEY || '',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch city data')
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    return {
      rajaongkir: {
        results: [],
        status: { code: 400, description: '' },
        query: [],
      },
    }
  }
}

export default async function Home() {
  const city = await getAllCity()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const decodedJWT = jwt.decode(token as string) as { username: string }

  return (
    <div className={styles.container}>
      <div className={styles.containerPage}>
        <div className={styles.header}>
          <div>Hello, {decodedJWT?.username}</div>
          <Logout />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.pageWrapper}>
            <div className={styles.titles}>
              <h1>Check shipping rates</h1>
              <p>Check your shipping rates now</p>
            </div>

            <CheckPriceForm data={city.rajaongkir.results} />

            <DetailCost />
          </div>
        </div>
      </div>
    </div>
  )
}
