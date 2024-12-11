export type CostResponseType = {
  code: string
  name: string
  costs: Cost[]
}

export type Cost = {
  service: string
  description: string
  cost: Cost2[]
}

export type Cost2 = {
  value: number
  etd: string
  note: string
}
