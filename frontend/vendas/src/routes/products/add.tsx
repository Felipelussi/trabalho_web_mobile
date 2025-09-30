import { createFileRoute } from '@tanstack/react-router'
import { FeaturePageLayout } from '@/components/featurePageLayout.tsx'
import { AddProductForm } from '@/features/products/components/AddProductForm.tsx'

export const Route = createFileRoute('/products/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <FeaturePageLayout title="Novo Produto">
      <AddProductForm />
    </FeaturePageLayout>
  )
}