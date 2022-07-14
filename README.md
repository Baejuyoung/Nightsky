## 🌙 밤하늘 

##  TEAM
| 이름 | 역할 |
| ---- | ---- |
|  김나연    |  프론트엔드    |
|  신광천    |  백엔드    |
|  이호산    |  백엔드    |
|  배주영    |  인공지능    |

## **1. 서비스 소개**

### 📖 사용자가 매일 일기를 적고, 적은 일기의 감정을 분석하여 그 날에 대한 회고를 도와주는 서비스 

## 기획 의도 
> 📄 **SNS 피로감 호소하는 MZ세대 '블로그 망명'**   
[PD저널=손지인 기자] 지는 해인 줄만 알았던 블로그가 MZ세대 사이에서 다시금 주목받고 있다.   
타인의 시선을 의식할 수밖에 없는 개방형 SNS에 피로감을 느낀 이들이 연결성이 느슨한 블로그를 찾고 있다는 분석이다.   
올해부터 블로그를 시작했다는 20대 A씨는 “그 날 그 날 드는 생각들을 기록하려고 시작했다"며 "평소 인스타그램은 보여주기식의 게시물이 많아 피로하게 느껴지고는 했다.   
또 인스타그램은 연락처 연동이 돼서 주변 사람들한테 내 게시물이 노출되기 쉽다”고 블로그 개설 이유를 말했다.   
그러면서 “하지만 블로그는 그런 기능이 없다보니 주위 시선을 신경 쓰지 않고 내가 느낀 그대로를 솔직하게 표현할 수 있어 좋다. 계속 (블로그를) 운영해나갈 예정”이라고 했다.


- 타인의 시선을 의식할 수 밖에 없는 개방형 SNS에 피로감을 느끼는 MZ 세대   
-> 다시 닷컴 시대의 “블로그”가 주목받고 있다는 점에 집중.   
-> 오로지 사용자 본인에 집중하기 위해, 커뮤니티 형성이 가능한 공간을 만들지 않고, 본인에 감정에만 충실할 수 있는 스페이스를 제공.  


## 2. 메인 기능 , 서브 기능 

### 🎯 메인 기능
  1. 감정 분석을 통해 작성한 일기의 감정을 분석하고, 캘린더에 표현해 그 날의 감정을 기록하고, 꺼내볼 수 있는 기능

### 🎯 서브 기능
  1. 챌린지와 챌린지 완료 후 보상 제공으로 사용자 참여 증진.  
  2. 일기 작성 후 감정에 맞는 활동 추천과 내일의 운세, 노래 추천으로 사용자에게 재미 요소 제공.
  3. 한 달 동안의 기록을 레포트로 만들어 사용자에게 제공.


## 3. 프로젝트 구성

### 🖼 와이어프레임 
[피그마](https://www.figma.com/file/aOjLshhrTwLyvEALLMyXVn/12%ED%8C%80?node-id=0%3A1)

### 🗂 기술 스택 및 사용 라이브러리

| 이름 | 기술 |
| ---- | ---- |
|  프론트엔드    |  `React` `Axios` `Recoil` `Styled-components` `MSW` `moment.js` `Toast-editor`    |
|  백엔드    |   `aws-sdk` `Sentry` `jest` `jsDoc` `morgan` `swagger` `supertest` `nodemon` `dotenv` `Prisma` `Redis` `passport` |
|  인공지능    | `Jupyter-notebook` `PyTorch` `Huggingface` `skt/kobert` `scikit-learn`  |
|  배포    |   `Nginx` `Docker` `Docker-compose`   |

### ⚙️ 아키텍처
![project](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/51911495-4aee-497e-996e-751d487da000/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220714%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220714T135222Z&X-Amz-Expires=86400&X-Amz-Signature=9f3ee27112bcf4d008cbce030d8e4eb855f6c991d76e3c8f76e8f9e0b2eeefe9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)


