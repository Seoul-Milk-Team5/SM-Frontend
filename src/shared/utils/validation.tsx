// 비밀번호 형식 validate
export function validatePassword(password: string): { valid: boolean; message?: string } {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;
  
    if (!regex.test(password)) {
      return { valid: false, message: "비밀번호 양식을 확인해주세요." };
    }
  
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password)) {
      return { valid: false, message: "비밀번호에 한글을 포함할 수 없습니다." };
    }
  
    return { valid: true };

}

// 비밀번호 확인 validate
export function validateConfirmPassword(password: string, confirmPassword: string) {
  if(password !== confirmPassword) {
    return { valid: false, message: "비밀번호가 일치하지 않습니다."};
  }
  return { valid: true };
}
