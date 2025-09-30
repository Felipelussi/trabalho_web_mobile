import {createFileRoute} from '@tanstack/react-router'
import {AddSale} from "@/features/sales/Add.tsx";

export const Route = createFileRoute('/sales/add')({
    component: AddSale,
})


