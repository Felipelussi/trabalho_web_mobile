import { DataTable } from '@/components/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import { useListProducts } from '@/features/products/hooks/useProducts.ts'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import type { Product } from '@/features/products/types/product'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => {
      const price = row.original.price
      return `R$ ${(price / 100).toFixed(2)}`
    }
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const product = row.original
      const navigate = useNavigate()
      
      return (
        <Button 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            navigate({ to: `/products/${product.id}/view` })
          }}
        >
          Ver
        </Button>
      )
    }
  }
]

export function ProductsTable() {
  const { data, loading, error } = useListProducts()
  const navigate = useNavigate()
  
  const handleRowClick = (product: Product) => {
    navigate({ to: `/products/${product.id}/view` })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Carregando produtos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">Erro: {error}</div>
      </div>
    )
  }
  
  return <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
}