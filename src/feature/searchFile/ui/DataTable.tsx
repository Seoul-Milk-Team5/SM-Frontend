import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import ApprovalModal from "./ApprovalModal";

const statuses = ["전체", "승인", "반려", "검증실패", "수정됨"];

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  provider: "서울우유 강동지점",
  receiver: "파리바게트 수원역점",
  date: "25. 06. 14",
  preview: "IMG_45678910",
  status: ["승인", "반려", "검증실패", "수정됨"][i % 4],
}));

export default function DataTable() {
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // 선택된 cell 값들 저장
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10; // 페이지별 아이템 개수

  // 상태별 개수 계산(페이지 쿼리로 10개씩 요청하면 구현 불가능, 아니면 한번에 가져와야 함)
  const statusCounts = statuses.reduce((acc, status) => {
    acc[status] = status === "전체" ? data.length : data.filter((item) => item.status === status).length;
    return acc;
  }, {} as Record<string, number>);

  const filteredData = data.filter(
    (item) =>
      (selectedStatus === "전체" || item.status === selectedStatus) &&
      (item.provider.includes(search) || item.receiver.includes(search))
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const openModal = (row: typeof data[number]) => {
    if(row.status === "승인") {
      setIsModalOpen(true);
    }
  }

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
    prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  }

  return (
    <div className="p-[46px] bg-[#FFF] rounded-lg">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="flex justify-between w-[156px] h-[40px] px-4 py-2 border rounded-lg text-gray-300">
              {selectedStatus} ({statusCounts[selectedStatus]})
              <img src={isDropdownOpen ? "/icon/activeDropdown.svg" : "/icon/dropdown.svg"} alt="dropdown" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[156px]">
              {statuses.map((status) => (
              <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)} className="text-body-md">
                  <span>{status}</span>
                  <span className="text-gray-400">({statusCounts[status]})</span>
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

        <div className="flex gap-[15px]">
          <Button className="!text-body-md-sb text-green-500 w-[111px] h-[40px] bg-[#FFF] border border-green-500 hover:bg-green-600 disabled:opacity-100 disabled:bg-green-200">임시 저장</Button>
          <Button className="!text-body-md-sb text-[#FFF] w-[111px] h-[40px] bg-green-500 hover:bg-green-600 disabled:opacity-100 disabled:bg-gray-100">삭제하기</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader className="h-[57px] pointer-events-none">
          <TableRow>
            <TableHead></TableHead>
            <TableHead>번호</TableHead>
            <TableHead>공급자</TableHead>
            <TableHead>공급받는자</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>미리보기</TableHead>
            <TableHead>승인여부</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow 
              key={row.id} 
              className={`h-[68px] ${selectedRows.includes(row.id) ? "bg-green-50 hover:bg-green-0" : ""}`}
              onClick={() => openModal(row)}
            >
              <TableCell className="w-[70px]">
                <Checkbox 
                  className="h-[24px] w-[24px] bg-gray-50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  checked={selectedRows.includes(row.id)}
                  onCheckedChange={() => toggleRowSelection(row.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.provider}</TableCell>
              <TableCell>{row.receiver}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell className="text-gray-300 underline cursor-pointer">{row.preview}</TableCell>
              <TableCell>
                <Badge custom={["승인", "반려", "검증실패", "수정됨"].includes(row.status) ? (row.status as "승인" | "반려" | "검증실패" | "수정됨") : undefined}>{row.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ApprovalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <button
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-[2px] hover:bg-gray-50 ${currentPage === i + 1 ? "bg-green-50 text-green-500" : "text-gray-300"}`}
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
