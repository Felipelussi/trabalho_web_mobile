import {FeaturePageLayout} from "@/components/featurePageLayout.tsx";
import {AddSaleForm} from "@/features/sales/components/AddSaleForm.tsx";

export function AddSale() {
    return <FeaturePageLayout title={'Nova venda'}>
        <AddSaleForm />
    </FeaturePageLayout>
}
