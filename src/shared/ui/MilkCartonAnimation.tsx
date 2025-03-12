import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../milkCarton.json"; // JSON 파일 import

export default function MilkCartonAnimation() {
  const [play, setPlay] = useState(true);

  useEffect(() => {
    // 일정 시간 후 다시 실행하여 무한 루프 효과
    const interval = setInterval(() => {
      setPlay(false);
      setTimeout(() => setPlay(true), 100); // 0.1초 후 재생 재시작
    }, 2000); // 2초마다 루프 (필요에 따라 조절)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center w-[120px]">
      <Lottie animationData={animationData} loop={true} autoplay={play} className="w-64 h-40" />
    </div>
  );
}
