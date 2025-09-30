import { http } from '@/lib/api';
import type { Product, CreateProductDTO, UpdateProductDTO } from '@/features/products/types/product';

export async function listProducts(): Promise<Product[]> {
  const { data } = await http.get<Product[]>('/products');
  return data;
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await http.get<Product>(`/products/${id}`);
  return data;
}

export async function createProduct(payload: CreateProductDTO): Promise<Product> {
  const { data } = await http.post<Product>('/products', payload);
  return data;
}

export async function updateProduct(id: number, payload: UpdateProductDTO): Promise<Product> {
  const { data } = await http.put<Product>(`/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id: number): Promise<void> {
  await http.delete(`/products/${id}`);
}
