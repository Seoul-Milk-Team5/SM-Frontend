function Description() {
  return (
    <div className="w-[50%] text-sm text-gray-400 flex flex-col gap-1 mt-10 font-[400]">
      <div className="flex gap-2.5 items-center">
        <img src="/icon/check.svg" alt="" />
        <p>인증 이메일은 서울우유 사내 메일 주소만 가능합니다.</p>
      </div>
      <div className="flex gap-2.5 items-center">
        <img src="/icon/check.svg" alt="" />
        <p>정보 보안을 위해 5분에 한 번만 비밀번호를 변경할 수 있습니다.</p>
      </div>
      <div className="flex gap-2.5 items-center">
        <img src="/icon/check.svg" alt="" />
        <p>비밀번호는 영어 대/소문자, 숫자, 특수문자 1개 이상 포함, 최소 8자 이상 ~ 16자 이하여야 합니다.</p>
      </div>
    </div>
  );
}

export default Description;
