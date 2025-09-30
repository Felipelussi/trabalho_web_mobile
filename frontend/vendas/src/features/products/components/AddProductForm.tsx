import { useCreateProduct } from '@/features/products/hooks/useProducts'
import { ProductForm } from '@/features/products/components/ProductForm'
import { useNavigate } from '@tanstack/react-router'
import type { CreateProductDTO } from '@/features/products/types/product'

export function AddProductForm() {
  const { create, loading, error } = useCreateProduct()
  const navigate = useNavigate()

  const handleSubmit = async (data: CreateProductDTO) => {
    const result = await create(data)
    if (result) {
      navigate({ to: '/products' })
    }
  }

  const handleCancel = () => {
    navigate({ to: '/products' })
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}
      
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={loading}
        submitLabel="Criar Produto"
      />
    </div>
  )
}