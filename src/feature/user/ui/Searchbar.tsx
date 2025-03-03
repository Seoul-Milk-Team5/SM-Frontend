import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePickerWithRange from "@/shared/ui/DatePickerWithRange";
import { useState } from "react";

export default function Searchbar() {
  const [filter, setFilter] = useState({
    date: { limit: 0, from: new Date(), to: new Date() },
    companyName: "",
    fileType: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [isCustomDateSelected, setIsCustomDateSelected] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<string | null>("전체");

  const [name, setName] = useState({
    suBusinessName: "",
    ipBusinessName: "",
  });

  const handlePeriodSelect = (limit: number) => {
    setSelectedPeriod(limit);
    setIsCustomDateSelected(false);
    setFilter((prev) => ({
      ...prev,
      date: { limit, from: new Date(), to: new Date() },
    }));
  };

  const handleCustomDateSelect = () => {
    setSelectedPeriod(null);
    setIsCustomDateSelected(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApprovalSelect = (status: string) => {
    setSelectedApproval(status);
  };

  const handleReset = () => {
    setSelectedPeriod(null);
    setIsCustomDateSelected(false);
    setSelectedApproval("전체");
    setName({ suBusinessName: "", ipBusinessName: "" });
    setFilter({ date: { limit: 0, from: new Date(), to: new Date() }, companyName: "", fileType: "" });
  };

  // 버튼 비활성화 여부를 계산하는 조건
  const isDisabled =
    selectedPeriod === null &&
    !isCustomDateSelected &&
    selectedApproval === "전체" &&
    name.suBusinessName.trim() === "" &&
    name.ipBusinessName.trim() === "";

  return (
    <div>
      <div className="pb-2 border-b-3 hover:underline text-title-md-b border-gray-800 text-gray-800 w-[78px] h-[42px]">
        업무 조회
      </div>
      <div className="flex mt-6 justify-between">
        <div className="flex w-[200px] gap-2 items-center">
          <img src="/icon/search.svg" className="w-[24px]" />
          <span className="text-title-sm text-gray-800">필터 검색</span>
        </div>
        <div className="flex gap-2">
          <Button
            className="!text-body-md-sb text-green-500 bg-[#FFF] border border-green-500 h-[40px] w-[120px] hover:bg-white disabled:opacity-100 disabled:border-gray-300 disabled:text-gray-300"
            onClick={handleReset}
            disabled={isDisabled}
          >
            옵션 초기화
          </Button>
          <Button
            className="!text-[#FFF] bg-green-500 h-[40px] w-[120px] hover:bg-green-600 !text-body-md-sb disabled:opacity-100 disabled:bg-gray-100 disabled:text-[#FFF]"
            disabled={isDisabled}
          >
            조회하기
          </Button>
        </div>
      </div>
      <div className="w-full bg-gray-0 h-1.5 mb-7 mt-4"></div>
      {/* 날짜 */}
      <div className="flex space-x-[82px] items-center">
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
          <DatePickerWithRange
            date={filter.date}
            setFilter={setFilter}
            disabled={selectedPeriod !== null}
            onSelect={handleCustomDateSelect}
          />
        </div>
      </div>
      {/* 공급자 */}
      <div className="flex space-x-7 mt-7">
        <div className="flex space-x-[68px] items-center">
          <span className="text-body-md-m text-gray-500">공급자</span>
          <Input
            name="suBusinessName"
            placeholder="상호 (법인명)"
            value={name.suBusinessName}
            onChange={handleInputChange}
            className="w-[313px] h-[40px]"
          />
        </div>
        <div className="flex space-x-[30px] items-center">
          <span className="text-body-md-m text-gray-500">공급받는자</span>
          <Input
            name="ipBusinessName"
            placeholder="상호 (법인명)"
            value={name.ipBusinessName}
            onChange={handleInputChange}
            className="w-[313px] h-[40px]"
          />
        </div>
      </div>
      {/* 승인 여부 */}
      <div className="flex space-x-[48px] mt-7 items-center">
        <span className="text-body-md-m text-gray-500">승인 여부</span>
        <div className="flex gap-2 mt-2">
          {["전체", "승인", "반려", "검증실패"].map((status) => (
            <Button
              key={status}
              onClick={() => handleApprovalSelect(status)}
              className={`border ${
                selectedApproval === status
                  ? "text-green-500 border-green-500"
                  : "text-gray-800 border-gray-100"
              } bg-[#FFF] hover:bg-white w-[72px] h-[39px]`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gray-0 h-1.5 mb-7 mt-4"></div>
    </div>
  );
}
