import { useParams } from "@tanstack/react-router";
import { FeaturePageLayout } from "@/components/featurePageLayout.tsx";
import { EditProductForm } from "@/features/products/components/EditProductForm.tsx";

export function EditProduct() {
  const { id } = useParams({ from: "/products/$id/edit" });

  return (
    <FeaturePageLayout title={`Editar Produto ${id}`}>
      <EditProductForm productId={parseInt(id)} />
    </FeaturePageLayout>
  );
}
