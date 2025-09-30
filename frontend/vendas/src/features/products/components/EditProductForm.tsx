import { useGetProduct, useUpdateProduct } from '@/features/products/hooks/useProducts'
import { ProductForm } from '@/features/products/components/ProductForm'
import { useNavigate } from '@tanstack/react-router'
import type { UpdateProductDTO } from '@/features/products/types/product'

interface EditProductFormProps {
  productId: number
}

export function EditProductForm({ productId }: EditProductFormProps) {
  const { data: product, loading: loadingProduct, error: productError } = useGetProduct(productId)
  const { update, loading: updating, error: updateError } = useUpdateProduct()
  const navigate = useNavigate()

  const handleSubmit = async (data: UpdateProductDTO) => {
    const result = await update(productId, data)
    if (result) {
      navigate({ to: `/products/${productId}/view` })
    }
  }

  const handleCancel = () => {
    navigate({ to: `/products/${productId}/view` })
  }

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Carregando produto...</div>
      </div>
    )
  }

  if (productError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">Erro ao carregar produto: {productError}</div>
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
    <div className="space-y-4">
      {updateError && (
        <div className="p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-md">
          {updateError}
        </div>
      )}
      
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updating}
        submitLabel="Atualizar Produto"
      />
    </div>
  )
}