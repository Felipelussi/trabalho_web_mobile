import { FeaturePageLayout } from '@/components/featurePageLayout.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Link } from '@tanstack/react-router'
import { SalesTable } from '@/features/sales/components/SalesTable.tsx'

export function ListSales() {
  return (
    <FeaturePageLayout
      title="Vendas"
      headerButton={
        <Button>
          <Link to={'/sales/add'}>Nova venda</Link>
        </Button>
      }
    >
      <SalesTable />
    </FeaturePageLayout>
  )
}
