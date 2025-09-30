import { createFileRoute } from '@tanstack/react-router'
import { FeaturePageLayout } from '@/components/featurePageLayout.tsx'
import { ProductDetails } from '@/features/products/components/ProductDetails.tsx'

export const Route = createFileRoute('/products/$id/view')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  
  return (
    <FeaturePageLayout title={`Produto ${id}`}>
      <ProductDetails productId={parseInt(id)} />
    </FeaturePageLayout>
  )
}