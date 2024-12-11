type RajaOngkirType<T> = {
  query: []
  status: { code: number; description: string }
  results: T
}

export type ResponseType<T> = {
  rajaongkir: RajaOngkirType<T>
}
