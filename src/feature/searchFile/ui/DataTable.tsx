import { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { FormatCreatedAt } from "@/shared/utils/FormatCreatedAt";
import { getStatusLabel } from "@/shared/utils/getStatusLabel";
import { DeleteRequest } from "../service/DeleteRequest";
import { StepProvider } from "@/app/providers/StepProvider";
import PreviewModal from "@/shared/ui/PreviewModal";
import { useToast } from "@/app/providers/ToastProvider";
import Errorconform from "@/shared/ui/Alert/Errorconform";
import StatusTooltip from "@/shared/ui/Tooltip/StatusTooltip";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [selectedRowId, setSeletedRowId] = useState<number | null>(null);

  const { getUser } = useAuth();
  const { addToast } = useToast();
  const itemsPerPage = 10; // 페이지별 아이템 개수

  const statusCounts: StatusCount = {
    ALL: data?.result.total || 0,
    UNAPPROVED: data?.result.unapproved || 0,
    APPROVED: data?.result.approved || 0,
    REJECTED: data?.result.rejected || 0,
  };

  const handleDelete = async () => {
    const token = getUser();
    if (selectedRows.length === 0) {
      addToast("삭제할 항목을 선택하세요.", "error");
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
      setSelectedRows([]);
      fetchData();
    } catch (error) {
      console.log("삭제 실패", error);
    }
  };

  const fetchData = useCallback(async () => {
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
  }, [search, selectedProcessStatus, currentPage, itemsPerPage]);

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

  const openModal = (row: ContentItem, index: number) => {
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

  const toggleSelectAll = () => {
    setSelectedRows(prev => {
      const currentPageRowIds = filteredData.map(row => row.id);
      return prev.length === currentPageRowIds.length ? [] : currentPageRowIds;
    });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  }
    

  return (
    <div className=" bg-[#FFF] rounded-lg">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className="flex justify-between w-[156px] h-[40px] px-4 py-2 border rounded-lg text-gray-300 cursor-pointer">
              {getStatusLabel(selectedProcessStatus)} ({statusCounts[selectedProcessStatus as keyof StatusCount]})
              <img src={isDropdownOpen ? "/icon/activeDropdown.svg" : "/icon/dropdown.svg"} alt="dropdown" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[156px]">
              {processStatuses.map(processStatus => (
                <DropdownMenuItem
                  key={processStatus}
                  onClick={() => setselectedProcessStatus(processStatus)}
                  className="text-body-md flex items-center gap-x-1">
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
            <img
              src={search ? "/icon/activeSearch.svg" : "/icon/search.svg"}
              className="cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          <StatusTooltip />
        </div>

        <div className="flex gap-[15px]">
          <Errorconform 
            btnName="삭제하기"
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
            className="py-3.5 px-6 bg-green-500 hover:bg-green-600 text-[#FFF] disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
      </div>

      <Table>
        <TableHeader className="h-[57px]">
          <TableRow>
            <TableHead>
            <Checkbox
              checked={filteredData.length > 0 && filteredData.every(row => selectedRows.includes(row.id))}
              onCheckedChange={toggleSelectAll}
              className="h-[24px] w-[24px] bg-gray-50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
            </TableHead>
            <TableHead>번호</TableHead>
            <TableHead>공급자</TableHead>
            <TableHead>공급받는자</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>미리보기</TableHead>
            <TableHead className="text-center">승인여부</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <TableRow
                key={row.id}
                className={`h-[68px] cursor-pointer ${selectedRows.includes(row.id) ? "bg-green-0 hover:bg-green-0" : ""}`}
                onClick={() => openModal(row, index)}>
                <TableCell className="w-[70px]">
                  <Checkbox
                    className="h-[24px] w-[24px] bg-gray-50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 cursor-pointer"
                    checked={selectedRows.includes(row.id)}
                    onCheckedChange={() => toggleRowSelection(row.id)}
                    onClick={e => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell>{String((currentPage - 1) * itemsPerPage + index + 1).padStart(3, "0")}</TableCell>
                <TableCell>{row.suBusinessName}</TableCell>
                <TableCell>{row.ipBusinessName}</TableCell>
                <TableCell>{FormatCreatedAt(row.createdAt)}</TableCell>
                <TableCell
                  className="text-gray-300 underline cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    openPreview(row.url);
                  }}>
                  {truncateFileName(row.url)}
                </TableCell>
                <TableCell className="flex justify-center">
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
      {/* 모달 */}
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        index={selectedIndex}
        rowId={selectedRowId}
      />
      <StepProvider>
        <EditApprovalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          index={selectedIndex}
          rowId={selectedRowId}
          dataTableFetch={fetchData}
        />
      </StepProvider>
      <PreviewModal
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        fileUrl={previewUrl!} 
      />

      {/* 페이지네이션 */}
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
