import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";

import ApprovalModal from "@/shared/ui/ApprovalModal";
import EditApprovalModal from "@/shared/ui/EditModal";


const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  provider: "서울우유 강동지점",
  receiver: "파리바게트 수원역점",
  date: "25. 06. 14",
  preview: "IMG_45678910",
  status: ["승인", "반려", "검증실패"][i % 3],
}));

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // 선택된 cell 값들 저장
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const itemsPerPage = 10; // 페이지별 아이템 개수
  
  const filteredData = data;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const openModal = (row: typeof data[number]) => {
    if(row.status === "승인") {
      setIsModalOpen(true);
    }
    if(row.status === "검증실패") {
      setIsEditModalOpen(true);
    }
  }

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
    prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  }

  return (
    <div className="p-[20px] bg-[#FFF] rounded-lg">
      <div className="flex justify-between mb-7">
        <span className="text-title-sm text-gray-800">검증 내역</span>
        <Button
          className="w-[120px] h-[40px] bg-green-500 hover:bg-green-600 !text-body-md-sb text-[#FFF] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedRows.length === 0}
        >
        내보내기
        </Button>
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
          {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow 
                  key={row.id} 
                  className={`h-[68px] ${selectedRows.includes(row.id) ? "bg-green-0 hover:bg-green-0" : ""}`}
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
                      {row.status}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center pt-[100px] pb-[130px] gap-7">
                  <img className="w-[80px]" src="/icon/noResult.svg" alt="검색결과 없음" />
                  <p className="text-body-sm text-gray-300">업로드된 세금계산서 파일이 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            </TableBody>

      </Table>
      <ApprovalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      <EditApprovalModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}/>

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
