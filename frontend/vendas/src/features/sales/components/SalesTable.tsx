import { DataTable } from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useListSales } from "@/features/sales/hooks/useSales.ts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { dateFormatter } from "@/lib/dateFormatter.ts";

type Sale = {
  id: number;
  date: string;
  total: number;
};

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const date = row.original.date;
      return dateFormatter(date);
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.original.total;
      return `R$ ${total.toFixed(2)}`;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const sale = row.original;
      const navigate = useNavigate();

      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate({ to: `/sales/${sale.id}/edit` })}
        >
          Editar
        </Button>
      );
    },
  },
];

export function SalesTable() {
  const { data } = useListSales();
  const navigate = useNavigate();

  const handleRowClick = (sale: Sale) => {
    navigate({ to: `/sales/${sale.id}/edit` });
  };

  return (
    <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
  );
}
