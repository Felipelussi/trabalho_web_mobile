import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback } from 'react'
import { Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useUpdateSale } from '@/features/sales/hooks/useSales'
import type { ProductTableRow, UpdateSaleDTO } from '@/features/sales/types/sale'

interface EditSaleProductsTableProps {
  saleId: number
}

export function EditSaleProductsTable({ saleId }: EditSaleProductsTableProps) {
  const { control, watch, setValue, getValues } = useFormContext<UpdateSaleDTO>()
  const { fields, remove } = useFieldArray({
    control,
    name: 'products'
  })

  const { update, loading } = useUpdateSale()
  const watchedProducts = watch('products')

  const saveImmediately = useCallback(async () => {
    try {
      const formData = getValues()
      const cleanedProducts = formData.products.map((product: any) => ({
        productId: product.productId,
        name: product.name,
        qtd: product.qtd,
        price: product.price,
        discount: product.discount
      }))
      await update(saleId, { products: cleanedProducts })
      toast.success('Venda atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar a venda')
    }
  }, [saleId, update, getValues])

  const handleQuantityChange = async (index: number, value: string) => {
    const qtd = parseInt(value) || 1
    setValue(`products.${index}.qtd`, qtd, { 
      shouldDirty: true,
      shouldTouch: true 
    })
    await saveImmediately()
  }

  const handleDiscountChange = async (index: number, value: string) => {
    const discount = parseFloat(value) || 0
    setValue(`products.${index}.discount`, discount, { 
      shouldDirty: true,
      shouldTouch: true 
    })
    await saveImmediately()
  }

  const handleRemove = async (index: number) => {
    remove(index)
    await saveImmediately()
  }

  const getTotal = (product: ProductTableRow) => {
    return product.qtd * (product.price - product.discount)
  }

  const getGrandTotal = () => {
    return watchedProducts.reduce((sum, product) => {
      return sum + (product.qtd * (product.price - product.discount))
    }, 0)
  }

  return (
    <div className="space-y-4">
      {loading && (
        <div className="text-sm text-muted-foreground">
          Salvando...
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Desconto</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => {
            const product = watchedProducts[index]
            return (
              <TableRow key={field.id}>
                <TableCell>{product?.name}</TableCell>
                <TableCell>R$ {product?.price?.toFixed(2)}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="1"
                    value={product?.qtd || 1}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product?.discount || 0}
                    onChange={(e) => handleDiscountChange(index, e.target.value)}
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  R$ {getTotal(product as ProductTableRow).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {fields.length === 0 && (
        <div className="text-center text-muted-foreground py-4">
          Nenhum produto na venda
        </div>
      )}

      {fields.length > 0 && (
        <div className="flex justify-end">
          <div className="text-lg font-semibold">
            Total Geral: R$ {getGrandTotal().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  )
}