import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import ApprovalModal from "../../../shared/ui/ApprovalModal";
import EditApprovalModal from "../../../shared/ui/EditModal";
import { searchFileGetRequest } from "../service/SearchFileRequest";
import { useAuth } from "@/app/providers/AuthProvider";
import { ApiResponse, ContentItem } from "../model/SearchFIle.type";
import PreviewModal from "./PreviewModal";
import { FormatCreatedAt } from "@/shared/utils/FormatCreatedAt";
import { getStatusLabel } from "@/shared/utils/getStatusLabel";
import { TempSaveRequest } from "../service/TempSaveRequest";
import { DeleteRequest } from "../service/DeleteRequest";

const processStatuses = ["ALL", "UNAPPROVED", "APPROVED", "REJECTED"] as const; //전체, 검증실패, 승인, 반려
type ProcessStatus = (typeof processStatuses)[number];

type StatusCount = {
  ALL: number;
  UNAPPROVED: number;
  APPROVED: number;
  REJECTED: number;
};

export default function DataTable() {
  const [selectedProcessStatus, setselectedProcessStatus] = useState<ProcessStatus>("ALL");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // 선택된 cell 값들 저장
  // const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [selectedRowId, setSeletedRowId] = useState<number | null>(null);

  const { getUser } = useAuth();
  const itemsPerPage = 10; // 페이지별 아이템 개수

  const statusCounts: StatusCount = {
    ALL: data?.result.total || 0,
    UNAPPROVED: data?.result.unapproved || 0,
    APPROVED: data?.result.approved || 0,
    REJECTED: data?.result.rejected || 0,
  };

  const handleTempSave = async () => {
    const token = getUser();
    if (selectedRows.length === 0) {
      alert("저장할 항목을 선택하세요.");
      return;
    }
    if (!token) {
      console.error("인증 토큰이 없습니다.");
      return;
    }

    const taxInvoiceIdList = selectedRows
      .map(rowId => {
        const rowData = filteredData.find(row => row.id === rowId);
        return rowData?.id;
      })
      .filter(id => id !== undefined);
    try {
      await TempSaveRequest(taxInvoiceIdList as number[], token);
      alert("임시 저장이 완료되었습니다.");
      setSelectedRows([]);
      fetchData();
    } catch (error) {
      console.log("임시 저장 실패", error);
    }
  };

  const handleDelete = async () => {
    const token = getUser();
    if (selectedRows.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }
    if (!token) {
      console.error("인증 토큰이 없습니다.");
      return;
    }

    const taxInvoiceIdList = selectedRows
      .map(rowId => {
        const rowData = filteredData.find(row => row.id === rowId);
        return rowData?.id;
      })
      .filter(id => id !== undefined);

    try {
      await DeleteRequest(taxInvoiceIdList as number[], token);
      alert("삭제가 완료되었습니다.");
      setSelectedRows([]);
      fetchData();
    } catch (error) {
      console.log("삭제 실패", error);
      alert("삭제하는데 실패했습니다.");
    }
  };

  const fetchData = async () => {
    const token = getUser();
    if (!token) return; // `search`가 아닌 `poc`을 체크해야 함.
    try {
      const response = await searchFileGetRequest(
        token,
        search, // poc 값이 어디서 오는지 확인 필요
        selectedProcessStatus === "ALL" ? undefined : selectedProcessStatus,
        currentPage,
        itemsPerPage
      );
      setData(response);
    } catch (error) {
      console.log("검증내역 값을 가져오는데 실패", error);
    }
  };

  const openPreview = (url: string) => {
    setPreviewUrl(url);
    setIsPreviewOpen(true);
  };
  const truncateFileName = (fileName: string, maxLength = 20) => {
    if (fileName.length <= maxLength) return fileName;
    const extIndex = fileName.lastIndexOf(".");
    const ext = fileName.slice(extIndex); // 확장자 추출
    const baseName = fileName.slice(0, extIndex);
    return baseName.slice(0, maxLength - ext.length) + "..." + ext;
  };

  useEffect(() => {
    fetchData();
  }, [selectedProcessStatus, currentPage]);

  const filteredData = data?.result.page.content || [];
  const totalPages = data?.result.page.totalPages || 1;

  useEffect(() => {
    console.log("현재 state data 값:", data);
  }, [data]); // `data` 값이 변경될 때마다 로그 찍기

  const openModal = (row: ContentItem, index: number) => {
    // console.log("조회된 모달의 아이디입니다 : ", row.id);
    setSelectedIndex(String((currentPage - 1) * itemsPerPage + index + 1).padStart(3, "0"));
    setSeletedRowId(row.id);

    if (row.processStatus === "APPROVED") {
      setIsModalOpen(true);
    }
    if (row.processStatus === "UNAPPROVED") {
      setIsEditModalOpen(true);
    }
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev => (prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]));
  };

  return (
    <div className="p-[46px] bg-[#FFF] rounded-lg">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className="flex justify-between w-[156px] h-[40px] px-4 py-2 border rounded-lg text-gray-300">
              {getStatusLabel(selectedProcessStatus)} ({statusCounts[selectedProcessStatus as keyof StatusCount]})
              <img src={isDropdownOpen ? "/icon/activeDropdown.svg" : "/icon/dropdown.svg"} alt="dropdown" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[156px]">
              {processStatuses.map(processStatus => (
                <DropdownMenuItem
                  key={processStatus}
                  onClick={() => setselectedProcessStatus(processStatus)}
                  className="text-body-md">
                  <span>{getStatusLabel(processStatus)}</span>
                  <span className="text-gray-400">({statusCounts[processStatus as keyof StatusCount]})</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center w-[300px] h-[40px] border rounded-lg px-3">
            <Input
              className="w-full h-full !text-body-md placeholder:text-gray-300 border-none shadow-none"
              placeholder="공급자 또는 공급받는자 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <img src="/icon/search.svg" onClick={fetchData} className="cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-[15px]">
          <Button
            onClick={handleTempSave}
            className="!text-body-md-sb text-green-500 w-[111px] h-[40px] bg-[#FFF] border border-green-500 hover:bg-white disabled:opacity-100 disabled:bg-green-200">
            임시 저장
          </Button>
          <Button
            onClick={handleDelete}
            className="!text-body-md-sb text-[#FFF] w-[111px] h-[40px] bg-green-500 hover:bg-green-600 disabled:opacity-100 disabled:bg-gray-100">
            삭제하기
          </Button>
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
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <TableRow
                key={row.id}
                className={`h-[68px] ${selectedRows.includes(row.id) ? "bg-green-0 hover:bg-green-0" : ""}`}
                onClick={() => openModal(row, index)}>
                <TableCell className="w-[70px]">
                  <Checkbox
                    className="h-[24px] w-[24px] bg-gray-50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    checked={selectedRows.includes(row.id)}
                    onCheckedChange={() => toggleRowSelection(row.id)}
                    onClick={e => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell>{String((currentPage - 1) * itemsPerPage + index + 1).padStart(3, "0")}</TableCell>
                <TableCell>{row.suName}</TableCell>
                <TableCell>{row.ipName}</TableCell>
                <TableCell>{FormatCreatedAt(row.createdAt)}</TableCell>
                <TableCell
                  className="text-gray-300 underline cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    openPreview(row.url);
                  }}>
                  {truncateFileName(row.url)}
                </TableCell>
                <TableCell>
                  <Badge
                    custom={
                      ["APPROVED", "REJECTED", "UNAPPROVED"].includes(row.processStatus)
                        ? (row.processStatus as "APPROVED" | "REJECTED" | "UNAPPROVED")
                        : undefined
                    }>
                    {getStatusLabel(row.processStatus)}
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
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        index={selectedIndex}
        rowId={selectedRowId}
      />
      <EditApprovalModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        index={selectedIndex}
        rowId={selectedRowId}
      />
      <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} fileUrl={previewUrl!} />

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <button
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-[2px] hover:bg-gray-50 ${currentPage === i + 1 ? "bg-green-50 text-green-500" : "text-gray-300"}`}>
                {i + 1}
              </button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
