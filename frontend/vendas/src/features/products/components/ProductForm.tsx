import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { Product, CreateProductDTO } from '@/features/products/types/product'

interface ProductFormData {
  name: string
  price: string
}

interface ProductFormProps {
  initialData?: Product
  onSubmit: (data: CreateProductDTO) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  submitLabel?: string
}

export function ProductForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false, 
  submitLabel = "Salvar" 
}: ProductFormProps) {
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: initialData?.name || '',
      price: initialData ? (initialData.price / 100).toString() : ''
    }
  })

  const { handleSubmit, control } = form

  const onFormSubmit = async (data: ProductFormData) => {
    if (!data.name.trim() || !data.price) {
      return
    }

    const priceInCents = Math.round(parseFloat(data.price) * 100)
    
    await onSubmit({
      name: data.name.trim(),
      price: priceInCents
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="name"
          rules={{ 
            required: "Nome é obrigatório",
            minLength: { value: 1, message: "Nome não pode estar vazio" }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={isLoading}
                  placeholder="Digite o nome do produto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="price"
          rules={{ 
            required: "Preço é obrigatório",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Digite um preço válido (ex: 10.99)"
            },
            min: { value: 0.01, message: "Preço deve ser maior que zero" }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (R$)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number"
                  step="0.01"
                  min="0.01"
                  disabled={isLoading}
                  placeholder="0.00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}