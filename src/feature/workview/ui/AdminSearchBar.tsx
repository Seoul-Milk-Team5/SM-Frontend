import { useSearch } from "@/app/providers/UserSearchProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePickerWithRange from "@/shared/ui/DatePickerWithRange";
import { getStatusLabel } from "@/shared/utils/getStatusLabel";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function AdminSearchbar() {
  const { setFilters } = useSearch();
  const [filter, setFilter] = useState({
    period: null as number | null,
    provider: "",
    consumer: "",
    name: "",
    status: null as string | null,
    page: 1,
    size: 10,
    startDate: undefined as Date | undefined ,
    endDate: undefined as Date | undefined,
  });

  const initialFilter = {
    period: null,
    provider: "",
    consumer: "",
    name: "",
    status: null,
    page: 1,
    size: 10,
    startDate: undefined,
    endDate: undefined,
  };

  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [isCustomDateSelected, setIsCustomDateSelected] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<string | null>("전체");

  // period 선택
  const handlePeriodSelect = (limit: number | null) => {
    setSelectedPeriod(limit);
    setIsCustomDateSelected(false);
    setFilter((prev) => ({
      ...prev,
      period: limit,
    }));
  };

  // 공급자와 소비자 입력값 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,  // 필터 상태에서 직접 업데이트
    }));
  };

  const handleApprovalSelect = (status: string) => {
    if (status === "ALL") {
      setSelectedApproval("ALL");
      setFilter((prev) => ({
        ...prev,
        status: null,
      }));
    } else {
      setSelectedApproval(status);
      setFilter((prev) => ({
        ...prev,
        status,
      }));
    }
  };
  

  const handleReset = () => {
    setSelectedPeriod(null);
    setIsCustomDateSelected(false);
    setSelectedApproval("전체");
    setFilter(initialFilter);
    setFilters(initialFilter);
  };

  const isDisabled =
    selectedPeriod === null &&
    !isCustomDateSelected &&
    selectedApproval === "전체" &&
    filter.provider.trim() === "" &&
    filter.consumer.trim() === "" &&
    filter.name.trim() === "";

  const handleSearchFilter = () => {
    setFilters(filter);
  };

// DatePickerWithRange에서 날짜 범위 선택 후 filter 업데이트
const handleDateRangeChange = (range: DateRange | undefined) => {
  setFilter((prev) => ({
    ...prev,
    startDate: range?.from,
    endDate: range?.to,
    period: null, // 날짜를 직접 선택하면 period 초기화
  }));
  setIsCustomDateSelected(true);
  setSelectedPeriod(null);
};

  return (
    <div>
      <div className="flex mt-6 justify-between">
        <div className="flex w-[200px] gap-2 items-center">
          <img src="/icon/search.svg" className="w-[24px]" />
          <span className="text-title-sm text-gray-800">필터 검색</span>
        </div>
        <div className="flex gap-[15px]">
          <Button
            className="text-green-500 bg-[#FFF] border border-green-500 py-3.5 px-5 hover:bg-white disabled:opacity-100 disabled:border-gray-100 disabled:text-gray-300"
            onClick={handleReset}
            disabled={isDisabled}
          >
            옵션 초기화
          </Button>
          <Button
            className="!text-[#FFF] bg-green-500 py-3.5 px-6 hover:bg-green-600 disabled:opacity-100 disabled:bg-gray-100 disabled:text-[#FFF]"
            disabled={isDisabled}
            onClick={handleSearchFilter}
          >
            조회하기
          </Button>
        </div>
      </div>
      <div className="w-full bg-gray-0 h-1.5 mb-7 mt-4"></div>
      {/* 날짜 */}
      <div className="flex space-x-[32px] items-center">
        <span className="text-body-md-m text-gray-500">날짜</span>
        <div className="flex gap-4">
          <div className="flex gap-2">
            {[1, 3, 6].map((month) => (
              <Button
                key={month}
                onClick={() => handlePeriodSelect(month)}
                disabled={isCustomDateSelected}
                className={`border ${
                  selectedPeriod === month
                    ? "text-green-500 border-green-500"
                    : "text-gray-800 border-gray-100"
                } bg-[#FFF] hover:bg-white disabled:text-gray-300 disabled:border-gray-200`}
              >
                {month}개월
              </Button>
            ))}
          </div>
        </div>
        <DatePickerWithRange
          date={{ from: filter.startDate, to: filter.endDate }}
          onSelect={handleDateRangeChange} // `handleDateRangeChange`를 전달
        />

      </div>
      {/* 공급자 */}
      <div className="flex space-x-7 mt-7">
        <div className="flex space-x-[68px] items-center">
          <span className="text-body-md-m text-gray-500">공급자</span>
          <Input
            name="provider" // 필드명을 filter에 맞춰 설정
            placeholder="상호 (법인명)"
            value={filter.provider} // filter에서 가져온 값을 사용
            onChange={handleInputChange}
            className="w-[232px] h-[40px] border-gray-100"
          />
        </div>
        <div className="flex space-x-[30px] items-center">
          <span className="text-body-md-m text-gray-500">공급받는자</span>
          <Input
            name="consumer" // 필드명을 filter에 맞춰 설정
            placeholder="상호 (법인명)"
            value={filter.consumer} // filter에서 가져온 값을 사용
            onChange={handleInputChange}
            className="w-[232px] h-[40px] border-gray-100"
          />
        </div>
        <div className="flex space-x-[30px] items-center">
          <span className="text-body-md-m text-gray-500">담당자</span>
          <Input
            name="name" // 필드명을 filter에 맞춰 설정
            placeholder="담당 직원 이름"
            value={filter.name} // filter에서 가져온 값을 사용
            onChange={handleInputChange}
            className="w-[122px] h-[40px] border-gray-100"
          />
        </div>
      </div>
      {/* 승인 여부 */}
      <div className="flex space-x-[48px] mt-7 items-center">
        <span className="text-body-md-m text-gray-500">승인 여부</span>
        <div className="flex gap-2 mt-2">
          {["ALL", "APPROVED", "REJECTED", "UNAPPROVED"].map((status) => (
            <Button
              key={status}
              onClick={() => handleApprovalSelect(status)}
              className={`border ${
                selectedApproval === status
                  ? "text-green-500 border-green-500"
                  : "text-gray-800 border-gray-100"
              } bg-[#FFF] hover:bg-white w-[72px] h-[39px]`}
            >
              {getStatusLabel(status as "ALL"| "APPROVED" | "REJECTED" | "UNAPPROVED")}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gray-0 h-1.5 mb-7 mt-4"></div>
    </div>
  );
}
