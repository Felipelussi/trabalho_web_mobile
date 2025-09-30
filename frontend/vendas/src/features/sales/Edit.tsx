import {useParams} from "@tanstack/react-router";
import {FeaturePageLayout} from "@/components/featurePageLayout.tsx";
import {EditSaleForm} from "@/features/sales/components/EditSaleForm.tsx";

export function EditSale() {
    const { id } = useParams({from: '/sales/$id/edit'})

    return (
        <FeaturePageLayout title={`Venda - ${id}`}>
            <EditSaleForm saleId={parseInt(id)} />
        </FeaturePageLayout>
    )
}
