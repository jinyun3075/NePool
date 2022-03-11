# NePool API
## 목차
### URL 3.34.215.124
[1 유저](#유저)
- [1.1 회원가입](#회원가입)
- [1.2 로그인](#로그인)
- [1.3 유저 정보](#유저-정보)
- [1.4 모든 유저](#모든-유저)

[2 문제집](#문제집)
- [2.1 문제집 만들기](#문제집-만들기)
- [2.2 문제집 정보](#문제집-정보)
- [2.3 내 문제집 리스트](#내-문제집-리스트)
- [2.4 모든 문제집](#모든-문제집)
- [2.5 문제집 삭제](#문제집-삭제)
- [2.6 문제집 공유](#문제집-공유)
- [2.7 문제집 수정](#문제집-수정)


## 유저
### 회원가입
- api
    - /user (post)

- header
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

- header
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
    
- header
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

- header
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

- header
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- req
    - username: String
    - title: String
    - content: String
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - count: Number
    
- fail
    - 제목 및 내용이 입력되지 않았을 때
    - username 존재하지 않을 때
    
### 문제집 정보

- api
    - /workbook/:username/:work_book_id (get)
    - /workbook/:username/:work_book_id?check=boolean (get)
    - (설명) check 값의 true를 줄 경우 조회수 + 1, null 혹은 false 일 경우 변화 없음

- header
    - Content-type : "application/json"
    - Authorization : “Bearer key”
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - count: Number

- fail
    - username 존재하지 않을 때
    - 해당 계정의 문제집이 아니거나 혹은 없는 work_book_id 일 경우
    
### 내 문제집 리스트

- api
    - /workbook/:username (get)
    - /workbook/:username?page=Number&size=Number(get)
    

- header
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


- header
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

- header
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

- header
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

- header
    - Content-type : "application/json"
    - Authorization : “Bearer key”

- req
    - title: String
    - content: String
    
- res
    - id: Number
    - title: String
    - content: String
    - share: boolean
    - username: String
    - count: Number

- fail
    - 제목 및 내용이 입력되지 않았을 때
    - username 존재하지 않을 때
    - 해당 계정의 문제집이 아니거나 혹은 없는 work_book_id 일 경우