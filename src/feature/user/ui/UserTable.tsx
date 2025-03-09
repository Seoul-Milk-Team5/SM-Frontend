import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { getStatusLabel } from "@/shared/utils/getStatusLabel";
import { useAuth } from "@/app/providers/AuthProvider";
import { useSearch } from "@/app/providers/UserSearchProvider";
import { OcrSearchRequest } from "@/shared/api";
import { ApiResponse, InvoiceContent } from "@/shared/model";
import { TruncateFileName } from "@/shared/utils";


export default function UserTable() {
  const { getUser } = useAuth();
  const { getSearchParams } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // 선택된 cell 값들 저장
  const [data, setData] = useState<InvoiceContent[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0); // 총 페이지 수
  const [totalElements, setTotalElements] = useState<number>(0); // 총 데이터 개수
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const itemsPerPage = 10; // 페이지별 아이템 개수

  const fetchData = async () => {
    const searchParams = getSearchParams();
    const token = getUser();
    try{
      const response = await OcrSearchRequest(token, searchParams);
      const data = response.result.content;
      setData(data);
      setTotalElements(response.result.totalElements);
      setTotalPages(response.result.totalPages);
    } catch (error) {
      console.log("업무 데이터를 불러오는데 실패했습니다.", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, getSearchParams]); // 페이지가 바뀌거나 params를 바꾼뒤 조회를 누르면 fetch
  

//   const openModal = (row: typeof data[number]) => {
//     if(row.status === "승인") {
//       setIsModalOpen(true);
//     }
//     if(row.status === "검증실패") {
//       setIsEditModalOpen(true);
//     }
//   }

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
          {data.length > 0 ? (
              data.map((row) => (
                <TableRow 
                  key={row.id} 
                  className={`h-[68px] ${selectedRows.includes(row.id) ? "bg-green-0 hover:bg-green-0" : ""}`}
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
                  <TableCell>{row.ipName}</TableCell>
                  <TableCell>{row.suName}</TableCell>
                  <TableCell>{row.erDat}</TableCell>
                  <TableCell className="text-gray-300 underline cursor-pointer">
                    {TruncateFileName(row.imageUrl)}
                  </TableCell>
                  <TableCell>
                    <Badge custom={
                      ["APPROVED", "REJECTED", "UNAPPROVED"].includes(row.status)
                        ? (row.status as "APPROVED" | "REJECTED" | "UNAPPROVED")
                        : undefined
                    }>
                      {getStatusLabel(row.status as "APPROVED" | "REJECTED" | "UNAPPROVED")}
                                  
                    </Badge>
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
