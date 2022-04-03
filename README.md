# NePool API
## 목차
### URL www.nepool.co.kr
- ### [1 유저](#유저)
  - [1.1 회원가입](#회원가입)
  - [1.2 로그인](#로그인)
  - [1.3 유저 정보](#유저-정보)
  - [1.4 모든 유저](#모든-유저)

- ### [2 문제집](#문제집)
  - [2.1 문제집 만들기](#문제집-만들기)
  - [2.2 문제집 정보](#문제집-정보)
  - [2.3 내 문제집 리스트](#내-문제집-리스트)
  - [2.4 공유된 문제집](#공유된-문제집)
  - [2.5 문제집 삭제](#문제집-삭제)
  - [2.6 문제집 공유](#문제집-공유)
  - [2.7 문제집 수정](#문제집-수정)
  - [2.8 문제집 BEST 4](#문제집-BEST-4)
  - [2.9 문제집 개수](#문제집-개수)

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

- ### [6 검색](#검색)
  - [6.1 문제집 및 유저 검색](#문제집-및-유저-검색)

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
- res
    - id: String
    - username: String
    - name: String
    - email: String
    - password: String
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
        
    - totalPage: Number
    - page: Number
    - size: Number
    - prev: boolean
    - next: boolean
    - start: Number
    - end: Number
    - pageList: Array
    
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
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - count: Number
    - type: String
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
    - /workbook/ (get)
    - /workbook?page=Number&size=Number&type=String (get)
    - (설명) 모든 문제집을 가져올때는 type을 지우고 카테고리별로 가져올때는 type에 

- headers
    - Content-type : "application/json"

- res
    - dtoList:Array
        - id: Number
        - title: String
        - content: String
        - share: boolean
        - username: String
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
    - /workbook/:username/:work_book_id (put)

- headers
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- req
    - title: String
    - content: String
    - type: String
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
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
        - type: String
        - regDate: Date
        - modDate: Date
    - nePoolUser: Object
        - id: String
        - username: String
        - name: String
        - email: String
        - password: String

- fail
    - 없는 work_book_id , user_id 일 때

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
            - type: String
            - regDate: Date
            - modDate: Date
        - nePoolUser: Object
            - id: String
            - username: String
            - name: String
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
    
