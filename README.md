# Badminton Club ERP
******
 제가 속해있는 배드민턴 동아리에서는 다양한 톡방이 운영되고 있습니다. 1. 배드민턴 치고싶을 때 사람을 모으기 위해 이름을 쌓는 자유밷 톡방, 2. 셔틀콕 구매를 신청하는 셔틀콕구매 톡방, 3. 직속 활동이나 다양한 행사 참여를 인증하는 직속 활동 톡방, 4. 배드민턴 정기모임 대진표가 공지되고 경기 결과에 따라 티어 변동이 공지되는 공지 톡방 등이 바로 그것인데요, 톡방이 굉장히 많고 톡방들이 흩어져있으니 불편함을 느낄 때가 종종 있었습니다. 이에 다양한 동아리 활동들을 한 곳에서 할 수 있는 웹사이트를 개발하게 되었고, 최근 카이스트에서 개발한 차세대 통합정보시스템(KAIST ERP)에서 이름을 따 배드민턴 동아리 차세대 통합정보시스템(Badminton Club ERP)로 이름붙였습니다.

### 기능
 **1. 회원가입 및 로그인 기능**  
  -로그인이 되어야 자유밷 쌓기, 셔틀콕, 게시판, 마이페이지 등의 배너가 나타나고, 해당 경로로 접근가능하도록 구현하였습니다.  
 **2. 자유밷 쌓기(새 모집글 작성 및 기존 게시물에 참여 신청/취소)**  
  -참여자의 이름과 숫자가 모집글 아래 표시되도록 하였습니다.  
 **3. 셔틀콕 구매 신청/취소 + 접수중/접수완료 상태표시**  
  -본인이 올린 게시물에 한하여 취소 버튼이 나타나고 취소가 가능하도록 하였습니다.  
 **4. 게시판 게시물 작성/삭제**  
  -공지, 직속 활동과 같은 다양한 게시물을 작성하고, 자신이 작성한 게시물에 한해 삭제할 수 있습니다.  
 **5. 마이페이지**  
   -배드민턴 정모 결과로 변동된 자신의 티어나 직속 활동 점수를 확인할 수 있는 페이지입니다.  
  
**기술 스택**  
프론트엔드 : NextJs, TypeScript  
백엔드 : NextJs API Routes, Typescript  
데이터베이스 : MongoDB  

**추후 업그레이드 하고 싶은 기능**  
-정모 대진표 업로드 및 공지 기능  
-정모 결과 엑셀 넣으면 자동으로 부원들의 티어 조정  
-셔틀콕 구매 신청 시 카카오페이로 바로 송금  
-다른 부원과의 전적 확인 기능  
