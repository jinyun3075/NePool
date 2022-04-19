<<<<<<< HEAD
# NePool API
### URL www.nepool.co.kr
### Front REPO https://github.com/jinyun3075/NePool/tree/frontDev
## DB 관계도
![image](https://user-images.githubusercontent.com/64072136/163166319-ce4bd54a-fa7e-4513-acfd-605d0ba1f950.png)

## API 명세 목차
- ### [1 유저](#유저)
  - [1.1 회원가입](#회원가입)
  - [1.2 로그인](#로그인)
  - [1.3 유저 정보](#유저-정보)
  - [1.4 모든 유저](#모든-유저)
  - [1.5 프로필 변경](#프로필-변경)
  - [1.6 프로필 삭제](#프로필-삭제)

- ### [2 문제집](#문제집)
  - [2.1 문제집 만들기](#문제집-만들기)
  - [2.2 문제집 정보](#문제집-정보)
  - [2.3 내 문제집 리스트](#내-문제집-리스트)
  - [2.4 공유된 문제집](#공유된-문제집)
  - [2.5 공유된 문제집 Paging](#공유된-문제집-Paging)
  - [2.6 문제집 삭제](#문제집-삭제)
  - [2.7 문제집 공유](#문제집-공유)
  - [2.8 문제집 수정](#문제집-수정)
  - [2.9 문제집 BEST 4](#문제집-BEST-4)
  - [2.10 문제집 개수](#문제집-개수)

- ### [3 문제](#문제)
  - [3.1 문제 만들기](#문제-만들기)
  - [3.2 문제 정보](#문제-정보)
  - [3.3 문제 리스트](#문제-리스트)
  - [3.4 정답 결과](#정답-결과)
  - [3.5 문제 삭제](#문제-삭제)
  - [3.6 문제 수정](#문제-수정)

- ### [4 문제집 리뷰](#문제집-리뷰)
  - [4.1 리뷰 작성](#리뷰-작성)
  - [4.2 리뷰 가져오기](#리뷰-가져오기)
  - [4.3 리뷰 별점](#리뷰-별점)
  - [4.4 리뷰 삭제](#리뷰-삭제)
  
- ### [5 공유 문제집](#공유된-문제집)
  - [5.1 공유 문제집 추가](#공유-문제집-추가)
  - [5.2 공유 문제집 가져오기](#공유-문제집-가져오기)
  - [5.3 공유 문제집 삭제](#공유-문제집-삭제)
  - [5.4 스크랩 횟수](#스크랩-횟수)

- ### [6 검색](#검색)
  - [6.1 문제집 및 유저 검색](#문제집-및-유저-검색)

- ### [7 이미지](#이미지)
  - [7.1 이미지 업로드](#이미지-업로드)

- ### [8 공지사항](#공지사항)
  - [8.1 공지사항 만들기](#공지사항-만들기)
  - [8.2 공지사항 정보](#공지사항-정보)
  - [8.3 공지사항 리스트 가져오기](#공지사항-리스트-가져오기)
  - [8.3 공지사항 수정](#공지사항-수정)
  - [8.4 공지사항 삭제](#공지사항-삭제)

## 유저
### 회원가입
- api
    - /user (post)

- headers
    - Content-type : "application/json"

- req
    - username: String
    - email: String
    - password: String
    - name: String
    - image: String
- res
    - id: String
    - username: String
    - name: String
    - email: String
    - password: String
    - image: String
- fail
    - id, email, password, name 중 하나라도 작성하지 않을 경우
    - password 가 6-16자의 영문 숫자가 아닐 경우 
    - 비밀번호가 일치하지 않을 경우
    - email 형식이 잘못될 경우 잘못된 이메일 형식입니다.
    - 가입된 email 일 경우 이미 가입된 이메일 주소입니다.
    - 이미 존재한 name 일 경우
    - 가입된 ID 또는 2-15자의 영문 숫자가 아닐 경우
    
### 로그인
- api
    - /user/login (post)

- headers
    - Content-type : "application/json"
    
- req
    - username: String
    - password: String
- res
    - id: String
    - username: String
    - name: String
    - email: String
    - token: String
- fail
    - ID 또는 PW 일치하지 않을 경우
    
### 유저 정보
- api
    - /user/:username (get)
    
- headers
    - Content-type : "application/json"
    
- res
    - id: String
    - username: String
    - name: String
    - email: String
    - password: String
    - image: String
    
- fail
    - username 존재하지 않을 때
### 모든 유저
- api
    - /user (get)
    - /user?page=Number&size=Number
    - (설명) size : 불러올 데이터 개수, page : size 로 나눈 페이지 수

- headers
    - Content-type : "application/json"

- res
    - dtoList:Array
        - id: String
        - username: String
        - name: String
        - email: String
        - password: String
        - image: String
        
    - totalPage: Number
    - page: Number
    - size: Number
    - prev: boolean
    - next: boolean
    - start: Number
    - end: Number
    - pageList: Array
 
### 프로필 변경
- api
    - /user/update/to (put)
 
 - headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”
 
- req
    - id: String
    - password: String (확인용 비밀번호)
    - name: String
    - image: String
  
- res
    - id: String
    - username: String
    - password: String
    - name: String
    - email: String
    - image: String

- fail
    - 존재하지 않는 아이디 일 때
    - name에 값이 없을 때
    - 비밀번호가 일치하지 않을 때

### 프로필 삭제
- api
    - /user/delete/:user_id (delete)
 
 - headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”
  
- res
    - "삭제 완료"

- fail
    - user_id가 존재하지 않을 때

## 문제집
### 문제집 만들기
- api
    - /workbook/register (post)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- req
    - username: String
    - title: String
    - content: String
    - type: String
    - image: String
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - count: Number
    - type: String
    - image: String
    - regDate: Date
    - modDate: Date
- fail
    - 제목 및 내용이 입력되지 않았을 때
    - username 존재하지 않을 때
    
### 문제집 정보

- api
    - /workbook/:username/:work_book_id (get)
    - /workbook/:username/:work_book_id?check=boolean (get)
    - (설명) check 값의 true를 줄 경우 조회수 + 1, null 혹은 false 일 경우 변화 없음

- headers
    - Content-type : "application/json"
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - count: Number
    - type: String
    - image: String
    - regDate: Date
    - modDate: Date

- fail
    - username 존재하지 않을 때
    - 해당 계정의 문제집이 아니거나 혹은 없는 work_book_id 일 경우
    
### 내 문제집 리스트

- api
    - /workbook/:username (get)
    - /workbook/:username?page=Number&size=Number(get)
    

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- res
    - dtoList:Array
        - id: Number
        - title: String
        - content: String
        - share: boolean
        - username: String
        - image: String
        - count: Number
        - type: String
        - regDate: Date
        - modDate: Date
        
    - totalPage: Number
    - page: Number
    - size: Number
    - prev: boolean
    - next: boolean
    - start: Number
    - end: Number
    - pageList: Array

- fail
    - username 존재하지 않을 때
    
### 공유된 문제집
- api
    - /workbook (get)
    - /workbook?type=String (get)
    - (설명) 모든 문제집을 가져올때는 type을 지우거나 혹은 "all" 값을 보내주고 카테고리별로 가져올때는 type 에 키워드 입력

- headers
    - Content-type : "application/json"

- res
    - Array
      - id: Number
      - title: String
      - content: String
      - share: boolean
      - username: String
      - image: String
      - count: Number
      - type: String
      - regDate: Date
      - modDate: Date
    
### 공유된 문제집 Paging
- api
    - /workbook/page (get)
    - /workbook/page?page=Number&size=Number&type=String (get)
    - (설명) 모든 문제집을 가져올때는 type을 지우거나 혹은 "all" 값을 보내주고 카테고리별로 가져올때는 type 에 키워드 입력

- headers
    - Content-type : "application/json"

- res
    - dtoList:Array
        - id: Number
        - title: String
        - content: String
        - share: boolean
        - username: String
        - image: String
        - count: Number
        - type: String
        - regDate: Date
        - modDate: Date

    - totalPage: Number
    - page: Number
    - size: Number
    - prev: boolean
    - next: boolean
    - start: Number
    - end: Number
    - pageList: Array
    
### 문제집 삭제
- api
    - /workbook/:username/:work_book_id (delete)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- res
    - " 삭제완료 "

- fail
    - username 존재하지 않을 때
    - 해당 계정의 문제집이 아니거나 혹은 없는 work_book_id 일 경우
    
### 문제집 공유
- api
    - /workbook/share/:username/:work_book_id (put)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- res
    - " 공유 성공 " : 공유 안돼있을 때 
    - " 공유 해제 " : 공유 돼있을 때

- fail
    - username 존재하지 않을 때
    - 해당 계정의 문제집이 아니거나 혹은 없는 work_book_id 일 경우
    
### 문제집 수정

- api
    - /workbook/update/:username/:work_book_id (put)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- req
    - title: String
    - content: String
    - type: String
    - image: String
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - image: String
    - count: Number
    - type: String
    - regDate: Date
    - modDate: Date

- fail
    - 제목 및 내용이 입력되지 않았을 때
    - username 존재하지 않을 때
    - 해당 계정의 문제집이 아니거나 혹은 없는 work_book_id 일 경우
  
### 문제집 BEST 4
- api
  - /workbook/best4 (get)

- headers
  - Content-type : "application/json"

- res
  - Array
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - image: String
    - count: Number
    - type: String
    - regDate: Date
    - modDate: Date

### 문제집 개수
- api
  - /workbook/all (get)
 
- headers
  - Content-type : "application/json"
 
- res
  - :Number


## 문제
### 문제 만들기
- api
  - /work/:username/:work_book_id (post)

- headers
  - Content-type : "application/json"
  - Authorization : “Bearer key”
  
- req
  - question: String
  - answer_a: String
  - answer_b: String
  - answer_c: String
  - answer_d: String
  - answer_e: String
  - correct: String
  - explanation: String
  
- res
  - id: String
  - question: String
  - answer_a: String
  - answer_b: String
  - answer_c: String
  - answer_d: String
  - answer_e: String
  - correct: String
  - explanation: String
- fail
  - 없는 username 혹은 work_book_id 일 때
  - 모든 요구사항을 입력하지 않을 때 혹은 null 값이 존재 할 때
  
### 문제 정보

- api
  - /work/:username/:work_book_id/:work_id (get)

- headers
  - Content-type : "application/json"
  - Authorization : “Bearer key”
  
- res
  - id: String
  - question: String
  - answer_a: String
  - answer_b: String
  - answer_c: String
  - answer_d: String
  - answer_e: String
  - correct: String
  - explanation: String
  
- fail
  - 없는 username 혹은 work_book_id 혹은 work_id 일 때
  
### 문제 리스트

- api
  - /work/:username/:work_book_id (get)

- headers
  - Content-type : "application/json"

- res
  - 순서 랜덤 배치
  - Array
    - id: String
    - question: String
    - answer_a: String
    - answer_b: String
    - answer_c: String
    - answer_d: String
    - answer_e: String
    - correct: String
    - explanation: String

- fail
  - 없는 username 혹은 work_book_id 일 때
  

### 정답 결과

- api
  - /work/:work_book_id (post)

- headers
  - Content-type : "application/json"
  - Authorization : “Bearer key”
  
- req
  - Array
    - id: String
    - correct: String
  
- res
  - val: Array
    - question: String
    - answer_a: String
    - answer_b: String
    - answer_c: String
    - answer_d: String
    - answer_e: String
    - choice: String (선택한 답)
    - correct: String (옳바른 답)
    - result: boolean
    - explanation: String
    
  - score: Number
  - totalScore: Number
  
- fail
  - 없는 work_book_id 일 때
  - 문제집의 문제 수와 보내는 데이터의 수가 다를 때
  
### 문제 삭제
- api
  - /work/:username/:work_book_id/:work_id (delete)

- headers
  - Content-type : "application/json"
  - Authorization : “Bearer key”

- fail
  - 없는 username 혹은 work_book_id 혹은 work_id 일 때
  
### 문제 수정
- api
  - /work/:username/:work_book_id/:work_id (put)

- headers
  - Content-type : "application/json"
  - Authorization : “Bearer key”

- req
  - question: String
  - answer_a: String
  - answer_b: String
  - answer_c: String
  - answer_d: String
  - answer_e: String
  - correct: String
  - explanation: String
  
- res
  - id: String
  - question: String
  - answer_a: String
  - answer_b: String
  - answer_c: String
  - answer_d: String
  - answer_e: String
  - correct: String
  - explanation: String
  
- fail
  - 없는 username 혹은 work_book_id 혹은 work_id 일 때 

## 문제집 리뷰
### 리뷰 작성
- api
  - /comment/:user_id/:work_book_id (post)

- headers
  - Content-type : "application/json"
  - Authorization : “Bearer key”

- req
  - content: String
  - like: Number
 
- res
  - id: String
  - content: String
  - like: Number
  - writer: String
  - regDate: Date
  - modeDate: Date

- fail
  - content가 비어있을 때
  - 없는 user_id 혹은 work_book_id 일 때

### 리뷰 가져오기
- api
  - /comment/:work_book_id?page=Number&size=Number (get)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- res
    - dtoList:Array
        - id: String
        - content: String
        - like: Number
        - writer: String
        - regDate: Date
        - modeDate: Date
        
    - totalPage: Number
    - page: Number
    - size: Number
    - prev: boolean
    - next: boolean
    - start: Number
    - end: Number
    - pageList: Array

- fail
  - 없는 work_book_id 일 때

### 리뷰 별점
- api
  - /comment/like/:work_book_id (get)

- headers
    - Content-type : "application/json"

- res
    - :Number

- fail
  - 없는 work_book_id 일 때

### 리뷰 삭제
- api
  - /comment/:comment_id/:writer (delete)
  
- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”
   
- res
    - " 삭제 완료 "

- fail
    - 없는 comment_id, writer 일 때
## 공유 문제집
### 공유 문제집 추가
- api
    - /share/register (post)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- req
    - work_book_id: String
    - user_id: String

- res
    - workBook: Object
        - id: Number
        - title: String
        - content: String
        - share: boolean
        - username: String
        - count: Number
        - image: String
        - type: String
        - regDate: Date
        - modDate: Date
    - user: Object
        - id: String
        - username: String
        - name: String
        - image: String
        - email: String
        - password: String

- fail
    - 없는 work_book_id , user_id 일 때
    - 이미 스크립이 되어있을 때

### 공유 문제집 가져오기
- api
    - /share/:user_id (get)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- res
    - dtoList:Array
        - workBook: Object
            - id: Number
            - title: String
            - content: String
            - share: boolean
            - username: String
            - count: Number
            - image:String
            - type: String
            - regDate: Date
            - modDate: Date
        - user: Object
            - id: String
            - username: String
            - name: String
            - image: String
            - email: String
            - password: String
    - totalPage: Number
    - page: Number
    - size: Number
    - prev: boolean
    - next: boolean
    - start: Number
    - end: Number
    - pageList: Array

- fail
    - 없는 user_id 일 때
   
### 공유 문제집 삭제
- api
    - /share (delete)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- req
    - work_book_id: String
    - user_id: String

- res
  - " 삭제 완료 "
  
- fail
    - 없는 work_book_id , user_id 일 때

### 스크랩 횟수
- api
  - /share/count/:work_book_id (get)
  
- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- res
  - :Number
 
## 검색
### 문제집 및 유저 검색
- api
  - /search/:keyword (get)

- headers
    - Content-type : "application/json"

- res
  - workbook: Array
      - id: Number
      - title: String
      - content: String
      - share: boolean
      - username: String
      - count: Number
      - type: String
      - regDate: Date
      - modDate: Date

  - user: Array
      - id: String
      - username: String
      - name: String
      - email: String
      - password: String
    
## 이미지
### 이미지 업로드
- api
    - /upload (post)

- headers
    - Content-type : "multipart/form-data"
    - Authorization : “Bearer key”

- req
    - FormData

- res
    - fileName: String
    - uuid: String
    - folderPath: String
    - imageUrl: String

- fail
    - 이미지 파일이 아닌 경우

## 공지사항
### 공지사항 만들기
- api
    - /announcement/:user_id (post)

- headers
    - Content-type : "application/json"

- req
    - title: String
    - contents: String 

- res
    - id: Number
    - title: String
    - contents: String 
    - regDate: Date
    - modDate: Date

- fail
    - ADMIN이 아닐 경우

### 공지사항 정보
- api
    - /announcement/show/:announcement_id (get)
   
- headers
    - Content-type : "application/json"

- res
    - id: Number
    - title: String
    - contents: String 
    - regDate: Date
    - modDate: Date  

- fail
    - announcement_id가 존재하지 않을 때

### 공지사항 리스트 가져오기
- api
    - /announcement (get)
    - /announcement?page=Number&size=Number (get)

- headers
    - Content-type : "application/json"

- res
     - dtoList:Array
        - id: Number
        - title: String
        - contents: String 
        - regDate: Date
        - modDate: Date    
    - totalPage: Number
    - page: Number
    - size: Number
    - prev: boolean
    - next: boolean
    - start: Number
    - end: Number
    - pageList: Array


### 공지사항 수정
- api
    - /announcement/:user_id (put)

- headers
    - Content-type : "application/json"

- req
    - id: Number
    - title: String
    - contents: String 
  
- res
    - id: Number
    - title: String
    - contents: String 
    - regDate: Date
    - modDate: Date    

- fail
    - ADMIN이 아닐 경우

### 공지사항 삭제
- api
    - /announcement/:user_id (delete)

- headers
    - Content-type : "application/json"

- req (공지사항 아이디만 보내면됩니다.)
    :announcement_id(Number)
  
- res
    - "삭제 완료"

- fail
    - ADMIN이 아닐 경우
    - 없는 아이디 일 경우
=======
# <span id="top">📘NEPOOL</span>
[🔗 배포 URL](https://www.nepool.co.kr)

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
### 배포 URL
URL : 🔗 https://www.nepool.co.kr/

<p align="right"><a href="#top">(Top)</a></p>

## <span id="tree">3. 프로젝트 구조</span>

```bash
\---NePool
    |   .gitignore
    |   README.md
    |
    +---BackEnd
    |   |   build.gradle
    |   |   Dockerfile
    |   |
    |   \---src
    |       +---java
    |       |   |   NePoolServerApplication.java
    |       |   |
    |       |   +---controller
    |       |   |       CommentCont.java
    |       |   |       SearchCont.java
    |       |   |       ShareWorkBookCont.java
    |       |   |       UserCont.java
    |       |   |       WorkBookCont.java
    |       |   |       WorkCont.java
    |       |   |       
    |       |   +---dto
    |       |   |       CommentRequestDTO.java
    |       |   |       ErrorResult.java
    |       |   |       PageRequestDTO.java
    |       |   |       PageResultDTO.java
    |       |   |       SearchDTO.java
    |       |   |       ShareWorkBookDTO.java
    |       |   |       ShareWorkBookResultDTO.java
    |       |   |       UserDTO.java
    |       |   |       UserLoginDTO.java
    |       |   |       UserLoginRequestDTO.java
    |       |   |       WorkBookRequestDTO.java
    |       |   |       WorkDTO.java
    |       |   |       WorkResultRealResponseDTO.java
    |       |   |       WorkResultRequestDTO.java
    |       |   |       WorkResultResponseDTO.java
    |       |   |
    |       |   +---entity
    |       |   |       BaseEntity.java
    |       |   |       Comments.java
    |       |   |       NePoolUser.java
    |       |   |       ShareWorkBook.java
    |       |   |       UserRole.java
    |       |   |       Work.java
    |       |   |       WorkBook.java
    |       |   |
    |       |   +---exception
    |       |   |       ErrorHandle.java
    |       |   |
    |       |   +---repository
    |       |   |       CommentRepository.java
    |       |   |       ShareWorkBookRepository.java
    |       |   |       UserRepository.java
    |       |   |       WorkBookRepository.java
    |       |   |       WorkRepository.java
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
    |       |   |   +---service
    |       |   |   |       NePoolUserDetailsService.java
    |       |   |   |       
    |       |   |   \---util
    |       |   |           JWTUtil.java
    |       |   |
    |       |   \---service
    |       |       |   CommentService.java
    |       |       |   SearchService.java
    |       |       |   ShareWorkBookService.java
    |       |       |   UserService.java
    |       |       |   WorkBookService.java
    |       |       |   WorkService.java
    |       |       |
    |       |       \---impl
    |       |               CommentServiceImpl.java
    |       |               SearchServiceImpl.java
    |       |               ShareWorkBookServiceImpl.java
    |       |               UserServiceImpl.java
    |       |               WorkBookServiceImpl.java
    |       |               WorkServiceImpl.java
    |       |
    |       \---resources
    |               application-db.properties
    |               application.properties
    |
    \---FrontEnd
        |   Dockerfile
        |   package.json
        |   yarn.lock
        |
        +---public
        |   |   favicon.ico
        |   |
        |   \---img
        |           +.svg
        |           background.svg
        |           blueshare.svg
        |           book.svg
        |           check.svg
        |           close.svg
        |           example.svg
        |           kakao.svg
        |           logo.svg
        |           mango.png
        |           naver.svg
        |           next.svg
        |           notice.svg
        |           person.svg
        |           prev.svg
        |           profileupdate.png
        |           search.svg
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
            |   index.js
            |
            +---components
            |   +---add
            |   |       add.js
            |   |       addContent.js
            |   |       background.js
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
            |   |       JoinPage.js
            |   |
            |   +---login
            |   |       LoginPage.js
            |   |
            |   +---mypage
            |   |       create_modal.js
            |   |       delete_modal.js
            |   |       left.js
            |   |       mode_modal.js
            |   |       mypage.js
            |   |       right.js
            |   |       update_modal.js
            |   |
            |   +---notice
            |   |       NoticePage.js
            |   |
            |   +---post
            |   |       allPost.js
            |   |       morePost.js
            |   |       postButton.js
            |   |
            |   +---sharepage
            |   |       myshared.js
            |   |       shareleft.js
            |   |       sharepage.js
            |   |
            |   +---study
            |   |       Answer.js
            |   |       Answers.js
            |   |       ExplanationModal.js
            |   |       Progress.js
            |   |       Question.js
            |   |       Result.js
            |   |       StudyPage.js
            |   |
            |   \---updatepage
            |           updatepage.js
            |           updatepage_right.js
            |
            +---constants
            |       index.js
            |
            +---pages
            |       Add.js
            |       Allpost.js
            |       Detail.js
            |       Join.js
            |       Login.js
            |       Main.js
            |       Mypage.js
            |       NotFound.js
            |       Notice.js
            |       Sharepage.js
            |       Study.js
            |       Update.js
            |
            +---style
            |       globals.css
            |       reset.css
            |
            \---utils
                    getLetter.js
                    shuffle.js
```

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
![UI](https://user-images.githubusercontent.com/92600646/162561156-5896b69e-5bca-46a6-8cdc-c2e994ad4fda.jpg)


<p align="right"><a href="#top">(Top)</a></p>

## <span id="pages">7. 페이지 기능</span>

### 1) 홈

|캐러셀|검색|
|:-:|:-:|
|![캐러셀](https://user-images.githubusercontent.com/92600646/162561433-7cde483c-9177-40a3-b26a-ac0100c4fac2.gif)|![검색-123](https://user-images.githubusercontent.com/92600646/162562024-c353990d-9dfc-4a2b-b859-e798c8d52662.gif)|
|로그인|회원가입|
|![로그인](https://user-images.githubusercontent.com/92600646/162564188-5ce868db-a046-4a62-9a2e-580e1d9fec33.gif)|![회원가입](https://user-images.githubusercontent.com/92600646/162564183-eb892d85-e75f-46ef-82e7-9339c9528f5f.gif)|
|문제집 카테고리|문제집 페이징|
|![분류-메인](https://user-images.githubusercontent.com/92600646/162562023-c93cded0-ce39-4187-86e6-1b5303c2e85b.gif)|![페이징](https://user-images.githubusercontent.com/92600646/162564190-deb7807b-0c15-423e-af43-99184702e068.gif)|


### 2) 마이 페이지

|문제집 추가|문제집 수정|
|:-:|:-:|
|![문제집 추가](https://user-images.githubusercontent.com/92600646/162562025-6acf3698-1ea1-4db8-a9d4-a0a2ac11b230.gif)|![문제집 수정](https://user-images.githubusercontent.com/92600646/162562298-15c2a85e-1955-4f67-9aa9-b70432a9c26d.gif)|
|문제집 삭제|문제집 공유|
|![문제집 삭제](https://user-images.githubusercontent.com/92600646/162562301-c79713c9-080b-4a0c-98d2-c7ff06a21dbc.gif)|![문제집 공유](https://user-images.githubusercontent.com/92600646/162562302-20fa9ebf-8e56-4eea-87d4-dd0db85e58f2.gif)|
|마이페이지 - 공부모드|마이페이지 - 시험모드|
|![마이페이지-공부모드](https://user-images.githubusercontent.com/92600646/162562310-94937381-b8a6-4aaa-be3a-d14bb1fccb64.gif)|![마이페이지 시험모드](https://user-images.githubusercontent.com/92600646/162562740-3f3bf599-d489-47cc-b322-2b014053b6ba.gif)|

### 3) 디테일 페이지
|디테일 페이지 - 공부모드|디테일 페이지 - 시험모드|
|:-:|:-:|
|![디테일 페이지 공부모드](https://user-images.githubusercontent.com/92600646/162562754-75a5afd8-9217-44e3-be3c-f7fb41845198.gif)|![디테일 페이지 시험모드](https://user-images.githubusercontent.com/92600646/162562756-53be6d89-640b-4f27-a27e-895ad9cbdf9a.gif)|
|리뷰작성|리뷰삭제|
|![리뷰 작성](https://user-images.githubusercontent.com/92600646/162562313-ac094ace-c79b-479c-92a8-b66e60e7eb1b.gif)|![리뷰 삭제](https://user-images.githubusercontent.com/92600646/162562312-7064cc4f-2794-4b66-9acb-cc8c2d6f31c7.gif)|
|공부모드|시험모드|
|![공부모드](https://user-images.githubusercontent.com/92600646/162562315-3948e746-a85f-42ac-ae87-3d32da3afe37.gif)|![시험모드](https://user-images.githubusercontent.com/92600646/162562316-d3cb80a0-9318-48e8-9c62-15ae26cd4e6d.gif)|
|상세페이지 스크랩|
|![상세 페이지 스크랩](https://user-images.githubusercontent.com/92600646/162562311-fe43f3c9-7eb5-4276-a385-e6d0811a2c39.gif)|
</br>

<p align="right"><a href="#top">(Top)</a></p>
>>>>>>> 7b563c8f56a749eafb1fcb26b2e8ad036f794ed5
