import {FeaturePageLayout} from "@/components/featurePageLayout.tsx";
import {ProductDetails} from "@/features/products/components/ProductDetails.tsx";
import {useParams} from "@tanstack/react-router";

export function ViewProduct() {
    const { id } = useParams({from: '/products/$id'})

    return (
        <FeaturePageLayout title={`Produto ${id}`}>
            <ProductDetails productId={parseInt(id)} />
        </FeaturePageLayout>
    )
}
