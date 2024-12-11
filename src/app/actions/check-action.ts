'use server'

import {
  checkPriceSchema,
  CheckPriceSchemaType,
} from '@/app/components/form-schema'
import { API_KEY, API_URL } from '@/lib/constants'
import { responseResult } from '@/lib/utils/response'
import { ResponseType } from '@/types/ResponseType'
import { CostResponseType } from '@/types/CostResponseType'
import { cookies } from 'next/headers'

export async function checkCostAction(data: CheckPriceSchemaType) {
  const response = responseResult

  checkPriceSchema.validateSync(data, { abortEarly: true })

  console.log(API_URL, 'API RUL')
  await fetch(`${API_URL}/cost`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      key: API_KEY || '',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const result = res as ResponseType<CostResponseType[]>
      response.statusCode = 200
      response.data = result.rajaongkir.results
      response.message = 'Success check cost'
    })
    .catch((err) => {
      const {
        rajaongkir: { status },
      } = err as ResponseType<null>

      response.error = 'ERROR_API'
      response.statusCode = status.code
      response.message = status.description
    })

  return response
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('token')

  return { success: true }
}
