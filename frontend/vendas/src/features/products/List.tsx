import { FeaturePageLayout } from '@/components/featurePageLayout.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Link } from '@tanstack/react-router'
import { ProductsTable } from '@/features/products/components/ProductsTable.tsx'

export function ListProducts() {
  return (
    <FeaturePageLayout
      title="Produtos"
      headerButton={
        <Button>
          <Link to={'/products/add'}>Novo Produto</Link>
        </Button>
      }
    >
      <ProductsTable />
    </FeaturePageLayout>
  )
}