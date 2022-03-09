# NePool API
## 목차
### URL 3.34.215.124
[1 유저](#유저)
- [1.1 회원가입](#회원가입)
- [1.2 로그인](#로그인)
- [1.3 유저 정보](#유저-정보)

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
    - user
        - username: String
        - password: String
- res
    - user
        - username: String
        - name: String
        - email: String
        - token: String
- fail
    - ID 또는 PW 일치하지 않을 경우
    
### 유저 정보
- api
    - /user/:user_id (get)
    
- header
    - Content-type : "application/json"
    - Authorization : “Bearer key”
    
- res
    - user
        - id: String
        - name: String
        - workbooks: Array
