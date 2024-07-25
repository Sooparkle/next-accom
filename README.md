# Refactor : React -> Next from Project3 
## Refactor Next js (SSR) without Node
- next를 통해서 더 이상 node를 사용하지 않고 좀쉼쉼 사이트를 제작하기.
- node는 현재 무료버전의 server 사용하기에 매일 한번씩 자동으로 꺼지는 상황.


## CSR -> SSR을 장점
### CSR의 한계
1. React를 통한 개발이 점점 커지면서 bundler의 사이즈도 커져 브라우저 랜더링의 효율이 떨어짐
2. SEO의 한계

### NEXT 바꾸는 이유
1. 프로젝트 일지라도 숙박은 SEO가 중요
2. 데이터 사이즈 및 이미지 로딩의 중요성(특히, next의 Link 기능은 loading = lazy와 pre-fetching 기능 효과)
3. React의 한계 bundler의 감소 효과
<br />
<img width="400" src="https://blog.kakaocdn.net/dn/c3SgPC/btsIrsMoyDj/ptcTOhuzxvKi8yTA3WqIo0/img.png" >


<br />
<br />
현재 Project3번의 next REFACTOR 전반에 이야기는 아래 주소에 확인 가능
<a href="https://life-explorer.tistory.com/category/Projects/Project3" target="_blank" >개인블로그</a>
<br />
<br />
<br />

## 디자인 컨셉
- main page 및 상세페이지 'airbnb' 와 '여기어때'를 참조. 
- 전체 UI 네이버파이넨션의 UI 참조.(이유 아래 설명)

### 참조 이미지 예시
<img width="400" src="https://blog.kakaocdn.net/dn/p75kW/btsIBa7ycaA/nW44uQsn8YgX297NygeU1K/img.png" >

<img width="400" src="https://blog.kakaocdn.net/dn/cstk5l/btsICEMUzuj/QVkFEngbQiCvbPvr7CWxW0/img.png" >


### 네이버 UI 제작 디자이너 이야기
- 네이버 UI를 선택한 이유는 어디서든 효율적으로 사용가능하며 간결하기 때문이다.
- 참조링크 <a href="https://medium.com/naverfinancial/defign-%EB%84%A4%EC%9D%B4%EB%B2%84%ED%8C%8C%EC%9D%B4%EB%82%B8%EC%85%9C%EC%9D%98-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%9D%84-%EC%A0%95%EC%9D%98%ED%95%98%EB%8B%A4-7b7449832f26" target="_blank" >네이버페이 금융FE, 디자인시스템TF 소속 안재연</a>

<img width="400" src="https://blog.kakaocdn.net/dn/qywOy/btsIBYZFSkx/BP2m2WJW06ZRkey51KB5VK/img.png" >




<br />
<br />

