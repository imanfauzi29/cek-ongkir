'use client'

import styles from '@/app/page.module.css'
import { cn } from '@/lib/utils/cn'
import { MdModeStandby, MdOutlineTripOrigin } from 'react-icons/md'
import Autocomplete, { AutocompleteOptions } from '@/components/autocomplete'
import Input from '@/components/ui/input'
import { FaWeightHanging } from 'react-icons/fa6'
import { FaTruck } from 'react-icons/fa'
import Button from '@/components/ui/button'
import { CityType } from '@/types/RegionType'
import { useForm } from 'react-hook-form'
import {
  checkPriceSchema,
  CheckPriceSchemaType,
} from '@/app/components/form-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useShippingStore } from '@/store/useShipping'
import { checkCostAction } from '@/app/actions/check-action'
import { toast } from 'react-toastify'
import { CostResponseType } from '@/types/CostResponseType'

interface CheckPriceFormProps {
  data?: CityType[]
}
export default function CheckPriceForm({ data }: CheckPriceFormProps) {
  const { couriers, setIsLoading, isLoading, setCostDetails } =
    useShippingStore((state) => state)

  const form = useForm<CheckPriceSchemaType>({
    resolver: yupResolver(checkPriceSchema),
    defaultValues: {
      courier: undefined,
      weight: 0,
      origin: '',
      destination: '',
    },
  })

  const resultOptions = (city?: CityType[]): AutocompleteOptions[] => {
    if (!city) return []

    return city.map((item) => ({
      text: `${item.city_name}, ${item.province}`,
      value: item.city_id,
      additionalValue: item,
    }))
  }

  const handleSelect = (
    name: keyof CheckPriceSchemaType,
    option: AutocompleteOptions,
  ) => {
    const { value } = option
    form.setValue(name, value)
  }

  const handleSubmitForm = async () => {
    setIsLoading(true)
    const fieldValues = form.getValues()

    try {
      const response = await checkCostAction(fieldValues)

      if (response.statusCode !== 200) {
        throw new Error(response.message || 'Failed check cost')
      }

      toast.success('Check cost success')
      setCostDetails(response.data as CostResponseType[])
    } catch (err) {
      toast.error(`Check cost failed: ${(err as Error).message}`)
    }

    setIsLoading(false)
  }
  return (
    <div className={styles.ratesContainer}>
      <div className={styles.autocompleteContainer}>
        <div className={cn('flex items-center w-full flex-1')}>
          <MdOutlineTripOrigin style={{ fontSize: '24px' }} />
          <Autocomplete
            options={resultOptions(data)}
            placeholder='search origin city'
            style={{ padding: '1.5rem' }}
            showOptionsRange={3}
            onSelectAction={(value) => handleSelect('origin', value)}
            {...form.register('origin')}
          />
        </div>
        <div className='horizontal-divider' />
        <div className={cn('flex items-center w-full flex-1')}>
          <MdModeStandby style={{ fontSize: '24px' }} />
          <Autocomplete
            options={resultOptions(data)}
            placeholder='search destination city'
            style={{ padding: '1.5rem' }}
            showOptionsRange={3}
            onSelectAction={(value) => handleSelect('destination', value)}
            {...form.register('destination')}
          />
        </div>
      </div>

      <div className={styles.additional}>
        <div className='w-full'>
          <Input
            type='number'
            placeholder='weight (kg)'
            rightIcon={<FaWeightHanging />}
            onChange={(e) => form.setValue('weight', Number(e.target.value))}
          />
        </div>
        <div className='w-full'>
          <div className={styles.courierContainer}>
            <Autocomplete
              options={couriers}
              placeholder='Courier'
              style={{ padding: '1rem 2.5rem 1rem 0.5rem' }}
              showOptionsOnClick
              onSelectAction={(value) => handleSelect('courier', value)}
              {...form.register('courier')}
            />
            <div className={styles.rightIcon}>
              <FaTruck />
            </div>
          </div>
        </div>
      </div>

      <Button type='button' onClick={handleSubmitForm} isLoading={isLoading}>
        Check Price
      </Button>
    </div>
  )
}
