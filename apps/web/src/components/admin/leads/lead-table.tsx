'use client';

import Link from 'next/link';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import type { Lead } from '@apio/shared';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LeadStatusBadge } from './lead-status-badge';

const columnHelper = createColumnHelper<Lead>();

const columns = [
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => (
      <Link
        href={`/admin/leads/${info.row.original.id}`}
        className="font-medium text-primary hover:underline"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor(
    (row) => {
      const parts = [row.firstName, row.lastName].filter(Boolean);
      return parts.length > 0 ? parts.join(' ') : '-';
    },
    {
      id: 'name',
      header: 'Nom',
    }
  ),
  columnHelper.accessor('company', {
    header: 'Entreprise',
    cell: (info) => info.getValue() ?? '-',
  }),
  columnHelper.accessor('needType', {
    header: 'Besoin',
    cell: (info) => info.getValue() ?? '-',
  }),
  columnHelper.accessor('status', {
    header: 'Statut',
    cell: (info) => <LeadStatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString('fr-FR'),
  }),
];

interface LeadTableProps {
  data: Lead[];
}

export function LeadTable({ data }: LeadTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
              Aucun lead trouvé.
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
