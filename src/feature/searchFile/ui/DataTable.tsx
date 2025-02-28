import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Badge from "./badge";

type TableItem = {
    id: number;
    supplier: string;
    recipient: string;
    date: string;
    preview: string;
    status: "승인" | "반려" | "미승인";
};
  

const data: TableItem[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    supplier: "서울우유 강동지점",
    recipient: "파리바게트 수원역점",
    date: "25. 06. 14",
    preview: "IMG_45678910",
    status: ["승인", "반려", "미승인"][Math.floor(Math.random() * 3)] as "승인" | "반려" | "미승인",
  }));
  

export default function DataTable() {
  const [filteredStatus, setFilteredStatus] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter((item) =>
    (filteredStatus === "전체" || item.status === filteredStatus) &&
    item.supplier.includes(searchQuery)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#FFF] p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          {["전체", "승인", "반려", "미승인"].map((status) => (
            <Button key={status} variant={filteredStatus === status ? "default" : "outline"} onClick={() => setFilteredStatus(status)}>
              {status}
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="공급자 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="destructive">삭제하기</Button>
        </div>
      </div>

      <Table>
        <TableHeader className="h-[57px] font-normal text-sm">
          <TableRow>
            <TableHead>
              <input type="checkbox" />
            </TableHead>
            <TableHead>공급자</TableHead>
            <TableHead>공급받는자</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>미리보기</TableHead>
            <TableHead>승인 여부</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id} className="h-[68px] font-normal text-sm text-gray-800">
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>{item.recipient}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.preview}</TableCell>
              <TableCell>
                <Badge status={item.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
