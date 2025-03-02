import { useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Label } from "../../components/ui/label";
import DatePickerWithRange from "./DatePickerWithRange";
import { addDays } from "date-fns";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    date: "24.01.01",
    companyName: "파리바게트 시흥",
    status: "success",
    file: "파일이름",
  },
  {
    id: "3u1reuv4",
    date: "24.01.02",
    companyName: "파리바게트 용인",
    status: "success",
    file: "파일이름",
  },
  {
    id: "derv1ws0",
    date: "24.02.03",
    companyName: "파리바게트 강남",
    status: "success",
    file: "파일이름",
  },
  {
    id: "5kma53ae",
    date: "24.03.04",
    companyName: "파리바게트 일산",
    status: "success",
    file: "파일이름",
  },
  {
    id: "bhqecj4p",
    date: "24.04.05",
    companyName: "파리바게트 광명",
    status: "success",
    file: "파일이름",
  },
  {
    id: "m5gr84i9",
    date: "24.01.01",
    companyName: "파리바게트 시흥",
    status: "success",
    file: "파일이름",
  },
  {
    id: "3u1reuv4",
    date: "24.01.02",
    companyName: "파리바게트 용인",
    status: "success",
    file: "파일이름",
  },
  {
    id: "derv1ws0",
    date: "24.02.03",
    companyName: "파리바게트 강남",
    status: "success",
    file: "파일이름",
  },
  {
    id: "5kma53ae",
    date: "24.03.04",
    companyName: "파리바게트 일산",
    status: "success",
    file: "파일이름",
  },
  {
    id: "bhqecj4p",
    date: "24.04.05",
    companyName: "파리바게트 광명",
    status: "success",
    file: "파일이름",
  },
  {
    id: "m5gr84i9",
    date: "24.01.01",
    companyName: "파리바게트 시흥",
    status: "success",
    file: "파일이름",
  },
  {
    id: "3u1reuv4",
    date: "24.01.02",
    companyName: "파리바게트 용인",
    status: "success",
    file: "파일이름",
  },
  {
    id: "derv1ws0",
    date: "24.02.03",
    companyName: "파리바게트 강남",
    status: "success",
    file: "파일이름",
  },
  {
    id: "5kma53ae",
    date: "24.03.04",
    companyName: "파리바게트 일산",
    status: "success",
    file: "파일이름",
  },
  {
    id: "bhqecj4p",
    date: "24.04.05",
    companyName: "파리바게트 광명",
    status: "success",
    file: "파일이름",
  },
];

export type Payment = {
  id: string;
  date: string;
  companyName: string;
  status: "pending" | "processing" | "success" | "failed";
  file: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "companyName",
    header: "대리점 법인명",
    cell: ({ row }) => <div className="capitalize">{row.getValue("companyName")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          날짜
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "file",
    header: () => <div className="text-right">미리보기</div>,
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue("file")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">승인 여부</div>,
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue("status")}</div>,
  },
];

type FilterState = {
  date: { limit: number; from: Date; to: Date };
  companyName: string;
  fileType: string;
};

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [filter, setFilter] = useState<FilterState>({
    date: {
      limit: 0,
      from: new Date(),
      to: addDays(new Date(), 7),
    },
    companyName: "",
    fileType: "",
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div>
        <h3>날짜</h3>
        <div className="flex space-x-2">
          <Button>1개월</Button>
          <Button>3개월</Button>
          <Button>6개월</Button>
          <Button>전체</Button>
          <DatePickerWithRange date={filter.date} setFilter={setFilter} />
        </div>
      </div>

      <div className="flex items-center py-4">
        <Label htmlFor="companyName">상호(법인명)</Label>
        <Input id="companyName" placeholder="상호명을 입력해주세요" className="max-w-sm" />
        <Label htmlFor="file">파일 형식</Label>
        <Button>PDF</Button>
        <Button>조회</Button>
        <Button>다운로드</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
