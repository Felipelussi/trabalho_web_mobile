export type ProductSale = {
  productId: number
  name: string
  qtd: number
  price: number
  discount: number
}
export type Sale = {
  id: number
  date: string
  total: number
  products?: ProductSale[]
}

export type UpdateSaleDTO = {
  products: ProductSale[]
}

export interface ProductTableRow extends ProductSale {
  id: string
}
