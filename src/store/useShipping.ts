import { AutocompleteOptions } from '@/components/autocomplete'
import { CostResponseType } from '@/types/CostResponseType'
import { create } from 'zustand/react'

export type ShippingState = {
  couriers: AutocompleteOptions[]
  isLoading: boolean
  cost_details?: CostResponseType[]
}

export type ShippingAction = {
  setCostDetails: (data: CostResponseType[]) => void
  setIsLoading: (loading: boolean) => void
  clearShippingStore: () => void
}

export type ShippingStore = ShippingState & ShippingAction

export const defaultShippingState: ShippingState = {
  isLoading: false,
  couriers: [
    {
      text: 'JNE',
      value: 'jne',
    },
    {
      text: 'POS Indonesia',
      value: 'pos',
    },
    {
      text: 'TIKI',
      value: 'tiki',
    },
  ],
}

export const useShippingStore = create<ShippingStore>()((set) => ({
  ...defaultShippingState,
  setCostDetails: (data: CostResponseType[]) =>
    set(() => ({ cost_details: data })),
  setIsLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
  clearShippingStore: () =>
    set(() => ({ isLoading: false, cost_details: undefined })),
}))
