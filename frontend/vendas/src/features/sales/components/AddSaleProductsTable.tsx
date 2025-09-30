import { useFieldArray, useFormContext } from 'react-hook-form'
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
import type { ProductTableRow } from '@/features/sales/types/sale'
import type { CreateSaleDTO } from '@/api/sales'

export function AddSaleProductsTable() {
  const { control, watch, setValue } = useFormContext<CreateSaleDTO>()
  const { fields, remove } = useFieldArray({
    control,
    name: 'products'
  })

  const watchedProducts = watch('products')

  const handleQuantityChange = (index: number, value: string) => {
    const qtd = parseInt(value) || 1
    setValue(`products.${index}.qtd`, qtd)
  }

  const handleDiscountChange = (index: number, value: string) => {
    const discount = parseFloat(value) || 0
    setValue(`products.${index}.discount`, discount)
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
                    onClick={() => remove(index)}
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
          Nenhum produto adicionado
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