import { useForm, FormProvider } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useCreateSale } from '@/features/sales/hooks/useSales'
import { ProductSelector } from './ProductSelector'
import { AddSaleProductsTable } from './AddSaleProductsTable'
import type { Product } from '@/features/products/types/product'
import type { CreateSaleDTO } from '@/api/sales'

export function AddSaleForm() {
  const navigate = useNavigate()
  const { create, loading } = useCreateSale()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateSaleDTO>({
    defaultValues: {
      products: []
    }
  })

  const { handleSubmit, setValue, watch } = form
  const watchedProducts = watch('products')

  const handleProductAdd = (product: Product) => {
    const existingIndex = watchedProducts.findIndex(p => p.productId === product.id)
    
    if (existingIndex >= 0) {
      const currentQuantity = watchedProducts[existingIndex].qtd
      setValue(`products.${existingIndex}.qtd`, currentQuantity + 1)
    } else {
      const newProduct = {
        id: `temp-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        qtd: 1,
        discount: 0,
      }
      setValue('products', [...watchedProducts, newProduct as any])
    }
  }

  const onSubmit = async (data: CreateSaleDTO) => {
    try {
      setIsSubmitting(true)
      
      const result = await create(data)
      
      if (result) {
        navigate({ to: '/sales' })
      }
    } catch (error) {
      console.error('Error creating sale:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Adicionar Produtos</h3>
          <ProductSelector onProductAdd={handleProductAdd} />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Produtos da Venda</h3>
          <AddSaleProductsTable />
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: '/sales' })}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={watchedProducts.length === 0 || loading || isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Criar Venda'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}