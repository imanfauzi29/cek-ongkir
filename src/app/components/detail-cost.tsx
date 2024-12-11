'use client'

import { useShippingStore } from '@/store/useShipping'
import styles from '@/app/page.module.css'
import Image from 'next/image'

export default function DetailCost() {
  const { isLoading, cost_details } = useShippingStore((store) => store)

  return (
    <div className={styles.resultContainer}>
      {isLoading && (
        <Image
          src='/truck.gif'
          alt='truck'
          width={150}
          height={150}
          style={{ marginInline: 'auto', display: 'block' }}
        />
      )}
      {!isLoading && cost_details === undefined && (
        <div className={styles.notFoundResult}>
          <span>Check shipping rate first and result will show here.</span>
        </div>
      )}

      {!isLoading &&
        cost_details?.map(({ costs, code, name }) => (
          <div key={code} className={styles.detailCost}>
            <h2>{name}</h2>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Description</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map(({ service, description, cost }, i) => (
                    <tr key={i}>
                      <td>{service}</td>
                      <td>{description}</td>
                      <td>
                        <ul>
                          {cost.map((item) => (
                            <li key={item.etd}>
                              Estimasi sampai {item.etd}, harga {item.value}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  )
}
