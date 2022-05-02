# <span id="top">📘NEPOOL</span>
[🔗 www.nepool.co.kr](http://www.nepool.co.kr)

[🔗 API 명세](https://github.com/jinyun3075/NePool/tree/main/BackEnd)


## 팀원 구성

- 🙋 진윤재 🔗[github/jinyun3075](https://github.com/jinyun3075)
- 🙋🏻‍♂️ 정시찬 🔗[github/sichan1301](https://github.com/sichan1301)
- 🙋🏻‍♀️ 최성이 🔗[github/choisung2](https://github.com/choisung2)
- 🙋🏻‍ 유현세 🔗[github/Mangopapa1](https://github.com/Mangopapa1)

<details>
<summary>목차</summary>

1. [프로젝트 목표](#goal)
2. [개발 환경 및 배포 URL](#dev)
3. [프로젝트 구조](#tree)
4. [역할 분담](#role)
5. [개발 기간 및 이슈 관리](#task)
6. [UI](#ui)
7. [페이지 기능](#pages)

</details>

***

## <span id="goal">1. 프로젝트 목표</span>
- 내가 풀려고 만드는 문제집 프로젝트 입니다.
- 문제집, 문제를 자유롭게 만들고 풀어볼 수 있습니다. 
- 문제집을 공유하고 다른 사용자가 공유한 문제집을 스크랩 할 수 있습니다.
- 공부모드, 시험모드로 구별하여 사용자의 상황의 맞게 풀어볼 수 있습니다.

<p align="right"><a href="#top">(Top)</a></p>

## <span id="dev">2. 개발 환경 및 배포 URL</span>
### 개발 환경
- Front : HTML, CSS, React JS
- Back : Spring Framwork, My SQL
- DevOps: Github, Docker, AWS
- Design: Figma
- 버전 관리 및 이슈 : 🔗[GitHub Project](https://github.com/jinyun3075/NePool/projects/1)

<p align="right"><a href="#top">(Top)</a></p>

## <span id="tree">3. 프로젝트 구조</span>

<details>

```bash
\---NePool
    |   .dockerignore
    |   .gitignore
    |   README.md
    |
    +---BackEnd
    |   |   build.gradle
    |   |   Dockerfile
    |   |   README.md
    |   |
    |   \---src
    |       +---java
    |       |   |   NePoolServerApplication.java
    |       |   |
    |       |   +---controller
    |       |   |       AnnouncementApiController.java
    |       |   |       CommentApiController.java
    |       |   |       GoogleApiController.java
    |       |   |       SearchApiController.java
    |       |   |       ShareWorkBookApiController.java
    |       |   |       UploadApiController.java
    |       |   |       UserApiController.java
    |       |   |       WorkApiController.java
    |       |   |       WorkBookApiController.java
    |       |   |
    |       |   +---domain
    |       |   |   +---announcement
    |       |   |   |   +---dto
    |       |   |   |   |       AnnouncementDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       Announcement.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           AnnouncementRepository.java
    |       |   |   |
    |       |   |   +---comment
    |       |   |   |   +---dto
    |       |   |   |   |       CommentRequestDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       Comment.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           CommentRepository.java
    |       |   |   |
    |       |   |   +---shareworkbook
    |       |   |   |   +---dto
    |       |   |   |   |       ShareWorkBookDTO.java
    |       |   |   |   |       ShareWorkBookResultDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       ShareWorkBook.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           ShareWorkBookRepository.java
    |       |   |   |
    |       |   |   +---user
    |       |   |   |   +---dto
    |       |   |   |   |       GoogleLoginDTO.java
    |       |   |   |   |       UserDTO.java
    |       |   |   |   |       UserLoginDTO.java
    |       |   |   |   |       UserLoginRequestDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       NePoolUser.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           UserRepository.java
    |       |   |   |
    |       |   |   +---work
    |       |   |   |   +---dto
    |       |   |   |   |       WorkDTO.java
    |       |   |   |   |       WorkResultRealResponseDTO.java
    |       |   |   |   |       WorkResultRequestDTO.java
    |       |   |   |   |       WorkResultResponseDTO.java
    |       |   |   |   |
    |       |   |   |   +---entity
    |       |   |   |   |       Work.java
    |       |   |   |   |
    |       |   |   |   \---repository
    |       |   |   |           WorkRepository.java
    |       |   |   |
    |       |   |   \---workbook
    |       |   |       +---dto
    |       |   |       |       WorkBookRequestDTO.java
    |       |   |       |
    |       |   |       +---entity
    |       |   |       |       WorkBook.java
    |       |   |       |
    |       |   |       \---repository
    |       |   |               WorkBookRepository.java
    |       |   |
    |       |   +---exception
    |       |   |       ErrorHandle.java
    |       |   |
    |       |   +---security
    |       |   |   |   CorsConfig.java
    |       |   |   |   SecurityConfig.java
    |       |   |   |
    |       |   |   +---dto
    |       |   |   |       NePoolAuthDTO.java
    |       |   |   |
    |       |   |   +---filter
    |       |   |   |       ApiCheckFilter.java
    |       |   |   |       ApiLoginFilter.java
    |       |   |   |
    |       |   |   +---handler
    |       |   |   |       ApiLoginFailHandler.java
    |       |   |   |
    |       |   |   \---service
    |       |   |           NePoolUserDetailsService.java
    |       |   |
    |       |   +---service
    |       |   |   |   AnnouncementService.java
    |       |   |   |   CommentService.java
    |       |   |   |   SearchService.java
    |       |   |   |   ShareWorkBookService.java
    |       |   |   |   UploadService.java
    |       |   |   |   UserService.java
    |       |   |   |   WorkBookService.java
    |       |   |   |   WorkService.java
    |       |   |   |
    |       |   |   \---impl
    |       |   |           AnnouncementServiceImpl.java
    |       |   |           CommentServiceImpl.java
    |       |   |           SearchServiceImpl.java
    |       |   |           ShareWorkBookServiceImpl.java
    |       |   |           UploadServiceImpl.java
    |       |   |           UserServiceImpl.java
    |       |   |           WorkBookServiceImpl.java
    |       |   |           WorkServiceImpl.java
    |       |   |
    |       |   \---util
    |       |       +---dto
    |       |       |       ErrorResult.java
    |       |       |       PageRequestDTO.java
    |       |       |       PageResultDTO.java
    |       |       |       SearchDTO.java
    |       |       |       UploadResultDTO.java
    |       |       |
    |       |       +---entity
    |       |       |       BaseEntity.java
    |       |       |       UserRole.java
    |       |       |       
    |       |       \---jwt
    |       |               JWTUtil.java
    |       |
    |       \---resources
    |               application.properties
    |
    \---FrontEnd
        |   Dockerfile
        |
        \---workbook
            |   package.json
            |   README.md
            |
            +---public
            |   |   favicon.ico
            |   |   index.html
            |   |
            |   \---img
            |           +.svg
            |           arrowBack.svg
            |           background.svg
            |           basic.png
            |           blueshare.svg
            |           book.svg
            |           check.svg
            |           close.svg
            |           example.svg
            |           fiveStar.svg
            |           fiveStarf.svg
            |           kakao.svg
            |           logo.svg
            |           mango.png
            |           naver.svg
            |           next.svg
            |           notice.svg
            |           person.svg
            |           photo.svg
            |           plus.svg
            |           prev.svg
            |           profile.svg
            |           profileupdate.png
            |           QuestionCheck.svg
            |           QuestionError.svg
            |           search.svg
            |           share.svg
            |           slide1.svg
            |           slide2.svg
            |           slide3.svg
            |           slide4.svg
            |           slide5.svg
            |           star.svg
            |           starCheck.svg
            |           top.svg
            |           topHover.svg
            |           vector.svg
            |           vector_gray.svg
            |           vector_white.svg
            |           whiteshare.svg
            |           workbookdetail.png
            |           x.svg
            |
            \---src
                |   App.js
                |   index.css
                |   index.js
                |   reportWebVitals.js
                |
                +---components
                |   +---add
                |   |       add.js
                |   |       addContent.js
                |   |
                |   +---detail
                |   |       CommentList.js
                |   |       Comments.js
                |   |       DetailPage.js
                |   |       Preview.js
                |   |       Star.js
                |   |
                |   +---header
                |   |       header.js
                |   |       notice.js
                |   |       search.js
                |   |       status.js
                |   |
                |   +---home
                |   |       banner.js
                |   |       carousel.js
                |   |       footer.js
                |   |       home.js
                |   |       post.js
                |   |       slide.js
                |   |
                |   +---join
                |   |       FileUpload.js
                |   |       JoinPage.js
                |   |
                |   +---login
                |   |       LoginPage.js
                |   |
                |   +---mypage
                |   |       create_modal.js
                |   |       delete_modal.js
                |   |       mode_modal.js
                |   |       mypage.js
                |   |       myworkbook.js
                |   |       update_modal.js
                |   |       workbookcontent.js
                |   |
                |   +---notice
                |   |       NoticeEditorPage.js
                |   |       NoticePage.js
                |   |       NoticePost.js
                |   |
                |   +---post
                |   |       allPost.js
                |   |       morePost.js
                |   |       postButton.js
                |   |
                |   +---profile
                |   |       profilePage.js
                |   |       setProfile.js
                |   |
                |   +---sharepage
                |   |       sharepage.js
                |   |       share_content.js
                |   |       share_deletemodal.js
                |   |       share_modemodal.js
                |   |       share_myworkbook.js
                |   |       share_updatemodal.js
                |   |
                |   +---study
                |   |       Answer.js
                |   |       Answers.js
                |   |       ExamPage.js
                |   |       ExamQuestion.js
                |   |       ExamResult.js
                |   |       ExplanationModal.js
                |   |       Progress.js
                |   |       Question.js
                |   |       Result.js
                |   |       StudyPage.js
                |   |       
                |   +---updatepage
                |   |       updatepage.js
                |   |       updatepage_content.js
                |   |
                |   \---updatequestion
                |           updateContent.js
                |           updatequetion.js
                |
                +---constants
                |       index.js
                |
                +---pages
                |       Add.js
                |       Allpost.js
                |       Detail.js
                |       Exam.js
                |       Join.js
                |       Login.js
                |       Main.js
                |       Mypage.js
                |       NotFound.js
                |       Notice.js
                |       NoticeDetail.js
                |       NoticeEditor.js
                |       Profile.js
                |       Sharepage.js
                |       Study.js
                |       Update.js
                |       Updatework.js
                |
                +---style
                |       globals.css
                |       reset.css
                |
                \---utils
                        getLetter.js
                        shuffle.js
```
</details>
<p align="right"><a href="#top">(Top)</a></p>


## <span id="role">4. 역할 분담</span>
- 하단 이미지와 같이 개인, 공동 작업 페이지로 나누어 진행하였습니다.
- 프로젝트를 진행하며 API 비교적 중요하다 생각되는 로그인, 회원가입 페이지를 공통으로 진행하였습니다.

### 🛠 공통 담당
  - 기획 및 디자인
### 🙋 진윤재 
  - 🔗[github/jinyun3075](https://github.com/jinyun3075)
  - 서버
### 🙋🏻‍♂️ 정시찬
  - 🔗[github/sichan1301](https://github.com/sichan1301)
  - 마이페이지 - 나의 문제집, 가져온 문제집
### 🙋🏻‍♀️ 최성이
  - 🔗[github/choisung2](https://github.com/choisung2)
  - 전체 디자인, 로그인, 회원가입, 문제, 공지사항, 상세 페이지
### 🙋🏻‍ 유현세
  - 🔗[github/Mangopapa1](https://github.com/Mangopapa1)
  - 메인 페이지, 전체 문제집, 프로필 변경 페이지

<p align="right"><a href="#top">(Top)</a></p>


## <span id="task">5. 개발 기간 및 작업 관리</span>
- 전체 개발 기간 : 2022-02-25 ~ 2022-04-01
- 기획 디자인 : 2022-02-25 ~ 2022-03-02
- UI 구현 : 2022-03-03 ~ 2022-03-13
- 기능 개발 : 2022-03-14 ~ 2022-04-01
### 작업 관리
- 🔗[GitHub Projects](https://github.com/jinyun3075/NePool/projects/1)를 사용하여 진행도와 상황을 꾸준히 공유하였습니다.
<img src="https://user-images.githubusercontent.com/92600646/161484642-ad2f0726-a867-4dd9-b69d-717a9cd49998.png">

### 일간회의
- 🔗[Notion](https://www.notion.so/NePool-0bbf1e59eb2f414d8a512c606db96e4c)을 활용하여 매일 일정한 시간에 회의를 진행하여 작업 방향이나 각종 이슈들을 논의하였습니다.
<img width="1074" alt="스크린샷 2022-04-09 오후 4 08 58" src="https://user-images.githubusercontent.com/92600646/162561062-73e62eb9-c13a-4ce4-a715-d97fac4dd72c.png">


<p align="right"><a href="#top">(Top)</a></p>

## <span id="ui">6. UI</span>
![UI](https://user-images.githubusercontent.com/92927950/166297341-379afd54-d0ba-4c09-bb41-733e722e0c24.jpg)

<p align="right"><a href="#top">(Top)</a></p>

## <span id="pages">7. 페이지 기능</span>

### 1) 홈

|캐러셀|검색|
|:-:|:-:|
|![캐러셀](https://user-images.githubusercontent.com/92927950/166300210-c2277a87-1536-48b6-9fed-c2deaf63efc9.gif)|![검색](https://user-images.githubusercontent.com/92927950/166300885-3ab02842-a53e-4e22-8263-7f34e24ef214.gif)|
|로그인|회원가입|
|![로그인](https://user-images.githubusercontent.com/92927950/166303434-d83e54dd-3a13-4efc-9ca7-22849ae9b44d.gif)|![회원가입](https://user-images.githubusercontent.com/92927950/166303442-f1160d15-825e-4912-bd4a-25fcb86959f2.gif)|
|문제집 카테고리|문제집 페이징|
|![분류-메인](https://user-images.githubusercontent.com/92927950/166306096-6154eeb7-604c-463f-9e50-3869c9d902ca.gif)|![페이징](https://user-images.githubusercontent.com/92927950/166306103-4fa6e1a8-7aef-4375-8fc3-0dbf915904a8.gif)|

<br>

### 2) 마이 페이지

|문제집 추가|문제집 수정|
|:-:|:-:|
|![문제집 추가](https://user-images.githubusercontent.com/92927950/166310150-d092e515-b9ad-4246-b084-48af1f4535a7.gif)|![문제집 수정](https://user-images.githubusercontent.com/92927950/166310160-bbb33509-9d90-4ddd-8644-7a2e13cd1717.gif)|
|문제집 삭제|문제집 공유|
|![문제집 삭제](https://user-images.githubusercontent.com/92927950/166310174-f93b36d4-d168-44a3-a978-d327d4f98593.gif)|![문제집 공유](https://user-images.githubusercontent.com/92927950/166310185-f0e67464-9398-4458-9a90-57382d5d9656.gif)|
|문제 추가|문제 수정|
|![문제 추가](https://user-images.githubusercontent.com/92927950/166310194-622519b5-b2c0-4db2-8cc1-fc053a9b3ac8.gif)|![문제 수정](https://user-images.githubusercontent.com/92927950/166310200-ebf6d71b-77fe-454e-af2d-515999966ecf.gif)|
|마이페이지 - 공부모드|마이페이지 - 시험모드|
|![마이 페이지-공부모드](https://user-images.githubusercontent.com/92927950/166310214-b86dfa81-515e-41b9-ae43-159b11190bd9.gif)|![마이 페이지-시험모드](https://user-images.githubusercontent.com/92927950/166310218-e78e2a14-8673-4b22-920b-64d42492e8ea.gif)|

<br>

### 3) 상세 페이지
|상세 페이지 - 공부모드|상세 페이지 - 시험모드|
|:-:|:-:|
|![상세 페이지 - 공부 모드](https://user-images.githubusercontent.com/92927950/166316989-65e1d21c-7f61-4b88-ac0b-1f3993903a2e.gif)|![상세 페이지 - 시험 모드](https://user-images.githubusercontent.com/92927950/166316994-9f0428d4-1acf-4e2f-9bbe-2048366c345b.gif)|
|공부모드|시험모드|
|![공부 모드](https://user-images.githubusercontent.com/92927950/166321864-b3596928-403f-434f-963a-7d7817dce441.gif)|![시험 모드](https://user-images.githubusercontent.com/92927950/166321884-b2902b18-b417-4a2a-98c0-5914d76340b6.gif)|
|리뷰작성|리뷰삭제|
|![리뷰 작성](https://user-images.githubusercontent.com/92927950/166316996-71405f5c-494a-4635-877b-6cd16bed9a96.gif)|![리뷰 삭제](https://user-images.githubusercontent.com/92927950/166316999-68d192ad-486f-4285-b488-c752bb79c2aa.gif)|
|상세페이지 스크랩|
|![상세 페이지 - 스크랩](https://user-images.githubusercontent.com/92927950/166317008-7f429ecd-774a-4d25-8fa9-a1ce15078a03.gif)|

<br>

### 4) 공지사항
|공지사항(유저)|공지사항 작성|
|:-:|:-:|
|![공지사항](https://user-images.githubusercontent.com/92927950/166324584-28809fa8-b819-421e-afdf-e38653c99d20.gif)|![공지사항 작성](https://user-images.githubusercontent.com/92927950/166324587-cf71d360-3459-46d2-a5e2-33d144e82521.gif)|
|공지사항 수정|공지사항 삭제|
|![공지사항 수정](https://user-images.githubusercontent.com/92927950/166324661-737d3fec-7980-4f8c-81a3-c55ffa01c908.gif)|![공지사항 삭제](https://user-images.githubusercontent.com/92927950/166324664-5795f88c-0d04-4e1d-a418-3200a5f25b99.gif)|
</br>

<p align="right"><a href="#top">(Top)</a></p>
