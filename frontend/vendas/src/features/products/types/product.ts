export type Product = {
  id: number
  name: string
  price: number
}

export type CreateProductDTO = Omit<Product, 'id'>

export type UpdateProductDTO = Partial<Product>
