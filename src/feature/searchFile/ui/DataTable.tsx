import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";

const statuses = ["전체", "승인", "반려", "검증 실패", "수정됨"];

const data = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  provider: "서울우유 강동지점",
  receiver: "파리바게트 수원역점",
  date: "25. 06. 14",
  preview: "IMG_45678910",
  status: ["승인", "반려", "검증 실패", "수정됨"][i % 4],
}));

export default function InvoiceTable() {
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(
    (item) =>
      (selectedStatus === "전체" || item.status === selectedStatus) &&
      (item.provider.includes(search) || item.receiver.includes(search))
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-6 bg-[#FFF] rounded-lg">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between w-[156px] h-[40px] px-4 py-2 border rounded-lg text-gray-300">
              {selectedStatus}
              <img src="/icon/dropdown.svg" alt="dropdown" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[156px]">
              {statuses.map((status) => (
              <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)} className="text-body-md">
                  {status}
              </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center w-[300px] h-[40px] border rounded-lg px-3">
            <Input
              className="w-full h-full !text-body-md placeholder:text-gray-300 border-none shadow-none"
              placeholder="공급자 또는 공급받는자 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img src="/icon/search.svg" />
          </div>
         
        </div>

        <div className="flex gap-2">
          <Button className="!text-body-md !font-normal w-[111px] h-[40px] bg-gray-500 hover:bg-gray-600 disabled:opacity-100 disabled:bg-gray-100">삭제하기</Button>
          <Button className="!text-body-md !font-normal w-[111px] h-[40px] bg-green-500 hover:bg-green-600 disabled:opacity-100 disabled:bg-green-200">임시 저장</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader className="h-[57px]">
          <TableRow>
            <TableHead></TableHead>
            <TableHead>번호</TableHead>
            <TableHead>공급자</TableHead>
            <TableHead>공급받는자</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>미리보기</TableHead>
            <TableHead>승인 여부</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow key={row.id} className="h-[68px]">
              <TableCell><Checkbox /></TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.provider}</TableCell>
              <TableCell>{row.receiver}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell className="text-blue-500 underline cursor-pointer">{row.preview}</TableCell>
              <TableCell className={row.status === "승인" ? "text-green-500" : "text-red-500"}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <button
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-gray-200" : ""}`}
              >
                {i + 1}
              </button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
