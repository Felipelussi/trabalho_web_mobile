import { useGetProduct } from '@/features/products/hooks/useProducts'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

interface ProductDetailsProps {
  productId: number
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, loading, error } = useGetProduct(productId)
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate({ to: `/products/${productId}/edit` })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Carregando produto...</div>
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

  if (!product) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">Produto não encontrado</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">ID</label>
            <p className="text-lg">{product.id}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nome</label>
            <p className="text-lg">{product.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Preço</label>
            <p className="text-lg">R$ {(product.price / 100).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleEdit}>
          Editar
        </Button>
      </div>
    </div>
  )
}