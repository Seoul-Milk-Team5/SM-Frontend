import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const data: Payment[] = [
  {
    id: "001",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "002",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "003",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "004",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "005",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "006",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "007",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "008",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "009",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "010",
    file: "이미지명",
    date: "25.06.01",
  },
  {
    id: "011",
    file: "이미지명",
    date: "25.06.01",
  },
];

export type Payment = {
  id: string;
  file: string;
  date: string;
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
    accessorKey: "id",
    header: "번호",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "file",
    header: "미리보기",
    cell: ({ row }) => (
      <div className="lowercase text-gray-300 underline">
        <Link to={""}>{row.getValue("file")}</Link>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "날짜",
    cell: ({ row }) => <div className="lowercase flex justify-end pr-9">{row.getValue("date")}</div>,
  },
];

export function FileUploadTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4 gap-3.5 mb-9">
        <h3 className="text-gray-800 text-title-sm">업로드 항목</h3>
        <Button
          className="bg-gray-500 text-white hover:bg-gray-600 cursor-pointer disabled:bg-gray-100 disabled:opacity-100 py-3.5 px-6 text-body-md-sb"
          disabled={true}>
          삭제하기
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-body-sm ${index === headerGroup.headers.length - 1 ? "flex justify-end pr-21 items-center" : ""}`}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  className="hover:bg-gray-50 h-[68px] text-body-md"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center pt-[100px] pb-[130px] gap-7">
                    <img className="w-[80px]" src="/icon/noResult.svg" alt="검색결과 없음" />
                    <p className="text-body-sm text-gray-300">업로드된 세금계산서 파일이 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
