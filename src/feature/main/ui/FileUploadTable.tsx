import {
  ColumnDef,
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
import { useEffect, useState } from "react";
import { useFileContext } from "@/app/providers/FileProvider";
import { formatDate } from "@/shared/utils/FormatDate";
import { ImageModal } from "../../../shared/ui";
import { saveFileGetRequest } from "../service";
import { useAuth } from "@/app/providers/AuthProvider";

export type Payment = {
  id: number;
  fileUrl: string;
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
    cell: ({ row }) => <div className="capitalize min-w-[50px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "fileUrl",
    header: "미리보기",
    cell: ({ row }) => (
      <div className="lowercase text-gray-300 underline ellipsis">
        <ImageModal btnName={row.getValue("fileUrl")} imageUrl={row.getValue("fileUrl")} />
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "날짜",
    cell: ({ row }) => <div className="lowercase flex justify-end pr-9">{formatDate(row.getValue("date"))}</div>,
  },
];

export function FileUploadTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { mergeFiles, setFiles } = useFileContext();
  const { getUser } = useAuth();

  useEffect(() => {
    const token = getUser();
    saveFileGetRequest(token).then(result =>
      setFiles(prev => ({
        ...prev,
        result: result.result.content,
        clientFiles: [],
      }))
    );

    console.log(mergeFiles);
  }, []);

  // 삭제하기 버튼을 눌렀을 때 실행되는 함수
  const handleDelete = () => {
    console.log("Selected IDs to delete:", rowSelection);
    // 이곳에서 삭제 로직을 구현하거나, 서버에 삭제 요청을 보낼 수 있습니다.
  };

  const table = useReactTable({
    data: mergeFiles,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  // 선택된 항목이 있으면 삭제 버튼 활성화
  const isDeleteButtonEnabled = Object.values(rowSelection).some(Boolean);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4 gap-3.5 mb-9">
        <h3 className="text-gray-800 text-title-sm">업로드 항목</h3>
        <Button
          className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-gray-100 disabled:opacity-100 py-3.5 px-6 text-body-md-sb text-white"
          disabled={!isDeleteButtonEnabled}
          onClick={handleDelete}>
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
            {/* 이전 버튼 */}
            <PaginationItem>
              <PaginationPrevious onClick={() => table.previousPage()} />
            </PaginationItem>

            {/* 동적으로 페이지 번호 생성 */}
            {Array.from({ length: table.getPageCount() }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={table.getState().pagination.pageIndex === index}
                  onClick={() => table.setPageIndex(index)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* 페이지가 많으면 ... 표시 */}
            {table.getPageCount() > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* 다음 버튼 */}
            <PaginationItem>
              <PaginationNext onClick={() => table.nextPage()} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
