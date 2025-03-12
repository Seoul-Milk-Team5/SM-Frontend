function Title() {
  function goBack() {
    window.history.back();
  }

  return (
    <div className="w-[50%] flex gap-5 mb-[60px]">
      <img src="/icon/leftArrow.svg" alt="뒤로가기" onClick={goBack} className="cursor-pointer" />
      <h1 className="text-title-lg font-bold">비밀번호 변경</h1>
    </div>
  );
}

export default Title;
