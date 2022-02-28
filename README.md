# NePool API
## 목차
[1 유저](#유저)
- [1.1 회원가입](#회원가입)

### 회원가입
- api
    - /user (post)

- req
    - user
        - id: String
        - email: String
        - password: String
        - name: String
        - group: String
- res
    - user
        - id: String
        - name: String
        - email: String
        - group: String
- fail
    - id, email, password, name 중 하나라도 작성하지 않을 경우 필수 입력사항을 입력해주세요.
    - password를 6자 이상 입력하지 않을 경우 비밀번호는 6자 이상이어야 합니다.
    - eamil 형식이 잘못될 경우 잘못된 이메일 형식입니다.
    - 가입된 email일 경우 이미 가입된 이메일 주소입니다.
    - name에 지정된 문자 이외의 문자가 들어갈 경우 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.
    - 가입된 ID일 경우 이미 사용중인 계정 ID입니다.