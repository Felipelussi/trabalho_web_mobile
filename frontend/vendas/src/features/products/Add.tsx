import {FeaturePageLayout} from "@/components/featurePageLayout.tsx";
import {AddProductForm} from "@/features/products/components/AddProductForm.tsx";

export function AddProduct() {
    return (
        <FeaturePageLayout title="Novo Produto">
            <AddProductForm />
        </FeaturePageLayout>
    )
}
