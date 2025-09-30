import { useState } from 'react'
import { useListProducts } from '@/features/products/hooks/useProducts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { Product } from '@/features/products/types/product'

interface ProductSelectorProps {
  onProductAdd: (product: Product) => void
}

export function ProductSelector({ onProductAdd }: ProductSelectorProps) {
  const { data: products, loading } = useListProducts()
  const [selectedProductId, setSelectedProductId] = useState<string>('')

  const handleAddProduct = () => {
    const product = products.find(p => p.id.toString() === selectedProductId)
    if (product) {
      onProductAdd(product)
      setSelectedProductId('')
    }
  }

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1">
        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name} - R$ {product.price.toFixed(2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={handleAddProduct} 
        disabled={!selectedProductId || loading}
      >
        Adicionar
      </Button>
    </div>
  )
}