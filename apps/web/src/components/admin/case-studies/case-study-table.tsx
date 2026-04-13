'use client';

import Link from 'next/link';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { formatDate } from '@apio/shared';
import type { ContentStatus } from '@apio/shared';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContentStatusBadge } from '@/components/admin/content-status-badge';
import { Trash2, RotateCcw, XCircle } from 'lucide-react';

interface CaseStudyRow {
  id: string;
  title: string;
  clientName: string;
  sector: string | null;
  status: ContentStatus;
  featured: boolean;
  createdAt: string | Date;
}

const columnHelper = createColumnHelper<CaseStudyRow>();

interface CaseStudyTableProps {
  data: CaseStudyRow[];
  onDelete: (id: string) => void;
  isTrash?: boolean;
  onRestore?: (id: string) => void;
  onHardDelete?: (id: string) => void;
}

export function CaseStudyTable({
  data,
  onDelete,
  isTrash,
  onRestore,
  onHardDelete,
}: CaseStudyTableProps) {
  const columns = [
    columnHelper.accessor('title', {
      header: 'Titre',
      cell: (info) => (
        <Link
          href={`/admin/case-studies/${info.row.original.id}/edit`}
          className="font-medium text-primary hover:underline"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('clientName', {
      header: 'Client',
    }),
    columnHelper.accessor('sector', {
      header: 'Secteur',
      cell: (info) => info.getValue() ?? '-',
    }),
    columnHelper.accessor('status', {
      header: 'Statut',
      cell: (info) => <ContentStatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('featured', {
      header: 'Mis en avant',
      cell: (info) => (info.getValue() ? <Badge variant="outline">Oui</Badge> : null),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) =>
        isTrash ? (
          <div className="flex gap-1 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRestore?.(info.row.original.id)}
              className="text-primary hover:text-primary"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onHardDelete?.(info.row.original.id)}
              className="text-destructive hover:text-destructive"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(info.row.original.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ),
    }),
  ];

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
              Aucun cas client trouvé.
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
