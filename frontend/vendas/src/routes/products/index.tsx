import { createFileRoute } from '@tanstack/react-router'
import { ListProducts } from '@/features/products/List.tsx'

export const Route = createFileRoute('/products/')({
  component: ListProducts,
})