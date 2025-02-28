import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const statuses = ["승인", "반려", "검증 실패", "수정됨"];

const data = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  supplier: "서울우유 강동지점",
  recipient: "파리바게트 수원역점",
  date: "25. 06. 14",
  preview: "IMG_45678910",
  status: statuses[i % statuses.length],
}));

export default function DataTable() {
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [search, setSearch] = useState("");

  // 검색 및 필터링된 데이터
  const filteredData = data.filter((item) => {
    const matchesStatus = selectedStatus === "전체" || item.status === selectedStatus;
    const matchesSearch =
      search === "" ||
      item.supplier.includes(search) ||
      item.recipient.includes(search);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* 상단 컨트롤 영역 */}
      <div className="flex justify-between mb-4">
        {/* 상태 필터 드롭다운 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {selectedStatus} <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["전체", ...statuses].map((status) => (
              <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 검색 바 */}
        <Input
          placeholder="공급자 또는 공급받는자 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />

        {/* 삭제 & 임시 저장 버튼 */}
        <div className="flex gap-2">
          <Button variant="destructive">삭제하기</Button>
          <Button variant="default">임시 저장</Button>
        </div>
      </div>

      {/* 데이터 테이블 */}
      <Table>
        <TableHeader className="h-[57px] !text-body-sm text-gray-700">
          <TableRow>
            <TableHead>공급자</TableHead>
            <TableHead>공급받는자</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>미리보기</TableHead>
            <TableHead>승인 여부</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.slice(0, 10).map((item) => (
            <TableRow key={item.id} className="h-[68px] !text-body-md text-gray-800">
              <TableCell>{item.supplier}</TableCell>
              <TableCell>{item.recipient}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-blue-500 cursor-pointer">{item.preview}</TableCell>
              <TableCell>
                <span className={
                  item.status === "승인" ? "text-green-600" :
                  item.status === "반려" ? "text-red-500" :
                  item.status === "검증 실패" ? "text-gray-500" : "text-yellow-500"
                }>
                  {item.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 페이지네이션 UI */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationPrevious href="#" />
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationNext href="#" />
        </PaginationContent>
      </Pagination>
    </div>
  );
}
