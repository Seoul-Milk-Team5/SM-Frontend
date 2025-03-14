![KakaoTalk_Photo_2025-03-13-21-32-05](https://github.com/user-attachments/assets/48edf665-bff6-4f1e-bfab-3c1cf1a87149)

# 🥛 프로젝트 소개 및 문제점 파악
> 본 프로젝트는 서울우유와 큐시즘이 협력하여 진행한 기업 프로젝트입니다.

서울우유의 대리점 세금계산서 검증 및 지급결의서 작성 과정을 자동화하여 업무 생산성을 향상하고, 휴먼 오류를 방지하여 데이터의 정확성을 높이는 것을 목표로 합니다.

현재 서울우유에서는 전자세금계산서의 진위 여부를 담당 직원이 수작업으로 검증하고 있으며, 이 과정에서 휴먼 에러 발생 가능성과 반복적인 업무로 인한 비효율성이 문제가 되고 있습니다.

이를 해결하기 위해 저희는 OCR 기술과 진위 여부 검증 API를 활용하여 전자세금계산서 검증을 자동화하고 업무 효율성을 높이며 휴먼 에러를 최소화하는 백오피스 서비스 프로젝트를 개발하였습니다.

<br/>
<br/>

## 😮‍💨 어떤 고민인가요?

대리점에게 매월 1500건이 넘는 세금 계산서를 받아 진위여부를 확인하고, 
지급결의서를 작성하는 과정을 **직접 수동으로 하고 있어 불편해요.**

<br/>
<br/>

## 🔄 기존 업무 프로세스 요약

![image](https://github.com/user-attachments/assets/cc120c37-77fb-476a-954f-ae737da2e823)

1. 서울우유의 **대리점은 마트, 슈퍼에 납품**을 합니다.
2. 본사에서는 판매량 증가를 통한 이윤 상승을 위해
    
    → **대리점이 저렴하게 납품을 하도록 합니다.** (할인해서 납품)
    
3. 이후 **대리점은 납품한 내역(세금계산서)을 본사에 제출**합니다.
4. 본사는 국세청 홈택스 사이트에서 세금계산서의 ***진위여부를 확인**합니다.
5. 맞다면, ****지급결의서를 작성**합니다.
6. 이후 본사에서는 **지급결의서의 내용대로 대리점에게 금액을 지급**합니다.

<br/>
<br/>

# 🌟 솔루션
> **[6-1] 파일 업로드**
> 

![1  파일업로드](https://github.com/user-attachments/assets/0b9c1c59-13bf-4db7-bb9e-2b4517031fc8)

<aside>

**“원하는 파일을 올려두기만 하세요. 검증을 위한 준비가 끝났어요.”**

- PC/모바일 환경 모두 최대 50개 파일 업로드 가능합니다. 본사 직원의 불필요한 업무량을 줄이고, 자동화로 인한 간편인증 등의 불편함을 최대한 없애고자 했습니다.
- 임시저장 기능을 추가하여, 사용자가 파일 업로드 중 파일을 저장하고 추후 업로드를 이어서 진행할 수 있도록 했습니다.
- 파일 개수에 따른 예상 검증 시간을 제공하여 사용자가 대략적인 업무 시간을 예측 가능하게 했습니다.
- 업로드 된 파일은 삭제가 가능합니다.
- Cross Browsing을 지원하며, 모바일에서 직접 촬영을 포함한 파일 업로드 기능을 사용할 수 있습니다.
</aside>

> **[6-2] 검증**
> 

![2  검증](https://github.com/user-attachments/assets/da76fb1a-9da5-4a13-9a6f-2e1698d28add)

<aside>

**“로그인만 하세요! 나머지는 저희가 할게요.”**

- OCR 기술을 활용하여 이미지에서 텍스트 추출을 진행합니다.
- 간편인증 로그인으로 편리하게 홈택스 서비스에 로그인 가능합니다.
- CODEF API를 활용하여 데이터 정확성 & 유효성 검증을 진행합니다.
</aside>

> **[6-3] 저장**
>

![3  저장](https://github.com/user-attachments/assets/1edc2814-9361-4920-ae72-b8cb9c569e7d)


<aside>

**“파일 검증 후 필수 컬럼 자동 저장! 지급결의서 작성을 더 간편하게.”**

- 검증된 세금계산서의 필수컬럼은 자동으로 DB에 저장됩니다.
- 승인, 반려, 검증 실패 3개의 케이스로 저장되어 케이스를 나누어 관리할 수 있습니다.
- 내보내기 기능을 이용해 엑셀로 필수 컬럼을 내보낼 수 있습니다.
</aside>

> **[6-4] 조회**
> 

![4  조회](https://github.com/user-attachments/assets/827c276f-a0b3-4e22-a3e3-e2fcaaabdbf8)


<aside>

**“검증 후 수정까지 한번에! 내 업무를 더 체계적으로 관리해요”**

- 검증 직후 수정 및 관리가 가능한 검증 내역 탭에서 1차적인 업무 관리를 진행할 수 있습니다. 검증 내역탭은 최근 100개의 파일을 조회 및 수정할 수 있습니다.
- 내 업무 관리 페이지를 통해 총 1년간의 데이터를 조회할 수 있습니다.
- 세분화된 필터를 활용해 내가 원하는 파일들만 골라서 확인할 수 있습니다.
- 승인 상태 가이드라인을 통해 승인 여부에 따른 테스크를 확인할 수 있습니다.
</aside>

<br/>
<br/>

## 7. 기대효과

![기대효과](https://github.com/user-attachments/assets/4f28ee99-78aa-400b-a988-0ab5249776a2)

<aside>

**1. 자동화로 인한 업무 효율성 98% 증가 (기존 50개 문서 검증 시간 250분 → 개선 시간 5분)**

→ UT 결과(반려 46건, 승인 1건, 검증 실패 3건) 평균 업무 시간이 5분으로 감소하였으며, 이에 따라 업무 효율성이 98% 향상되었습니다. 

1. **에러율 감소로 인한 지급결의서 수정 프로세스 감소**[기존 0.67%(1500/10) → 0%(300/0)] 
→ UT 결과(반려 46건, 승인 1건, 검증 실패 3건 * 검증 정확도 테스트 6회 진행) 업로드 파일 결과값의 Input, Output 모두 동일하게 측정됨을 확인하였습니다.
2. **효율적인 업무 관리로 인한 사내 업무 생산성 향상**
→ 권한에 따라 다른 내 [업무 관리 페이지]를 통해 효율적 업무 관리가 가능합니다.
→ 일반 사용자 [ 내 업무 관리 ] , 관리자 [ 업무 관리 ] , [사용자 권한 관리 ] 
</aside>

<br/>
<br/>

# ⭐ Team
## 🌃 FE Developer

| 윤병현 | 노성균 |
| --- | --- |
| <p align="center"><img src="https://avatars.githubusercontent.com/78-artilleryman" width="100" height="100" style="border-radius: 5%;"></p><p align="center"><a href="https://github.com/78-artilleryman"><img src="https://img.shields.io/badge/78-artilleryman-181717?style=for-the-social&logo=github&logoColor=white"/></a></p> | <p align="center"><img src="https://avatars.githubusercontent.com/RohSungKyun" width="100" height="100" style="border-radius: 5%;"></p><p align="center"><a href="https://github.com/RohSungKyun"><img src="https://img.shields.io/badge/RohSungKyun-181717?style=for-the-social&logo=github&logoColor=white"/></a></p> |

| 🔗프론트엔드 | 윤병현 | 프론트엔드 리드, 배포 환경 설정, 세금계산서 OCR & 진위여부 기능 구현, 비밀번호 변경 기능 구현, 모바일 기능 구현|
| --- | --- | --- |
| 🔗프론트엔드 | 노성균 | 로그인 기능 구현, 검증내역 기능 구현, 내 업무 조회 기능 구현, 관리자 기능 구현|

</br>

# 🏦 Architecture
![Image](https://github.com/user-attachments/assets/f4a69aad-6d3c-4e28-a8a9-e184114dfdca)
