import { createFileRoute } from '@tanstack/react-router'
import {EditSale} from "@/features/sales/Edit.tsx";

export const Route = createFileRoute('/sales/$id/edit')({
  component: EditSale,
})
