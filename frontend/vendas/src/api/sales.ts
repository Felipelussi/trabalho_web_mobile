import { http } from '@/lib/api'
import type {
  Sale,
  ProductSale,
  UpdateSaleDTO,
} from '@/features/sales/types/sale'

export interface CreateSaleDTO {
  products: ProductSale[]
}

export async function listSales(): Promise<Sale[]> {
  const { data } = await http.get<Sale[]>('/sales')
  return data
}

export async function getSale(id: number): Promise<Sale> {
  const { data } = await http.get<Sale>(`/sales/${id}`)
  return data
}

export async function createSale(payload: CreateSaleDTO): Promise<Sale> {
  const { data } = await http.post<Sale>('/sales', payload)
  return data
}

export async function updateSale(
  id: number,
  payload: UpdateSaleDTO
): Promise<Sale> {
  const { data } = await http.patch<Sale>(`/sales/${id}`, payload)
  return data
}

export async function deleteSale(id: number): Promise<void> {
  await http.delete(`/sales/${id}`)
}
