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
  - [2.4 모든 문제집](#모든-문제집)
  - [2.5 문제집 삭제](#문제집-삭제)
  - [2.6 문제집 공유](#문제집-공유)
  - [2.7 문제집 수정](#문제집-수정)

- ### [3 문제](#문제)
  - [3.1 문제 만들기](#문제-만들기)
  - [3.2 문제 정보](#문제-정보)
  - [3.3 문제 리스트](#문제-리스트)
  - [3.4 정답 결과](#정답-결과)
  - [3.5 문제 삭제](#문제-삭제)
  - [3.6 문제 수정](#문제-수정)


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
    - Authorization : “Bearer key”
    
- res
    - id: String
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
    - Authorization : “Bearer key”

- res
    - dtoList:Array
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
    - /workbook (post)

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
    - Authorization : “Bearer key”
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - count: Number
    - type: String

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
    
### 모든 문제집
- api
    - /workbook/ (get)
    - /workbook?page=Number&size=Number (get)


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

- fail
    - 제목 및 내용이 입력되지 않았을 때
    - username 존재하지 않을 때
    - 해당 계정의 문제집이 아니거나 혹은 없는 work_book_id 일 경우
  
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
  
- res
  - id: String
  - question: String
  - answer_a: String
  - answer_b: String
  - answer_c: String
  - answer_d: String
  - answer_e: String
  - correct: String
  
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
  
- fail
  - 없는 username 혹은 work_book_id 혹은 work_id 일 때
  
### 문제 리스트

- api
  - /work/:username/:work_book_id (get)

- headers
  - Content-type : "application/json"
  - Authorization : “Bearer key”

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
    - correct: String
    - result: boolean
    
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

- req
  - " 삭제 성공 "

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
  
- res
  - id: String
  - question: String
  - answer_a: String
  - answer_b: String
  - answer_c: String
  - answer_d: String
  - answer_e: String
  - correct: String
  
- fail
  - 없는 username 혹은 work_book_id 혹은 work_id 일 때 