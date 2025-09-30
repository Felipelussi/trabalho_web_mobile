import { createFileRoute } from '@tanstack/react-router'
import { FeaturePageLayout } from '@/components/featurePageLayout.tsx'
import { EditProductForm } from '@/features/products/components/EditProductForm.tsx'

export const Route = createFileRoute('/products/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  
  return (
    <FeaturePageLayout title={`Editar Produto ${id}`}>
      <EditProductForm productId={parseInt(id)} />
    </FeaturePageLayout>
  )
}