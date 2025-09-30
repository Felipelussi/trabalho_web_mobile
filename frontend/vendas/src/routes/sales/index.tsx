import { createFileRoute } from '@tanstack/react-router'
import { ListSales } from '@/features/sales/List.tsx'

export const Route = createFileRoute('/sales/')({
  component: ListSales,
})
