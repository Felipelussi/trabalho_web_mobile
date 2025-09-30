import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useGetSale } from "@/features/sales/hooks/useSales";
import { EditSaleProductsTable } from "./EditSaleProductsTable";
import type { UpdateSaleDTO } from "@/features/sales/types/sale";
import {dateFormatter} from "@/lib/dateFormatter.ts";

interface EditSaleFormProps {
  saleId: number;
}

export function EditSaleForm({ saleId }: EditSaleFormProps) {
  const { data: sale, loading } = useGetSale(saleId);

  const form = useForm<UpdateSaleDTO>({
    defaultValues: {
      products: [],
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (sale?.products) {
      const productsWithTempId = sale.products.map((product, index) => ({
        ...product,
        id: `temp-${index}-${product.productId}`,
      }));
      setValue("products", productsWithTempId as any);
    }
  }, [sale, setValue]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Carregando venda...</div>
      </div>
    );
  }

  if (!sale) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">Venda não encontrada</div>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          Data: {dateFormatter(sale.date)} | Total: R$ {sale.total.toFixed(2)}
        </div>

        <EditSaleProductsTable saleId={saleId} />

      </div>
    </FormProvider>
  );
}
